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
      const bearerToken = req.headers.authorization.split(' ')[1];
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
};
