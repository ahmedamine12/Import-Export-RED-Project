package com.example.new_gestion_red.service;

import com.example.new_gestion_red.controller.EmailJobSchedulerController;
import com.example.new_gestion_red.model.RedProduct;
import com.example.new_gestion_red.model.RespoProject;
import com.example.new_gestion_red.model.ScheduleEmailRequest;
import com.example.new_gestion_red.model.ScheduleEmailResponse;
import com.example.new_gestion_red.repository.RedProductRepositry;
import com.example.new_gestion_red.repository.RespoProjectRepositry;
import com.example.new_gestion_red.service.DTO.AddRedProductDto;
import com.example.new_gestion_red.service.DTO.redProductDto;
import com.example.new_gestion_red.service.DTO.respoProjectDto;
import com.example.new_gestion_red.service.mappers.redProductMApper;
import lombok.AllArgsConstructor;
import org.quartz.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.*;
import java.util.Calendar;

@Service
@Transactional
@AllArgsConstructor
public class redProductService {
    private redProductMApper productMApper;
    private EmailJobSchedulerController emailController;
    private RedProductRepositry productRepositry;
    private respoProjectService respoService;
    private RespoProjectRepositry respoProjectRepositry;
    @Autowired
    private Scheduler scheduler;

    public List<redProductDto> getAllRedProduct() {
        List<RedProduct> products = productRepositry.findAll();
        return products.stream().map(p -> productMApper.ToredProductDto(p)).toList();
    }

    public redProductDto getRedProductById(Long id)
    {
        RedProduct product = productRepositry.getOne(id);

        return productMApper.ToredProductDto(product);
    }


    public ScheduleEmailResponse sendemail(AddRedProductDto addRedProductDto, Long id) {
        ScheduleEmailResponse reponse ;
        RespoProject newRespo = respoProjectRepositry.findById((long) id).orElse(null);
        assert newRespo != null;
        String email = newRespo.getEmail();
        LocalDate newdate=null ;
        LocalDateTime dateTimesend;
        String subject = " Suivi Dossier RED N°" + addRedProductDto.getNum_Douan();
        String action = addRedProductDto.getRED();
        Date datefront = addRedProductDto.getDate_lancement();
        Date dateEcheant = addRedProductDto.getDate_echeance();
        Calendar c = Calendar.getInstance();
        c.setTime(datefront);
        if(dateEcheant==null) {

            switch (action) {
                case "ATPA", "ETPP" -> c.add(Calendar.DAY_OF_MONTH, 640);

                case "AT", "ET-2F" -> c.add(Calendar.DAY_OF_MONTH, 90);

                case "ET" -> c.add(Calendar.DAY_OF_MONTH, 275);
            }
            datefront = c.getTime();
            newdate = datefront.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            System.out.println("l'email a ete programe en sur le RED");

        }
     else {

            LocalDate dateEcheantLocal = dateEcheant.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
            newdate = dateEcheantLocal.minusMonths(3); // Subtract three months from dateEcheantLocal
            System.out.println(newdate);
            System.out.println("l'email a ete programe en se basant sur la date d'echeance");
        }



        LocalTime time = LocalTime.of(5, 45, 0);
       // convert Date to LocalDate
        dateTimesend = LocalDateTime.of(newdate, time);

        System.out.println(dateTimesend);

        String body = "Bonjour Monsieur " + newRespo.getFull_name() + ";\n"+
                "  Ce message s'intègre dans notre procédure de suivi des importations et exportations dans le cadre des régimes économiques en douane.\n"
                + " Nous vous informons que le dossier RED N° " + addRedProductDto.getNum_Douan() + ", sera est à échoir dans les trois prochaines mois. \n"+
                "Par conséquent, veuillez procéder au retour de la marchandise correspondante à ce dossier ou bien lancer la procédure de prolongation de l'échéance du dossier dans le cas échéant.\n"+
                " Bonne journée\n"+
                "Plateforme digitale Vinci Gestion_RED "
                ;
        ZoneId timeZone = TimeZone.getTimeZone("Africa/Casablanca").toZoneId();

        ScheduleEmailRequest emailSend = new ScheduleEmailRequest(email, subject, body, dateTimesend, timeZone);

        ScheduleEmailResponse response = emailController.scheduleEmail(emailSend);
        System.out.println();
        addRedProductDto.setJobId(response.getJobId());
        addRedProductDto.setJobGroup(response.getJobGroup());
        System.out.println(response.getMessage());
        return response;
    }


    public String createRedProduct(AddRedProductDto addRedProductDto, Long id) {
        RespoProject respoProject = respoProjectRepositry.findById(id).orElse(null);

        if (respoProject != null) {
            respoProjectDto respo = new respoProjectDto();
            respo.setId((long) id);
            addRedProductDto.setRespo(respo);


            //Sending email part*****************************
            ScheduleEmailResponse response = sendemail(addRedProductDto, id);
            addRedProductDto.setJobGroup(response.getJobGroup());
            addRedProductDto.setJobId(response.getJobId());
            if (response.isSuccess())
            {
                productRepositry.save(productMApper.ToredProduct(addRedProductDto));
                return response.getMessage();
            }

            return response.getMessage();

        }
        return "il  ya un erreur de creation";


    }

    public void delteJob_Trigger(Long id) {
        RedProduct addRedProductDto = productRepositry.findById(id).orElse(null);
        JobKey jobKey = new JobKey(addRedProductDto.getJobId(), addRedProductDto.getJobGroup());

        // Build the trigger key using the trigger name and group defined in MyJob class
        TriggerKey triggerKey = new TriggerKey(jobKey.getName(), "email-triggers");

        // Unschedules the trigger
        try {
            scheduler.unscheduleJob(triggerKey);
            scheduler.deleteJob(jobKey);
            System.out.println("the schedule is deleted succefuly");
        } catch (SchedulerException e) {
            System.out.println("the schedule is not  deleted ");
            throw new RuntimeException(e);
        }
    }

    public ScheduleEmailResponse updateRedProduct(AddRedProductDto addRedProductDto, Long id_redpro, Long id_respo) {
        respoProjectDto newRespo = new respoProjectDto();
        ScheduleEmailResponse response = null;
        newRespo.setId(id_respo);
        redProductDto newpro = getRedProductById(id_redpro);
        if (newpro != null) {
            delteJob_Trigger(id_redpro);
          response = sendemail(addRedProductDto, id_respo);
            if(response.isSuccess()) {
                addRedProductDto.setJobGroup(response.getJobGroup());
                addRedProductDto.setJobId(response.getJobId());
                addRedProductDto.setRespo(newRespo);

                addRedProductDto.setId(id_redpro);
                productRepositry.save(productMApper.ToredProduct(addRedProductDto));

            }
            return response;


        }
        response.setMessage("il y a probeleme de modification des donne ");
        response.setSuccess(false);
        return response;

    }
}