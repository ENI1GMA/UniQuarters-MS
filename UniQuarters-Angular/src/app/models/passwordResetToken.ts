import { User } from "./user";

export interface PasswordResetToken{
    id:number,
    token:string,
    valid:boolean,
    user:User
}