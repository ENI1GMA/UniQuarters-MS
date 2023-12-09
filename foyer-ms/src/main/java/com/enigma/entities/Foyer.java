package com.enigma.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Foyer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private long capacite;
    private double lng;
    private double lat;

    private Long idUniversite;

    @Transient // not a column in the database, jpa will ignore it, it's just for data passing
    private Universite universite;
}
