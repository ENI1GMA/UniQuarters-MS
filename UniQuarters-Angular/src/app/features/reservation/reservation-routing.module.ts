import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListReservationsComponent } from './list-reservations/list-reservations.component';
import { ListReservationsEtudiantComponent } from './list-reservations-etudiant/list-reservations-etudiant.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { ReservedChambresStatisticsComponent } from './reserved-chambres-statistics/reserved-chambres-statistics.component';

const routes: Routes = [
  {
    path: '',
    component: ListReservationsComponent,
  },
  // /etudiant/1
  {
    path: 'etudiant/:id',
    component: ListReservationsEtudiantComponent,
  },
  {
    path: 'reservedChambresStatistics',
    component: ReservedChambresStatisticsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservationRoutingModule {}
