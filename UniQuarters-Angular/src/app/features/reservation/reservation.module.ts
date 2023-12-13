import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationRoutingModule } from './reservation-routing.module';
import { ListReservationsComponent } from './list-reservations/list-reservations.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { ReservationService } from 'src/app/services/reservation.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ListReservationsEtudiantComponent } from './list-reservations-etudiant/list-reservations-etudiant.component';
import { ReservationDetailsComponent } from './reservation-details/reservation-details.component';
import { ReservedChambresStatisticsComponent } from './reserved-chambres-statistics/reserved-chambres-statistics.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule } from 'primeng/chart';

@NgModule({
  declarations: [
    ListReservationsComponent,
    ReservationFormComponent,
    ListReservationsEtudiantComponent,
    ReservationDetailsComponent,
    ReservedChambresStatisticsComponent,
  ],
  imports: [
    ReservationRoutingModule,
    TableModule,
    TagModule,
    ConfirmDialogModule,
    CommonModule,
    FormsModule,
    ProgressBarModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    DropdownModule,
    TooltipModule,
    ProgressSpinnerModule,
    CardModule,
    PanelModule,
    ChartModule,
  ],
  providers: [
    DialogService,
    ConfirmationService,
    MessageService,
    ReservationService,
  ],
})
export class ReservationModule {}
