// Reservation Router
const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservation');

router.get('/', ReservationController.getAllReservations);

module.exports = router;
