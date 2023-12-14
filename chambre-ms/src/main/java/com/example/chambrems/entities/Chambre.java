package com.example.chambrems.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Chambre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private long numero;
    private long capacity;
    private String description;
    private Long idBloc;


    @Enumerated(EnumType.STRING)
    private TypeChambre type;

    @Transient
    private Bloc bloc;
    @Transient
    private double review;


    private boolean wifi;
    private boolean airConditioning;
    private boolean privateBathroom;
    private boolean balcony;
    private boolean workspace;
    private boolean kitchenette;
    private boolean petFriendly;

    private boolean travaux;



    public void calculateReview() {
        int totalFeatures = 7;
        int trueFeatureCount = 0;

        if (wifi) trueFeatureCount++;
        if (airConditioning) trueFeatureCount++;
        if (privateBathroom) trueFeatureCount++;
        if (balcony) trueFeatureCount++;
        if (workspace) trueFeatureCount++;
        if (kitchenette) trueFeatureCount++;
        if (petFriendly) trueFeatureCount++;

        this.review = (double) trueFeatureCount / totalFeatures * 5.0;
    }

    public double getReview() {
        calculateReview();
        return review;
    }
}
