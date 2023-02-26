package com.example.new_gestion_red.service;

import com.example.new_gestion_red.controller.EmailJobSchedulerController;
import com.example.new_gestion_red.model.RedProduct;
import com.example.new_gestion_red.model.RespoProject;
import com.example.new_gestion_red.model.ScheduleEmailRequest;
import com.example.new_gestion_red.model.ScheduleEmailResponse;
import com.example.new_gestion_red.repository.RedProductRepositry;
import com.example.new_gestion_red.repository.RespoProjectRepositry;
import com.example.new_gestion_red.service.DTO.AddRedProductDto;
import com.example.new_gestion_red.service.DTO.UpdateRedProductDto;
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

    public redProductDto getRedProductById(Long id) {
        RedProduct product = productRepositry.getOne(id);

        return productMApper.ToredProductDto(product);
    }


    public ScheduleEmailResponse sendemail(AddRedProductDto addRedProductDto, Long id) {
        RespoProject newRespo = respoProjectRepositry.findById((long) id).orElse(null);
        assert newRespo != null;
        String email = newRespo.getEmail();

        LocalDateTime dateTimesend;
        String subject = " Email rappelant from Venci Application";
        String action = addRedProductDto.getRED();
        Date datefront = addRedProductDto.getDate_lancement();
        Calendar c = Calendar.getInstance();
        c.setTime(datefront);
        switch (action) {
            case "AC" -> c.add(Calendar.DAY_OF_MONTH, 1);
            case "TA" -> c.add(Calendar.DAY_OF_MONTH, 20);
            case "AB" -> c.add(Calendar.DAY_OF_MONTH, 30);
            case "AZ" -> c.add(Calendar.DAY_OF_MONTH, 40);
        }
        datefront = c.getTime();
        LocalTime time = LocalTime.of(11, 55, 0);
        LocalDate newdate = datefront.toInstant().atZone(ZoneId.systemDefault()).toLocalDate(); // convert Date to LocalDate
        dateTimesend = LocalDateTime.of(newdate, time);


        System.out.println(dateTimesend);

        String body = "Bonjour Monsieur " + newRespo.getFull_name() +
                "  ceci est un message rappelant autour du projet " + addRedProductDto.getNameProject() +
                " le produit " + addRedProductDto.getDesignation() + " lui reste que "
                + dateTimesend.toString();
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
            if (response.isSuccess()) {
                productRepositry.save(productMApper.ToredProduct(addRedProductDto));
                return response.getMessage();
            }

            return response.getMessage();

        }
        return "il  ya un erreur de creation";


    }

    public void delteJob_Trigger(RedProduct addRedProductDto, Long id) {
        addRedProductDto = productRepositry.findById(id).orElse(null);
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

    public void updateRedProduct(AddRedProductDto addRedProductDto, Long id_redpro, Long id_respo) {
        respoProjectDto newRespo = new respoProjectDto();
        newRespo.setId(id_respo);
        redProductDto newpro = getRedProductById(id_redpro);
        System.out.println(addRedProductDto.getRED());


            RedProduct oldRedproduct = new RedProduct();
            delteJob_Trigger(oldRedproduct, id_redpro);

            ScheduleEmailResponse response = sendemail(addRedProductDto, id_respo);
            addRedProductDto.setJobGroup(response.getJobGroup());
            addRedProductDto.setJobId(response.getJobId());

        
        newpro.setRespo(newRespo);
        newpro.setRED(addRedProductDto.getRED());
        newpro.setDate_lancement(addRedProductDto.getDate_lancement());
        newpro.setDesignation(addRedProductDto.getDesignation());
        newpro.setNum_Douan(addRedProductDto.getNum_Douan());
        newpro.setNameProject(addRedProductDto.getNameProject());
        newpro.setId(id_redpro);
        addRedProductDto.setRespo(newRespo);


        productRepositry.save(productMApper.ToredProduct(addRedProductDto));


    }


}
