// Reservation Router
const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservation.js');

router.get('/', ReservationController.getAllReservations);
router.get('/:id', ReservationController.getReservation);
router.get('/etudiant/:id', ReservationController.getReservationByEtudiant);
router.post('/:idChambre/:idEtudiant', ReservationController.createReservation);
module.exports = router;
