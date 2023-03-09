package com.example.new_gestion_red.service.mappers;
import com.example.new_gestion_red.model.RedProduct;
import com.example.new_gestion_red.model.RespoProject;
import com.example.new_gestion_red.service.DTO.AddRedProductDto;
import com.example.new_gestion_red.service.DTO.redProductDto;
import com.example.new_gestion_red.service.DTO.respoProjectDto;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class redProductMApper {

    public redProductDto ToredProductDto(RedProduct product)
    {
        redProductDto newProDto = new redProductDto();
        newProDto.setRED(product.getRED());
        newProDto.setId(product.getId());
        newProDto.setDesignation(product.getDesignation());
        newProDto.setDate_lancement(product.getDate_lancement());
        newProDto.setNameProject(product.getNameProject());
        newProDto.setNum_Douan(product.getNum_Douan());

        newProDto.setDate_echeance(product.getDate_echeance());
        newProDto.setPays(product.getPays());
        newProDto.setFacture_export(product.getFacture_export());
        newProDto.setValeur_declarer(product.getValeur_declarer());
        newProDto.setValeur_non_decharger(product.getValeur_non_decharger());
        respoProjectDto resppoDto = new respoProjectDto();
        resppoDto.setId(product.getRespo().getId());
        resppoDto.setEmail(product.getRespo().getEmail());
        resppoDto.setFull_name(product.getRespo().getFull_name());
        newProDto.setRespo(resppoDto);
        return newProDto;
    }

    public RedProduct ToredProduct(AddRedProductDto addproductDto)
    {
        RedProduct product = new RedProduct();
        RespoProject respo = new RespoProject();

        BeanUtils.copyProperties(addproductDto,product);
        BeanUtils.copyProperties(addproductDto.getRespo(),respo);
        product.setRespo(respo);
        return product ;
    }




}
