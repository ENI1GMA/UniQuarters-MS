package com.example.chambrems.repositories;

import com.example.chambrems.entities.Chambre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChambreRepo extends JpaRepository<Chambre, Long> {
}
