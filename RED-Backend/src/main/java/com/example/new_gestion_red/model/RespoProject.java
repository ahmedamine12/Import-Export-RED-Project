package com.example.new_gestion_red.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "RespoProject")
public class RespoProject {
    @Id
  @GeneratedValue(strategy =GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;
  @Column(name = "full_name")
  private String full_name;
  @Column(name = "email")
  private String email;
    @OneToMany(mappedBy = "respo", fetch = FetchType.LAZY )
    private Set<RedProduct>  redproducts ;



}
