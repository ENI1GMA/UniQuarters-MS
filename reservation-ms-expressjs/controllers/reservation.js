const ReservationService = require('../services/reservation.js');
module.exports = class ReservationController {
  // static #reservationService = new ReservationService();
  static async getAllReservations(req, res) {
    try {
      const reservations = await ReservationService.getAllReservations();
      res.status(200).json({
        status: 'success',
        message: 'Get all reservations',
        data: {
          reservations,
        },
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  static async createReservation(req, res) {
    try {
      // check user and chambre existance
      const { idChambre, idEtudiant } = req.params;
      if (!idChambre) throw new Error('idChambre is required');
      if (!idEtudiant) throw new Error('idEtudiant is required');
      const existsChambreUser = await ReservationService.checkChambreExistance(idChambre);
      console.log(
        '🚀 ~ file: reservation.js:19 ~ ReservationController ~ createReservation ~ existsChambreUser:',
        existsChambreUser
      );
      console.log('Create Reservation params:', {
        idChambre,
        idEtudiant,
      });
      const reservation = await ReservationService.createReservation(idChambre, idEtudiant);
      res.status(201).json({
        status: 'success',
        message: 'Reservation created',
        data: {
          reservation,
        },
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  static async getReservation(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('id is required');
      const reservation = await ReservationService.getReservation(id);
      if (!reservation) return res.status(404).json({ status: 'error', message: 'Reservation not found' });
      res.status(200).json({
        status: 'success',
        message: 'Get reservation',
        data: {
          reservation,
        },
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  static async getReservationByEtudiant(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('id is required');
      const reservations = await ReservationService.getReservationByEtudiant(id);
      if (!reservations) return res.status(404).json({ status: 'error', message: 'Reservation not found' });
      res.status(200).json({
        status: 'success',
        message: 'Get reservation by etudiant',
        data: {
          reservations,
        },
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  static async validerReservation(req, res) {
    try {
      const { idReservation } = req.params;
      if (!idReservation) throw new Error('idReservation is required');
      const reservation = await ReservationService.validerReservation(idReservation);
      res.status(200).json({
        status: 'success',
        message: 'Reservation validée avec succès',
        data: {
          reservation,
        },
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  static async cancelReservation(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('id is required');
      const reservation = await ReservationService.cancelReservation(id);
      res.status(200).json({
        status: 'success',
        message: 'Reservation cancelled',
        data: {
          reservation,
        },
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }

  static async getChambresReservationsStatistiques(req, res) {
    try {
      const chambresReservationsStatistiques = await ReservationService.getChambresReservationsStatistiques();
      res.status(200).json({
        status: 'success',
        message: 'Get chambres reservations statistiques',
        data: {
          chambresReservations: chambresReservationsStatistiques,
        },
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
};
