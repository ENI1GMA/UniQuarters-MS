import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoyersRoutingModule } from './foyers-routing.module';
import { ListFoyersComponent } from './list-foyers/list-foyers.component';
import { FoyerFormComponent } from './foyer-form/foyer-form.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { CardModule } from 'primeng/card';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FileUploadModule } from 'primeng/fileupload';


@NgModule({
  declarations: [
    ListFoyersComponent,
    FoyerFormComponent
  ],
  imports: [
    CommonModule,
    FoyersRoutingModule,TableModule,
    TagModule,
    ConfirmDialogModule,
    
    
    FormsModule,
    ProgressBarModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    ReactiveFormsModule,
    CardModule, LeafletModule,FileUploadModule,
   


  ]
})
export class FoyersModule { }
