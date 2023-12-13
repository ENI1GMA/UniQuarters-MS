import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UniversiteRoutingModule } from './universite-routing.module';
import { ListUniversiteComponent } from './list-universite/list-universite.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UniversiteFormComponent } from './universite-form/universite-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { UniversiteDetailsComponent } from './universite-details/universite-details.component';
import { CardModule } from 'primeng/card';
import { ListUniversiteFilteredComponent } from './list-universite-filtered/list-universite-filtered.component';
import { UniversiteLocationComponent } from './universite-location/universite-location.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FileUploadModule } from 'primeng/fileupload';
import { LatLngToAddressPipe } from 'src/app/pipes/lat-lng-to-address.pipe';


@NgModule({
  declarations: [
    ListUniversiteComponent,
    UniversiteFormComponent,
    UniversiteDetailsComponent,
    ListUniversiteFilteredComponent,
    UniversiteLocationComponent, 
     LatLngToAddressPipe,

  ],
  imports: [
    TableModule,
    TagModule,
    ConfirmDialogModule,
    CommonModule,
    UniversiteRoutingModule,
    FormsModule,
    ProgressBarModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    ReactiveFormsModule,
    CardModule, LeafletModule,FileUploadModule,
   


  ],
  providers: [DialogService,ConfirmationService, MessageService],

})
export class UniversiteModule { }
