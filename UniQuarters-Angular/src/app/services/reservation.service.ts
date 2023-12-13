import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  apiUrl = environment.baseUrl + '/reservations';
  constructor(
    private _http: HttpClient,
    public messageService: MessageService
  ) {}

  isLoading = false;
  data: Reservation[] = [];

  private parseData(response: any): Reservation[] {
    response.data.reservations.forEach((reservation: any) => {
      const chambre = response.data.chambres.find(
        (chambre: any) => chambre.idReservation === reservation.id
      );
      reservation.chambre = chambre;
    });
    return response.data.reservations;
  }
  getReservations() {
    this.isLoading = true;
    this._http.get(this.apiUrl).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `${response.data.reservations.length} réservations récupérées avec succès.`,
        });
        console.log('response:', response);
        this.data = response.data.reservations;
        console.log('🚀 ~ reservations from service after parse:', this.data);
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail:
            error?.error?.message ||
            'Une erreur est survenue lors de la validation de la réservation.',
        });
        console.error('Error fetching data:', error);
      },
    });
  }

  getReservationsByEtudiant(idEtudiant: number) {
    return this._http.get(`${this.apiUrl}/etudiant/${idEtudiant}`);
  }
  getReservation(id: String) {
    return this._http.get(`${this.apiUrl}/${id}`);
  }

  addReservation(idChambre: number, idEtudiant: string) {
    return this._http.post(`${this.apiUrl}/${idChambre}/${idEtudiant}`, {});
  }

  updateReservation(id: String) {
    return this._http.put(`${this.apiUrl}/${id}`, {});
  }

  validateReservation(id: String) {
    return this._http.patch(`${this.apiUrl}/valider/${id}`, {});
  }

  cancelReservation(cinEtudiant: number) {
    return this._http.delete(`${this.apiUrl}/${cinEtudiant}`);
  }

  getEtudiants() {
    return this._http.get('http://keycloakauth:8080/admin/realms/Enigma/users');
  }

  getChambres() {
    return this._http.get(environment.baseUrl + '/chambres');
  }

  getChambresReservations() {
    return this._http.get(this.apiUrl + '/ChambresReservations');
  }
}
