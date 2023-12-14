import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ServiceschedulerService {

  constructor(private http: HttpClient) { }


  // crud schedule
  private url = environment.uniQuartersUri + '/schedule';
  private apiUrl = 'http://localhost:8081/blocs/loadDatat';
  private addapi="http://localhost:8081/blocs/addTravaux"
  getEventList(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  addEvent(newAppointment: any): Observable<any> {
    return this.http.post<any>(this.addapi, newAppointment);
  }
  deleteEvent(id: number): Observable<any> {
    const deleteUrl = `http://localhost:8081/blocs/deleteTravaux/${id}`;
    return this.http.delete<any>(deleteUrl);
  }
  updateEvent(id: number, updatedAudience: any): Observable<any> {
    const updateUrl = `http://localhost:8081/blocs/updateTravaux/${id}`;
    return this.http.put<any>(updateUrl, updatedAudience);
  }
  getFilteredEventsByLocation(location: string): Observable<any[]> {
    const apiUrl = `http://localhost:8081/blocs/TravauxByLocation/${location}`;
    return this.http.get<any[]>(apiUrl);
  }

}
