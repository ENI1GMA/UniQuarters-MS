// Reservation Service
const ReservationModel = require('../models/Reservation.js');
const ChambreService = require('./chambre.js');
module.exports = class ReservationService {
  static async getAllReservations() {
    try {
      const reservationResult = await ReservationModel.find();
      const reservations = reservationResult.map(reservation => reservation.toObject());
      console.log('🚀 ~ ReservationService ~ getAllReservations ~ reservations:', reservations);
      for (const reservation of reservations) {
        if (!reservation.chambre || !reservation.chambre.id) continue;
        const chambre = await ChambreService.getChambre(reservation.chambre.id);
        console.log('typeof reservation', typeof reservation);
        console.log('chambre', chambre);
        console.log('before reservation.chambre', reservation.chambre);
        reservation.chambre = chambre;
        console.log('after reservation.chambre', reservation.chambre);
      }
      console.log('🚀 ~ ReservationService ~ getAllReservations ~ reservations:', reservations);
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

  static async checkChambreExistance(idChambre) {
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

  static async validerReservation(idReservation) {
    try {
      console.info(`Begin validerReservation ${idReservation}`);
      const reservation = await ReservationModel.findOne({ id: idReservation });
      console.log('found reservation', reservation);
      if (!reservation) {
        console.log('Reservation not found');
        throw new Error(`Reservation ${idReservation} not found`);
      }

      if (reservation.estValide) {
        console.log('Reservation already validated');
        throw new Error(`Reservation ${idReservation} already validated`);
      }

      if (!reservation.etudiant) {
        console.log('Reservation does not have etudiant');
        throw new Error(`Reservation ${idReservation} does not have etudiant`);
      }

      if (!reservation.chambre) {
        console.log('Reservation does not have chambre');
        throw new Error(`Reservation ${idReservation} does not have chambre`);
      }

      // check if reservation.etudiant.id alreadt have a validated reservation
      const etudiantReservations = await ReservationModel.find({
        'etudiant.id': reservation.etudiant.id,
        estValide: true,
      });
      console.log('etudiantReservations validated', etudiantReservations);
      if (etudiantReservations.length > 0) {
        console.log('Etudiant already have a validated reservation');
        throw new Error(`Etudiant already have a validated reservation`);
      }

      const chambre = await ChambreService.getChambre(reservation.chambre.id);
      console.log('found chambre', chambre);
      if (!chambre) {
        console.log('Chambre not found');
        throw new Error(`Chambre ${reservation.chambre.id} not found`);
      }
      const maxPlaces = this.#getChambreMaxPlaces(chambre.type);
      console.log('maxPlaces', maxPlaces);
      // check if chambre is full, note that chambre.type can be SIMPLE, DOUBLE or TRIPLE, so for example if chambre.type is DOUBLE, we can have 2 reservations for this chambre
      const reservationsChambre = await ReservationModel.find({
        'chambre.id': reservation.chambre.id,
        estValide: true,
      });
      console.log('reservationsChambre', reservationsChambre);

      if (reservationsChambre.length >= maxPlaces) {
        console.log('Chambre is full');
        throw new Error(`Chambre is full`);
      }

      console.log('Reservation is valid');
      reservation.estValide = true;
      const savedReservation = await reservation.save();
      console.log('savedReservation', savedReservation);
      return savedReservation;
    } catch (error) {
      console.log('🚀 ~ ReservationService ~ validerReservation ~ error:', error);
      throw error;
    }
  }

  static async cancelReservation(reservationId) {
    console.log('cancelReservation', reservationId);
    // check if reservationId exist
    const reservation = await ReservationModel.findOne({ id: reservationId });
    console.log('reservation', reservation);
    if (!reservation) {
      console.log('Reservation not found');
      throw new Error(`Reservation ${reservationId} not found`);
    }
    // check if reservation is already canceled
    if (!reservation.estValide) {
      console.log('Reservation already invalid');
      throw new Error(`Reservation ${reservationId} already invalid`);
    }

    if (!reservation.etudiant) {
      console.log('Reservation already invalid');
      throw new Error(`Reservation does not have etudiant`);
    }

    if (!reservation.chambre) {
      console.log('Reservation already invalid');
      throw new Error(`Reservation does not have chambre`);
    }
    // desaffect chambre and etudiant
    const result = await ReservationModel.findOneAndUpdate(
      { id: reservationId },
      {
        $set: {
          estValide: false,
          etudiant: null,
          chambre: null,
        },
      },
      { new: true }
    );
    console.log('result', result);
    return result;
  }

  static #generateId(idChambre, idEtudiant) {
    return idChambre + '_' + idEtudiant;
  }

  static #getChambreMaxPlaces(typeChambre) {
    let maxPlaces;
    switch (typeChambre) {
      case 'SIMPLE':
        maxPlaces = 1;
        break;
      case 'DOUBLE':
        maxPlaces = 2;
        break;
      case 'TRIPLE':
        maxPlaces = 3;
        break;
      default:
        throw new RuntimeException('Invalid chambre type');
    }
    return maxPlaces;
  }
};
