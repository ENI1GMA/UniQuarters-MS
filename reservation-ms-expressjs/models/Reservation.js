const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EtudiantSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
});
const ChambreSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
});

const reservationSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  anneeUniversitaire: {
    type: Date,
    required: true,
  },
  estValide: {
    type: Boolean,
    required: true,
  },
  etudiant: {
    type: EtudiantSchema,
  },
  chambre: {
    type: ChambreSchema,
    required: true,
  },
});

const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
