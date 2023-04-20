package com.example.new_gestion_red.service;

import com.example.new_gestion_red.model.Admin;
import com.example.new_gestion_red.repository.AdminRepositry;
import com.example.new_gestion_red.service.DTO.AdminDTO;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Properties;


@Service
@Transactional
public class AdminService {
    @Autowired
    private AdminRepositry adminRepositry ;
    JavaMailSender javaMailSender;
    public boolean sendEmail(String recipientEmail, String link) {
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
        String subject = " Changer MOt de passe Vinici";
        String body = " Bonjour, \nVous avez demander de changer votre mot de passe.\n" +
                " Clicquer sur le lien au dessous pour le changer.\n" +
                "  Voici le lien "+ link +"\n"+
                "Ignorer ce message si vous souvener de votre mot de passe";
        var mailMessage = new SimpleMailMessage();

        mailMessage.setTo(recipientEmail);
        mailMessage.setSubject(subject);
        mailMessage.setText(body);
        mailSender.send(mailMessage);
        return true ;
    }


    public String login(AdminDTO adminDTO) throws NoSuchAlgorithmException {
        Admin admin = adminRepositry.findByEmail(adminDTO.getEmail());
        if (admin != null) {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedHash = digest.digest(adminDTO.getPassword().getBytes(StandardCharsets.UTF_8));
            String hashedPassword = bytesToHex(encodedHash);
            if (admin.getPassword().equals(hashedPassword)) {
                return "Success";
            } else {
                return "passF";
            }
        } else {
            return "emailF";
        }
    }

    public String UpdatePassword(String token, String newPassword) throws NoSuchAlgorithmException {
        Admin admin = adminRepositry.findByResetPasswordToken(token);
        if (admin != null) {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] encodedHash = digest.digest(newPassword.getBytes(StandardCharsets.UTF_8));
            String hashedPassword = bytesToHex(encodedHash);
            admin.setPassword(hashedPassword);
            adminRepositry.save(admin);
            return "success";
        } else {
            return "error";
        }
    }

    private static String bytesToHex(byte[] hash) {
        StringBuilder hexString = new StringBuilder(2 * hash.length);
        for (int i = 0; i < hash.length; i++) {
            String hex = Integer.toHexString(0xff & hash[i]);
            if (hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

}
