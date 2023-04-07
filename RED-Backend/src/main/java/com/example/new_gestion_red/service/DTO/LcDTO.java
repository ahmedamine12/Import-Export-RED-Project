package com.example.new_gestion_red.service.DTO;

import com.fasterxml.jackson.annotation.*;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor


public class LcDTO {
    private long id;
    private String fournisseur;
    private String ref_lc;
    private String banque;

    private Date date_lc;

    private String num_facture;

    private Date date_fact;

    private double montant_fact;

    private double montant_lc;

    private double conditions ;

    private String devise;

    private Date date_limit;









}
