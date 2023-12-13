import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PasswordResetService } from 'src/app/services/password-reset.service';

@Component({
  selector: 'app-password-request',
  templateUrl: './password-request.component.html',
  styleUrls: ['./password-request.component.scss']
})
export class PasswordRequestComponent {

  emailToSubmit?: string;
  mailDoesntExist = false;
  resultMsg?: string;
  errorMsg?: string;
  loading = false;
  constructor(private passwordResetService: PasswordResetService) { }

  submit(f: NgForm) {
    this.loading = true;
    this.passwordResetService.requestPasswordReset(f.value.email).subscribe({
      next: (response) => {
        this.resultMsg = response.message;
        this.loading = false;
      },
      error: (error) =>{
        this.errorMsg = "Cet utilisateur n'existe pas";
        this.loading = false;
      }
    })
  }
}
