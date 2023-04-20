package com.example.new_gestion_red.controller;

import ch.qos.logback.core.model.Model;
import com.example.new_gestion_red.model.Admin;
import com.example.new_gestion_red.repository.AdminRepositry;
import com.example.new_gestion_red.service.AdminService;
import com.example.new_gestion_red.service.DTO.AdminDTO;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
import java.util.UUID;

@AllArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class ForgotPasswordController {


    @Autowired
    private AdminService adminService;
    private AdminRepositry adminRepositry ;

    @PostMapping(path ="forgot_password")
    public String processForgotPassword(@RequestBody AdminDTO admindto) {
        String email = admindto.getEmail();
        String token = UUID.randomUUID().toString();
        if(email==null)
        {
            return "NoEmail" ;
        }
        String resetLink = "http://localhost:3000/ResetPassword?token=" + token;

            if(adminService.sendEmail(email, resetLink));
        {

            Admin realAdmin = adminRepositry.findByEmail(email);
            realAdmin.setResetPasswordToken(token);
            adminRepositry.save(realAdmin);

        }
            return "success";


    }
    @PostMapping(path ="Reset_Password")
    public String updatePassword(@RequestParam("token") String token, @RequestBody Map<String, String> newPasswordMap) throws NoSuchAlgorithmException {
        String newPassword = newPasswordMap.get("newPassword");
        return adminService.UpdatePassword(token, newPassword);
    }


}