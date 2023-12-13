// Reservation Service
const ReservationModel = require('../models/Reservation.js');
const ChambreService = require('./chambre.js');
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
        id: this.#generateId(idChambre, idEtudiant),
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
      let reservationCreated;
      try {
        reservationCreated = await ReservationModel.create(reservation);
      } catch (error) {
        if (error.message.includes('duplicate key error collection: reservation.reservations index: id_1 dup key')) {
          throw new Error(`Reservation ${idChambre}_${idEtudiant} already exists`);
        }
        throw error;
      }
      console.log('🚀 ~ ReservationService ~ createReservation ~ reservationCreated:', reservationCreated);
      return reservationCreated;
    } catch (error) {
      console.log('🚀 ~ ReservationService ~ createReservation ~ error:', error);
      throw error;
    }
  }

  static async checkChambreExistance(idChambre, idEtudiant) {
    try {
      const chambre = await ChambreService.getChambre(idChambre);
      console.log('🚀 ~ ReservationService ~ #checkChambreUserExistance ~ chambre:', chambre);
    } catch (error) {
      console.log('error chambre', error?.response?.data || error);
      throw new Error(`get chambre ${idChambre} failed, ${error.response?.data?.message || error.message}`);
    }
  }

  static async getReservation(id) {
    try {
      const reservation = await ReservationModel.findOne({ id });
      return reservation;
    } catch (error) {
      console.log('🚀 ~ ReservationService ~ getReservation ~ error:', error);
      throw error;
    }
  }

  static async getReservationByEtudiant(idEtudiant) {
    try {
      const reservations = await ReservationModel.find({ 'etudiant.id': idEtudiant });
      return reservations;
    } catch (error) {
      console.log('🚀 ~ ReservationService ~ getReservationByEtudiant ~ error:', error);
      throw error;
    }
  }

  static #generateId(idChambre, idEtudiant) {
    return idChambre + '_' + idEtudiant;
  }
};
