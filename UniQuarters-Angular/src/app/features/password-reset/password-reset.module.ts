import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PasswordResetRoutingModule } from './password-reset-routing.module';
import { PasswordFormComponent } from './password-form/password-form.component';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PasswordRequestComponent } from './password-request/password-request.component';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [
    PasswordFormComponent,
    PasswordRequestComponent
  ],
  imports: [
    CommonModule,
    PasswordResetRoutingModule,
    PasswordModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    ProgressSpinnerModule,
    InputTextModule
  ]
})
export class PasswordResetModule { }
