const ReservationService = require('../services/reservation');
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
      const bearerToken = req.headers.authorization.split(' ')[1];
      if (!bearerToken) throw new Error('bearerToken is required');
      const existsChambreUser = await ReservationService.checkChambreUserExistance(idChambre, idEtudiant, bearerToken);
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
};
