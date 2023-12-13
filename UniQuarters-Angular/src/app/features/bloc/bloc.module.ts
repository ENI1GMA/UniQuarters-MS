import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlocRoutingModule } from './bloc-routing.module';
import { ListBlocComponent } from './list-bloc/list-bloc.component';
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import { BlocFormComponent } from './bloc-form/bloc-form.component';
import {FormsModule} from "@angular/forms";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import { SchedulerComponent } from './scheduler/scheduler.component';
import {RippleModule} from "primeng/ripple";
import {TooltipModule} from "primeng/tooltip";
import {AppModule} from "../../app.module";


@NgModule({
  declarations: [
    ListBlocComponent,
    BlocFormComponent,
  ],
  imports: [
    CommonModule,
    BlocRoutingModule,
    TableModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    ToastModule,
    RippleModule,
    TooltipModule,

  ]
})
export class BlocModule { }
