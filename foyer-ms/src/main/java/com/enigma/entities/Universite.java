package com.enigma.entities;

import lombok.*;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Universite {
    private Long id;
    private String nom;
    private String adresse;
    private String image;


}