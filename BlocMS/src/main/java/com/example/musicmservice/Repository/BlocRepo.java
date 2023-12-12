package com.example.musicmservice.Repository;


import com.example.musicmservice.Entities.Bloc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlocRepo extends JpaRepository<Bloc, Long> {
    public Bloc findByNom(String nom);


}

