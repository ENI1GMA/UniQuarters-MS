import { Etudiant } from './etudiant';
import { Chambre } from './chambre';
export interface Reservation {
  id: string;
  anneeUniversitaire: string;
  estValide: boolean;
  etudiants: Etudiant[];
  //etudiants: any[]; resa merge possiblity
  chambre?: any;
}
