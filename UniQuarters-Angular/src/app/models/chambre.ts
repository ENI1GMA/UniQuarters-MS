export interface Chambre {
  id: number;
  numero: number | null; 
  capacity: number;
  description: string;
  type: string;
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
  idBloc:number|null; 
}
