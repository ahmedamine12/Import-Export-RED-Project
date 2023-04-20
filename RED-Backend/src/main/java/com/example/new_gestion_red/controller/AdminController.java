package com.example.new_gestion_red.controller;

import com.example.new_gestion_red.service.AdminService;
import com.example.new_gestion_red.service.DTO.AdminDTO;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.security.NoSuchAlgorithmException;

@AllArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class AdminController {
    private AdminService adminService;
    @PostMapping(path = "login")
    public String login(@RequestBody AdminDTO adminDTO) throws NoSuchAlgorithmException {
       return adminService.login(adminDTO);
    }
}
