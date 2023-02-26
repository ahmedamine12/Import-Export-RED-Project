package com.example.new_gestion_red.repository;

import com.example.new_gestion_red.model.RedProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RedProductRepositry extends JpaRepository<RedProduct,Long> {
}
