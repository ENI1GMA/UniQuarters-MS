// Reservation Router
const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservation');

router.get('/', ReservationController.getAllReservations);
router.get('/:id', ReservationController.getReservation);
router.post('/:idChambre/:idEtudiant', ReservationController.createReservation);
module.exports = router;
