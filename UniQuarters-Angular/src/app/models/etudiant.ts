import { Reservation } from "./reservation";
import { User } from "./user";

export interface Etudiant {
  id?: number;
  nom?: string;
  prenom?: string;
  cin?: number;
  ecole?: string;
  dateNaissance?: string;
  user?: User;
  reservations?: Reservation[];
}
