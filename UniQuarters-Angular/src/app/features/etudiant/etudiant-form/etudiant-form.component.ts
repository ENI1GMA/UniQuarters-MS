import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, NgForm, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Etudiant } from 'src/app/models/etudiant';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { EtudiantService } from 'src/app/services/etudiant.service';

@Component({
  selector: 'app-etudiant-form',
  templateUrl: './etudiant-form.component.html',
  styleUrls: ['./etudiant-form.component.scss']
})
export class EtudiantFormComponent implements OnInit {
  today: Date = new Date();
  validation_messages = {
    email: [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      { type: 'email', message: "Cet email n'est pas valide" }
    ],
    password: [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      { type: 'minlength', message: 'Votre mot de passe doit contenir au moins 8 caractères' }
    ],
    nom: [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      { type: 'minlength', message: 'Votre nom doit contenir au moins 3 caractères' }
    ],
    prenom: [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      { type: 'minlength', message: 'Votre prenom doit contenir au moins 3 caractères' }
    ],
    cin: [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      { type: 'minlength', message: 'Votre cin doit contenir 8 chiffres' }
    ],
    ecole: [
      { type: 'required', message: 'Ce champ est obligatoire.' },
      { type: 'minlength', message: 'Le nom de votre ecole doit contenir au moins 3 caractères' }
    ],
    dateNaissance: [
      { type: 'required', message: 'Ce champ est obligatoire.' }
    ]
  }
  etudiantToSubmit = {} as Etudiant;
  userToSubmit = {} as User;
  oldEmail!: string;
  id!: number;
  mailExists = false;
  stateOptions = [{ label: "Active", value: true }, { label: "Desactivé", value: false }];

  etudiantForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    nom: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/), Validators.minLength(3)]],
    prenom: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+(?: [a-zA-Z]+)*$/), Validators.minLength(3)]],
    cin: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
    ecole: ['', [Validators.required, Validators.minLength(3)]],
    dateNaissance: ['', [Validators.required]],
    enabled: [this.stateOptions[0].value,[Validators.required]]
  }
  )

  constructor(
    private formBuilder: FormBuilder,
    private etudiantService: EtudiantService,
    private authService: AuthService,
    private dialogConfig: DynamicDialogConfig,
    private dialogService: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    if (this.dialogConfig.data) {
      this.id = this.dialogConfig.data.id;
      this.etudiantService.getEtudiant(this.id).subscribe(response => {
        this.etudiantToSubmit = response.body.data.etudiant;
        this.oldEmail = response.body.data.etudiant.user.email;
        this.userToSubmit = {
          id: response.body.data.etudiant.user.id,
          email: response.body.data.etudiant.user.email,
          password: response.body.data.etudiant.user.password,
          enabled: response.body.data.etudiant.user.enabled,
          role: response.body.data.etudiant.user.role
        }
        // mapping etudiant to form
        this.etudiantForm.controls.email.setValue(this.userToSubmit.email);
        this.etudiantForm.controls.password.disable();
        this.etudiantForm.controls.password.setValue(this.userToSubmit.password);
        this.etudiantForm.controls.nom.setValue(this.etudiantToSubmit.nom!);
        this.etudiantForm.controls.prenom.setValue(this.etudiantToSubmit.prenom!);
        this.etudiantForm.controls.ecole.setValue(this.etudiantToSubmit.ecole!);
        this.etudiantForm.controls.cin.setValue(this.etudiantToSubmit.cin!.toString());
        this.etudiantForm.controls.dateNaissance.setValue(this.etudiantToSubmit.dateNaissance!);
        this.etudiantForm.controls.enabled.setValue(this.userToSubmit.enabled)
      })
    }
  }


  submit() {
    const user = {
      id: this.userToSubmit.id,
      email: this.etudiantForm.value.email,
      password: this.etudiantForm.getRawValue().password,
      enabled: this.etudiantForm.value.enabled,
      role:  Role.Etudiant
    };
    const etudiant = {
      id: this.etudiantToSubmit.id,
      nom: this.etudiantForm.value.nom,
      prenom: this.etudiantForm.value.prenom,
      cin: this.etudiantForm.value.cin,
      ecole: this.etudiantForm.value.ecole,
      dateNaissance: this.etudiantForm.value.dateNaissance,
      user: user
    };
    // Add etudiant
    if (this.id === undefined) {
      this.authService.emailExists(user.email!).subscribe(response => {
        if (response) {
          this.mailExists = true;
        } else {
          this.mailExists = false;
          this.etudiantService.addEtudiant(etudiant as Etudiant).subscribe();
          this.dialogService.close();
        }
      })
    }
    // Update etudiant 
    else {

      this.authService.emailExists(user.email!).subscribe(response => {
        if (response && response != this.oldEmail) {
          this.mailExists = true;
        } else {
          this.mailExists = false;
          this.etudiantService.updateEtudiant(etudiant as Etudiant).subscribe();
          this.dialogService.close();
        }
      });
    }
  }
}
