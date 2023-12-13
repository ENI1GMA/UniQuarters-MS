import { Bloc } from "./Bloc";
import { Reservation } from "./reservation";

export interface Chambre {
  id: number;
  numero: number | null; 
  capacity: number;
  description: string;
  type: string;
  bloc: Bloc | null; 
  reservations: Reservation[];
  review: number;
  wifi: boolean;
  airConditioning: boolean;
  privateBathroom: boolean;
  balcony: boolean;
  workspace: boolean;
  kitchenette: boolean;
  petFriendly: boolean;
  travaux: boolean;
  available: boolean;
  picture:string;
}
