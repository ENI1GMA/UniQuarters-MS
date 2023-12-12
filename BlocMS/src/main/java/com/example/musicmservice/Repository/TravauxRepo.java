package com.example.musicmservice.Repository;

import com.example.musicmservice.Entities.Travaux;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TravauxRepo extends CrudRepository<Travaux, Integer> {
    List<Travaux> findAllByBloc(int tribunal);
}