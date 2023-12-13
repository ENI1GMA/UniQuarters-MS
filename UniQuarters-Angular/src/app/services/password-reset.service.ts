import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const uniQuartersUri = environment.uniQuartersUri + "/password-reset";

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  constructor(private http: HttpClient) { }

  requestPasswordReset(email:string):Observable<any>{
    return this.http.get(uniQuartersUri+"/"+email);
  }

  resetPassword(token:string,password:string):Observable<any>{
    return this.http.get<string>(uniQuartersUri+"/reset/"+token+"/"+password);
  }

  getResetRequest(token:string):Observable<HttpResponse<any>>{
    return this.http.get(uniQuartersUri+"/getRequest/"+token, {observe:'response'});
  }
}
