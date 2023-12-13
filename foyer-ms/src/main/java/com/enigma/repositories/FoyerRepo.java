package com.enigma.repositories;

import com.enigma.entities.Foyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface FoyerRepo extends JpaRepository<Foyer, Long> {
    Foyer findFoyerByNom(String nom);
    @Query("select f from Foyer f where f.nom like %:nom% ")
    List<Foyer> searchFoyers(@Param("nom") String nom);
}
