package com.example.musicmservice.Entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Bloc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;
    private String text;
    private String color;
    private String capacite;
    private Long foyerId;
    @Transient
    private Foyer foyer;
    @Override
    public String toString() {
        return "Bloc{" +
                "id=" + id +
                ", nom='" + nom + '\'' +
                ", capacite='" + capacite + '\'' +

                '}';
    }

}