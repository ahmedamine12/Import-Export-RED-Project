package com.example.new_gestion_red.service;

import com.example.new_gestion_red.model.RedProduct;
import com.example.new_gestion_red.model.RespoProject;
import com.example.new_gestion_red.repository.RespoProjectRepositry;
import com.example.new_gestion_red.service.DTO.AddRedProductDto;
import com.example.new_gestion_red.service.DTO.redProductDto;
import com.example.new_gestion_red.service.DTO.respoProjectDto;
import com.example.new_gestion_red.service.mappers.respoProjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional
@AllArgsConstructor
public class respoProjectService {
private RespoProjectRepositry resporepositry ;
private respoProjectMapper respoMapper ;
    public List<respoProjectDto> getAllRespo()
    {
        List<RespoProject> respos = resporepositry.findAll();
        return respos.stream().map(p-> respoMapper.TorespoProjecttDto(p)).toList();
    }
    public respoProjectDto getRespoById(Long id )
    {
        RespoProject respo = resporepositry.findById(id).orElse(null);
        assert respo != null;
        return respoMapper.TorespoProjecttDto(respo);
    }


    public void UpadateRespo(Long id, respoProjectDto respoDto)
    {
        RespoProject respo = resporepositry.findById(id).orElse(null);
       if(respo!=null) {
           respoDto.setId(id);
           resporepositry.save(respoMapper.Torespo(respoDto));
       }
    }




}
