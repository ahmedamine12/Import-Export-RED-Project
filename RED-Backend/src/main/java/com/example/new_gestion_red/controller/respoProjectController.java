package com.example.new_gestion_red.controller;


import com.example.new_gestion_red.model.RedProduct;
import com.example.new_gestion_red.model.RespoProject;
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
public class respoProjectController {

        private RespoProjectRepositry respoProjectRepositry ;
        private respoProjectService respoService ;


        @PostMapping("/respoProject")
        RespoProject newRespoProject(@RequestBody RespoProject newRespoProject)
        {
        return respoProjectRepositry.save(newRespoProject);
        }
        @GetMapping("/getRespoById/{id}")
       respoProjectDto getRespoById(@PathVariable Long id)
        {
                return respoService.getRespoById(id);
        }



        @GetMapping("/resposProjects")
        List<respoProjectDto> getAllRespoProject()
        {

                return respoService.getAllRespo();
        }

    @PutMapping("/UpdateRespo/{id_respo}")
    public void updateRedProduct(@RequestBody respoProjectDto newRespo, @PathVariable Long id_respo) {
       respoService.UpadateRespo(id_respo,newRespo);

    }

    @DeleteMapping("/deleteRespo/{id}")
    public String deleteRespo(@PathVariable Long id) {
        String response = "";
        if (!respoProjectRepositry.existsById(id))
            return Collections.singleton("ce respo n'existe pas").toString();
        try {
            respoProjectRepositry.deleteById(id);
            return Collections.singleton("").toString();
        } catch (Exception e)
        {
            return Collections.singleton("Operation Invalide, cet responsable est attache au d'autre projets").toString();
        }
    }

}
