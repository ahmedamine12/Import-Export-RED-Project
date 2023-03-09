package com.example.new_gestion_red.model;
import com.fasterxml.jackson.annotation.*;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
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
@Entity
@Table(name = "RedProduct")
public class RedProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    @Column(name = "num_Douan")
    private String num_Douan;
    @Column(name = "RED")
    private String RED;
    @JsonFormat(pattern="yyyy-MM-dd",shape = JsonFormat.Shape.STRING)
    @Column(name = "date_lancement")
    private Date date_lancement;


    //@Column(name = "time")
    //private int time;
    @Column(name = "designation")
    private String designation;
    @Column(name = "nameProject")
    private String nameProject;
    @Column(name = "jobId")
    private String jobId;
    @Column(name = "jobGroup")
    private String jobGroup;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "respo_id")
    private RespoProject respo;



    @JsonFormat(pattern="yyyy-MM-dd",shape = JsonFormat.Shape.STRING)
    @Column(name = "date_echeance")
    private Date date_echeance;

    @Column(name = "pays")
    private String pays;

    @Column(name = "facture_export")
    private String facture_export;


    @Column(name = "valeur_declarer")
    private double valeur_declarer;

    @Column(name = "valeur_non_decharger")
    private double valeur_non_decharger;






}
