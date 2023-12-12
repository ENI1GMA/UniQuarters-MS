package com.example.musicmservice.Service;


import com.example.musicmservice.Entities.Bloc;

import java.util.List;

public interface IblocService {
    List<Bloc> retrieveBlocs();

    Bloc updateBloc(Bloc bloc);

    Bloc addBloc(Bloc bloc);

    Bloc retrieveBloc(long idBloc);

    void removeBloc(long idBloc);


}
