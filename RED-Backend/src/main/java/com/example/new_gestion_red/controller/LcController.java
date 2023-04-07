package com.example.new_gestion_red.controller;


import com.example.new_gestion_red.model.LC;
import com.example.new_gestion_red.model.RedProduct;
import com.example.new_gestion_red.model.RespoProject;
import com.example.new_gestion_red.repository.LcRepositry;
import com.example.new_gestion_red.repository.RespoProjectRepositry;
import com.example.new_gestion_red.service.DTO.AddRedProductDto;
import com.example.new_gestion_red.service.DTO.redProductDto;
import com.example.new_gestion_red.service.DTO.respoProjectDto;
import com.example.new_gestion_red.service.mappers.respoProjectMapper;
import com.example.new_gestion_red.service.respoProjectService;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
@AllArgsConstructor
@RestController
@CrossOrigin("http://localhost:3000")
public class LcController {

    private LcRepositry lcRepo ;

    @GetMapping("/Lcs")
    List<LC> getAllLC()
    {

        return lcRepo.findAll();
    }

    @PostMapping("/addLc")
    LC newLC(@RequestBody LC newLC)
    {
            return lcRepo.save(newLC);
    }

    @GetMapping("/getLcById/{id}")
    LC getRespoById(@PathVariable Long id)
    {
        return lcRepo.findById(id).orElse(null);
    }

    @PutMapping("/UpdateLc/{id_lc}")
    public void updateRedProduct(@RequestBody LC newLc, @PathVariable Long id_lc) {
        LC updatedLc = lcRepo.findById(id_lc).orElse(null);
        if (updatedLc != null) {
            updatedLc.setConditions(newLc.getConditions());
            updatedLc.setBanque(newLc.getBanque());
            updatedLc.setDevise(newLc.getDevise());
            updatedLc.setFournisseur(newLc.getFournisseur());
            updatedLc.setDate_fact(newLc.getDate_fact());
            updatedLc.setDate_limit(newLc.getDate_limit());
            updatedLc.setDate_lc(newLc.getDate_lc());
            updatedLc.setMontant_lc(newLc.getMontant_lc());
            updatedLc.setMontant_fact(newLc.getMontant_fact());
            updatedLc.setRef_lc(newLc.getRef_lc());
            updatedLc.setNum_facture(newLc.getNum_facture());

            lcRepo.save(updatedLc);
        }
    }

    @DeleteMapping("/deletLC/{id}")
    public String delerLC(@PathVariable Long id) {
        String response = "";
        LC delLc = lcRepo.findById(id).orElse(null);
        if (delLc != null)
        {  try {
                lcRepo.deleteById(id);
            } catch (Exception e) {
                return Collections.singleton("Operation Invalide, cet responsable est attache au d'autre projets").toString();
            }
    }
return response ;
    }


}
