package com.example.musicmservice.Service;


import com.example.musicmservice.Entities.Bloc;
import com.example.musicmservice.Repository.BlocRepo;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Service
@AllArgsConstructor
public class BlocServiceImpl implements IblocService {
    private final BlocRepo blocRepo;


    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Bloc> retrieveBlocs() {
        return blocRepo.findAll();
    }

    @Override
    public Bloc updateBloc(Bloc bloc) {
        bloc.setText(bloc.getNom());
        return blocRepo.save(bloc);
    }

    @Override
    public Bloc addBloc(Bloc bloc) {
        System.out.println("ADDING BLOC :::: " + bloc);
        bloc.setText(bloc.getNom());
        return blocRepo.save(bloc);
    }

    @Override
    public Bloc retrieveBloc(long idBloc) {
        return blocRepo.findById(idBloc).orElse(null);
    }

    @Override
    public void removeBloc(long idBloc) {
        blocRepo.deleteById(idBloc);
    }


}
