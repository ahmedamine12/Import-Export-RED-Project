package com.example.new_gestion_red.service.DTO;

import com.example.new_gestion_red.model.RespoProject;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class redProductDto {
    private long id;

    private String num_Douan;

    private String RED;

    @JsonFormat(pattern="yyyy-MM-dd",shape = JsonFormat.Shape.STRING)
    private Date date_lancement;
    private String designation;

    private String nameProject;
    private respoProjectDto respo ;
    private String jobId;

    private String jobGroup;
    @JsonFormat(pattern="yyyy-MM-dd",shape = JsonFormat.Shape.STRING)
    private Date date_echeance;


    private String pays;


    private String facture_export;



    private double valeur_declarer;


    private double valeur_non_decharger;


}
