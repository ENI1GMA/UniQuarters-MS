import { Component,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Chambre } from 'src/app/models/chambre';
import { AuthService } from 'src/app/services/auth.service';
import { ChambreService } from 'src/app/services/chambre.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-chambre-card',
  templateUrl: './chambre-card.component.html',
  styleUrls: ['./chambre-card.component.scss']
})
export class ChambreCardComponent {
  @Input() chambre!: Chambre;

  constructor(
    private reservationService :ReservationService,
    private authService: AuthService,
    public messageService :MessageService,
  ) {}

  
  addReservation(idChambre: number) {
    this.authService.getLoggedInEtudiant().subscribe({
      next: (response: any) => {
        console.log('logged in etudiant response', response);
        const etudiantCin = response?.data?.etudiant.cin;
        this.reservationService.addReservation(idChambre, etudiantCin).subscribe({
          next: (response: any) => {
            console.log('🚀 ~ response', response);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: response.message || 'Reservation added successfully',
            });
            this.reservationService.getReservations();
          },
          error: err => {
            console.log(err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: err?.error?.message || 'Something went wrong',
            });
          },
          complete: () => {
            console.log('completed');
          },
        });
      },
      error: error => {
        console.log('error:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error?.error?.message || 'Something went wrong Getting logged in etudiant',
        });
      },
    });
  }
}
