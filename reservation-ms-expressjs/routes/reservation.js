// Reservation Router
const express = require('express');
const router = express.Router();
const ReservationController = require('../controllers/reservation.js');

router.get('/', ReservationController.getAllReservations);
router.get('/ChambresReservations', ReservationController.getChambresReservationsStatistiques);
router.get('/:id', ReservationController.getReservation);
router.get('/etudiant/:id', ReservationController.getReservationByEtudiant);
router.patch('/valider/:idReservation', ReservationController.validerReservation);
router.post('/:idChambre/:idEtudiant', ReservationController.createReservation);
router.delete('/:id', ReservationController.cancelReservation);
module.exports = router;
