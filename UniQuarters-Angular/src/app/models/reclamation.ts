import { ReclamationStatus } from "./reclamation-status";

export interface Reclamation {
    id:number;
    description:string;
    title:string;
    status:ReclamationStatus;
    date:string;
    isDeleted:boolean;
    userId:string
}
