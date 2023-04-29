package com.example.new_gestion_red.service;

import com.example.new_gestion_red.model.*;
import com.example.new_gestion_red.repository.LcRepositry;
import com.example.new_gestion_red.repository.RespoProjectRepositry;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.support.SimpleJpaRepository;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.*;

@Service
@Transactional
@AllArgsConstructor
public class LcService {
    @Autowired
    LcRepositry lcRepo;
    private RespoProjectRepositry respoProjectRepositry;

    public void sendemail(LC lc) {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
        mailSender.setUsername("vencigestion@gmail.com");
        mailSender.setPassword(System.getenv("EMAIL_PASSWORD"));
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.debug", "true");
        double totale = 0;


        List<LC> lcs = lcRepo.findAll();
        if (lcs != null) {
            for (LC l : lcs) {
                if (l.getEtat()=="en cours")
                {
                    totale += l.getMontant_fact();
                }
            }

            if ((10000000 - totale) == 2000000)
            {
                System.out.println("la somme est superieur donc un email doit etre envoye");
                String email = "vencigestion@gmail.com";
                String subject = " " ;
                String body = "Ce message s'intègre dans notre procédure de suivi de la modalite de payment LC (Lettre de Credit).\n"+
                        "Nous vous informant que le montant total des LC ouverte est : "+ totale+".\n"+
                        "Ce montant coresspont a une consomation  a hauteur de 8000000 USD de notre ligne de credit.\n"+
                        "Par consequent vueiller faire le necessaire pour liquider les LC en cours afin d'eviter une consomation totale de ntre ligne de credit.\n"
                        +"Plateforme digitale Vinci Gestion_Modalité_Payment ";
                var mailMessage = new SimpleMailMessage();


                mailMessage.setSubject(subject);
                mailMessage.setText(body);

                List<RespoProject>  newRespo = respoProjectRepositry.findAll();
                for ( RespoProject respo: newRespo)
                {
                    mailMessage.setTo(respo.getEmail());
                    mailSender.send(mailMessage);
                }

            }

        }


}
}