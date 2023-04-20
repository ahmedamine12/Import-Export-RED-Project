package com.example.new_gestion_red.repository;

import com.example.new_gestion_red.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepositry extends JpaRepository<Admin, Long> {
    public Admin findByEmail(String email);
    public Admin findByPassword(String password);
    public Admin findByResetPasswordToken(String token);
}
