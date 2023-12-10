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
};
