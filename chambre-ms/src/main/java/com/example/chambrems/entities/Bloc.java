package com.example.chambrems.entities;


import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class Bloc {
    private long id;
    private String nom;
    private String text;
    private String color;
    private String capacite;
    private long foyerId;


}
