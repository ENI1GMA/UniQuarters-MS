import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PasswordFormComponent } from './password-form/password-form.component';
import { PasswordRequestComponent } from './password-request/password-request.component';

const routes: Routes = [
  { path: ':token', component: PasswordFormComponent },
  { path: 'request/email', component: PasswordRequestComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordResetRoutingModule { }
