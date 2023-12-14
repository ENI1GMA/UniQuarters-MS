import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReclamationRoutingModule } from './reclamation-routing.module';
import { ListReclamationComponent } from './list-reclamation/list-reclamation.component';
import { ReclamationFormComponent } from './reclamation-form/reclamation-form.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    ListReclamationComponent,
    ReclamationFormComponent
  ],
  imports: [
    CommonModule,
    ReclamationRoutingModule,
    ConfirmDialogModule,
    ToastModule,
    FormsModule,
    InputTextModule,
    TableModule,
    DropdownModule,
  ]
})
export class ReclamationModule { }
