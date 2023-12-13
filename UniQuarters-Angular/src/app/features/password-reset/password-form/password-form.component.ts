import { Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { passwordMatchValidator } from '../../shared/validators/passwordMatch.validator';
import { PasswordResetService } from 'src/app/services/password-reset.service';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent {
  validation_messages = {
    password: [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      { type: 'minlength', message: 'Votre mot de passe doit contenir au moins 8 caractères' }
    ],
    confirmPassword: [
      { type: 'required', message: 'Ce champ est obligatoire.' }
    ]
  }

  passwordResetForm = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  },
    { validators: [passwordMatchValidator] } as AbstractControlOptions
  )
  token?: string;
  ResultMessage?: string;
  loginButton = false;
  loading = true;
  constructor(
    private formBuilder: FormBuilder,
    private passwordResetService: PasswordResetService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.token = this.route.snapshot.params['token'];
    passwordResetService.getResetRequest(this.token!).subscribe({
      next: (response) => {
        this.loading = false;
        if(response.body.data.request)
        if (!response.body.data.request.valid || response.body.data.request.token != this.token) {
          this.ResultMessage = "Une erreur s'est produite, essayez d'envoyer une nouvelle demande de réinitialisation";
        }
      },
      error: (error) => { 
        router.navigate(["/"]);
      }
    })
  }

  submit() {
    if(this.token && this.passwordResetForm.value.password)
    this.passwordResetService.resetPassword(this.token,this.passwordResetForm.value.password).subscribe(
      response => {
        this.ResultMessage = response.message;
        this.loginButton = true;
      }
    );
  }
}
