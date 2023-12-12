const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EtudiantSchema = new Schema(
  {
    id: {
      type: String,
    },
  },
  {
    _id: false, // Disable the automatic generation of _id since id is used as the primary identifier
  }
);
const ChambreSchema = new Schema(
  {
    id: {
      type: String,
    },
  },
  {
    _id: false, // Disable the automatic generation of _id since id is used as the primary identifier
  }
);

const reservationSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  anneeUniversitaire: {
    type: Number,
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
