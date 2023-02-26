package com.example.new_gestion_red.service.mappers;

import com.example.new_gestion_red.model.RedProduct;
import com.example.new_gestion_red.model.RespoProject;
import com.example.new_gestion_red.service.DTO.AddRedProductDto;
import com.example.new_gestion_red.service.DTO.redProductDto;
import com.example.new_gestion_red.service.DTO.respoProjectDto;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class respoProjectMapper {

    public respoProjectDto TorespoProjecttDto(RespoProject respo)
    {

        respoProjectDto resppoDto = new respoProjectDto();
        resppoDto.setId(respo.getId());
        resppoDto.setEmail(respo.getEmail());
        resppoDto.setFull_name(respo.getFull_name());
        return resppoDto;
    }
    public RespoProject Torespo(respoProjectDto respoDto)
    {

        RespoProject respo = new RespoProject();

        BeanUtils.copyProperties( respoDto ,respo);


        return  respo ;
    }
}
