import { Component } from '@angular/core';
import {
  AbstractControlOptions,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { passwordMatchValidator } from '../shared/validators/passwordMatch.validator';
import { Etudiant } from 'src/app/models/etudiant';
import { Role } from 'src/app/models/role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  today: Date = new Date();
  validation_messages = {
    email: [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      { type: 'email', message: "Cet email n'est pas valide" },
    ],
    password: [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      {
        type: 'minlength',
        message: 'Votre mot de passe doit contenir au moins 8 caractères',
      },
    ],
    confirmPassword: [
      { type: 'required', message: 'Ce champ est obligatoire.' },
    ],
    nom: [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      {
        type: 'minlength',
        message: 'Votre nom doit contenir au moins 3 caractères',
      },
    ],
    prenom: [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      {
        type: 'minlength',
        message: 'Votre prenom doit contenir au moins 3 caractères',
      },
    ],
    cin: [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      { type: 'minlength', message: 'Votre cin doit contenir 8 chiffres' },
    ],
    ecole: [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      {
        type: 'minlength',
        message: 'Le nom de votre ecole doit contenir au moins 3 caractères',
      },
    ],
    dateNaissance: [{ type: 'required', message: 'Ce champ est obligatoire.' }],
  };
  mailExists = false;

  registerForm = this.formBuilder.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      nom: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
          Validators.minLength(3),
        ],
      ],
      prenom: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/),
          Validators.minLength(3),
        ],
      ],
      cin: [
        undefined,
        [Validators.required, Validators.maxLength(8), Validators.minLength(8)],
      ],
      ecole: ['', [Validators.required, Validators.minLength(3)]],
      dateNaissance: ['', [Validators.required]],
    },
    { validators: [passwordMatchValidator] } as AbstractControlOptions
  );

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  submit() {
    const user = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
      role: Role.Etudiant,
    };
    const etudiant = {
      nom: this.registerForm.value.nom,
      prenom: this.registerForm.value.prenom,
      cin: this.registerForm.value.cin,
      ecole: this.registerForm.value.ecole,
      dateNaissance: this.registerForm.value.dateNaissance,
      user: user,
    };
    if (user.email != null) {
      /*this.authService.emailExists(user.email).subscribe( response => {
        if(response){
          this.mailExists = true;
        }else {
          this.mailExists = false;
        this.authService.register(etudiant as Etudiant).subscribe({
          next: (response) => {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Inscription avec succées!' });
            setTimeout(() => { this.router.navigate(['login']) }, 2000);
          },
          error: (e) => {
            console.log(e);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Une erreur est survenu' });
          }
        }
        );
      }
      })*/
    }
  }
}
