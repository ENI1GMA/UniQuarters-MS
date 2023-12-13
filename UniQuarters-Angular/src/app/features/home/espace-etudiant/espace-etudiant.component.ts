import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Reservation } from 'src/app/models/reservation';
import { AuthService } from 'src/app/services/auth.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-espace-etudiant',
  templateUrl: './espace-etudiant.component.html',
  styleUrls: ['./espace-etudiant.component.scss']
})
export class EspaceEtudiantComponent {

  id!: number;
  isLoading: boolean = true;

  reservations: Reservation[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public authService : AuthService,
    private reservationService: ReservationService,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    // set id from params snapshot
    this.authService.getLoggedInEtudiant().subscribe({
      next: (response: any) => {
        console.log('logged in etudiant response', response);
        this.id = response?.data?.etudiant.id;
        console.log(this.id)
        this.reservationService
        .getReservationsByEtudiant(this.id)
        .subscribe({
          next: (response: any) => {
            this.isLoading = false;
            this.messageService.add({
              severity: 'success',
              summary: 'Succès',
              detail: `${response.data.reservations.length} réservations récupérées avec succès.`,
            });
            console.log('response:', response);
            this.reservations = response.data.reservations;
            console.log('🚀 ~ reservations:', this.reservations);
          },
          error: (error) => {
            console.log('error:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Erreur',
              detail:
                error?.error?.message ||
                'Une erreur est survenue lors de la récupération des réservations',
            });
            console.error('Error fetching data:', error);
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
    
    console.log('🚀 ~ this.id:', this.id);

    // get reservations by id
   
  }
}
