package com.example.new_gestion_red.repository;

import com.example.new_gestion_red.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepositry extends JpaRepository<Admin, Long> {
    Admin findByEmail(String email);
    Admin findByPassword(String password);
}
