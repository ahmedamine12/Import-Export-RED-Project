package com.example.new_gestion_red.service;

import com.example.new_gestion_red.model.*;
import com.example.new_gestion_red.repository.LcRepositry;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
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

    JavaMailSender javaMailSender;
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
                if (l.getEtat()=="en cours") {
                    totale += l.getMontant_fact();
                }
            }

            if ((100000000 - totale) < 200000000)
            {
                System.out.println("la somme est superieur donc un email doit etre envoye");
                String email = "vencigestion@gmail.com";
                String subject = " ALert!!!!!!";
                String body = " Attention !!!!! le totale des montant des facture en cours en depasse le plafant ";
                var mailMessage = new SimpleMailMessage();

                mailMessage.setTo(email);
                mailMessage.setSubject(subject);
                mailMessage.setText(body);
                mailSender.send(mailMessage);

            }
        }


}
}