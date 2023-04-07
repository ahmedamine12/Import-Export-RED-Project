package com.example.new_gestion_red.model;
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
@Entity
@Table(name = "LC")
public class LC {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
    @Column(name = "fournisseur")
    private String fournisseur;
    @Column(name = "ref_lc")
    private String ref_lc;
    @Column(name = "banque")
    private String banque;

    @JsonFormat(pattern="yyyy-MM-dd",shape = JsonFormat.Shape.STRING)
    @Column(name = "date lc")
    private Date date_lc;

    @Column(name = "num_facture")
    private String num_facture;

    @JsonFormat(pattern="yyyy-MM-dd",shape = JsonFormat.Shape.STRING)
    @Column(name = "date_fact")
    private Date date_fact;

    @Column(name = "montant_fact")
    private double montant_fact;

    @Column(name = "montant_lc")
    private double montant_lc;

    @Column(name = "conditions")
    private String conditions ;

    @Column(name = "devise")
    private String devise;

    @JsonFormat(pattern="yyyy-MM-dd",shape = JsonFormat.Shape.STRING)
    @Column(name = "date_limit")
    private Date date_limit;









}
