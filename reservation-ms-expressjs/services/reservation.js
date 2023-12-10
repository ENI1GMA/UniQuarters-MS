// Reservation Service
const ReservationModel = require('../models/reservation');

module.exports = class ReservationService {
  static async getAllReservations() {
    try {
      const reservations = await ReservationModel.find();
      return reservations;
    } catch (error) {
      console.log('🚀 ~ ReservationService ~ getAllReservations ~ error:', error);
      throw error;
    }
  }

  static async createReservation(idChambre, idEtudiant) {
    try {
      const reservation = {
        id: this.#generateId(idChambre, null, idEtudiant),
        anneeUniversitaire: new Date().getFullYear(),
        estValide: false,
        etudiant: {
          id: idEtudiant,
        },
        chambre: {
          id: idChambre,
        },
      };
      console.log('🚀 ~ ReservationService ~ createReservation ~ reservation:', reservation);
      const reservationCreated = await ReservationModel.create(reservation);
      console.log('🚀 ~ ReservationService ~ createReservation ~ reservationCreated:', reservationCreated);
      return reservationCreated;
    } catch (error) {
      console.log('🚀 ~ ReservationService ~ createReservation ~ error:', error);
      throw error;
    }
  }

  static #generateId(idChambre, nomBloc, idEtudiant) {
    return idChambre + '-' + nomBloc + '-' + idEtudiant;
  }
};
