import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';
import { ReservationService } from 'src/app/services/reservation.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CardModule } from 'primeng/card';
import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';
import { HomeRoutingModule } from './home-module.routing';

import { EspaceEtudiantComponent } from './espace-etudiant/espace-etudiant.component';


@NgModule({
    declarations: [


    
    EspaceEtudiantComponent
  ],

    imports: [
        HomeRoutingModule,
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
export class HomeModule { }
