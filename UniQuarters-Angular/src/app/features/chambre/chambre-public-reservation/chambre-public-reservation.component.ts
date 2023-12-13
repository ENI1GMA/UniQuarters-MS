import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { ChambreService } from 'src/app/services/chambre.service';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-chambre-public-reservation',
  templateUrl: './chambre-public-reservation.component.html',
  styleUrls: ['./chambre-public-reservation.component.scss']
})
export class ChambrePublicReservationComponent {
  chambres!: any[] ;
  foyerId!: number;
  showSkeleton: boolean = true;

  constructor(
    private reservationService :ReservationService,
    private authService: AuthService,
    public messageService :MessageService,
    private chambreService: ChambreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.foyerId = params['foyerId'];
      setTimeout(() => {
        this.fetchChambres();
      }, 2000);    });
  }

  fetchChambres(): void {
    this.chambreService.getAvailableChambres().subscribe(
      (response: any) => {
        const allChambres: any[] = response.body.data.chambres;
        console.log(allChambres);
  
        // Filter chambres based on foyerName
        this.chambres = allChambres.filter(
          (chambre) => chambre.bloc.foyer.id == this.foyerId
        );
  
        // Calculate and set review property for each chambre
        this.chambres.forEach((chambre) => {
          const booleansToAverage = [
            chambre.wifi,
            chambre.airConditioning,
            chambre.privateBathroom,
            chambre.balcony,
            chambre.workspace,
            chambre.kitchenette,
            chambre.petFriendly,
          ];
  
          const moyenne = this.calculateMoyenne(booleansToAverage);
          // Map the percentage moyenne to a 0-5 scale
          chambre.review = (moyenne / 20); // Assuming you want increments of 20 for each star
        });
  
        console.log(this.chambres, this.foyerId);
      },
      (error) => {
        console.error('Error loading chambres:', error);
      }
    );
  }
  
  calculateMoyenne(booleans: boolean[]): number {
    const trueCount = booleans.filter((bool) => bool).length;
    const moyenne = (trueCount / booleans.length) * 100; // Assuming you want a percentage
    return moyenne;
  }
  
  

}