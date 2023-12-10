const ReservationService = require('../services/reservation');
module.exports = class ReservationController {
  static #reservationService = new ReservationService();
  static async getAllReservations(req, res) {
    try {
      const reservations = await this.#reservationService.getAllReservations();
      res.status(200).json({ status: 'success', message: 'Get all reservations', data: reservations });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  }
};
