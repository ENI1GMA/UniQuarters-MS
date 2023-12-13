import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reserved-chambres-statistics',
  templateUrl: './reserved-chambres-statistics.component.html',
  styleUrls: ['./reserved-chambres-statistics.component.scss'],
})
export class ReservedChambresStatisticsComponent implements OnInit {
  isLoading: boolean = false;
  isSuccess: boolean = false;
  options = {
    responsive: false,
    maintainAspectRatio: false,
  };
  data: ChartData = {
    labels: ['Free Places', 'Reserved Places'],
    datasets: [],
  };

  chambresReservations: any = [];

  constructor(
    public reservationService: ReservationService,
    public messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.isLoading = true;
    this.reservationService.getChambresReservations().subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Succès',
          detail: `${response.data.chambresReservations.length} statistique de chambres récupérées avec succès.`,
        });
        console.log('response:', response);
        this.isSuccess = true;
        response.data.chambresReservations.forEach((chambre: any) => {
          // Add a new dataset for each chambre
          this.data.datasets!.push({
            data: [chambre.freePlaces, chambre.reservationsCount],
            backgroundColor: ['#00B14A', 'red'],
            label: `Chambre ${chambre.chambre.numero}`,
          });
        });
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
}
