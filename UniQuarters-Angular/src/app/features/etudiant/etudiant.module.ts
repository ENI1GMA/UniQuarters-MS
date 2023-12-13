import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtudiantRoutingModule } from './etudiant-routing.module';
import { ListEtudiantComponent } from './list-etudiant/list-etudiant.component';
import { EtudiantFormComponent } from './etudiant-form/etudiant-form.component';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { KeyFilterModule } from 'primeng/keyfilter';
import { TagModule } from 'primeng/tag';
import { SelectButtonModule } from 'primeng/selectbutton';


@NgModule({
  declarations: [
    ListEtudiantComponent,
    EtudiantFormComponent
  ],
  imports: [
    CommonModule,
    EtudiantRoutingModule,
    ConfirmDialogModule,
    ToastModule,
    FormsModule,
    InputTextModule,
    TableModule,
    DropdownModule,
    PasswordModule,
    CalendarModule,
    ReactiveFormsModule,
    KeyFilterModule,
    TagModule,
    SelectButtonModule
  ]
})
export class EtudiantModule { }
