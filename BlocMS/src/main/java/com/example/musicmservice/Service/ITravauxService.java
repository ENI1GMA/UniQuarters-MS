package com.example.musicmservice.Service;


import com.example.musicmservice.Entities.Travaux;

import java.util.List;

public interface ITravauxService {
    Travaux addTravaux(Travaux travaux);
    List<Travaux> listTravaux();
    void deleteTravaux(int id);
    List<Travaux> getFilteredAppointmentsByLocation(int location);
    List<Travaux> getFilteredAppointmentByRoom(String room);
}