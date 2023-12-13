import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Etudiant } from 'src/app/models/etudiant';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { EtudiantFormComponent } from '../etudiant-form/etudiant-form.component';
import { PasswordResetService } from 'src/app/services/password-reset.service';

@Component({
  selector: 'app-list-etudiant',
  templateUrl: './list-etudiant.component.html',
  styleUrls: ['./list-etudiant.component.scss']
})
export class ListEtudiantComponent implements OnInit {
  etudiantsList: Etudiant[] = [];

  subscription: Subscription = new Subscription;

  constructor(
    private etudiantService: EtudiantService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private passwordResetService: PasswordResetService
  ) { }
  ngOnInit(): void {
    this.getData();
    this.subscription = this.etudiantService.refresh$.subscribe(() => this.getData())
  }

  getData() {
    this.etudiantService.getEtudiants().subscribe(
      response => this.etudiantsList = response.body.data.etudiants
    );
  }
  Add() { this.dialogService.open(EtudiantFormComponent, { header: "Ajouter un etudiant" }) }
  Edit(id: number) { this.dialogService.open(EtudiantFormComponent, { header: "Modifier les informations d'etudiant", data: { id } }) }
  Delete(id: number) {
    this.confirmationService.confirm({
      message: "Êtes-vous sûr de vouloir effectuer cette action ?",
      acceptLabel: 'Supprimer',
      rejectLabel: 'Annuler',
      accept: () => {
        this.etudiantService.deleteEtudiant(id).subscribe()
      }
    })
  }
  Reset(email: string) {
    this.confirmationService.confirm({
      message: "Voulez vous envoyer un email de reinitialisation de mot de passe ?",
      acceptLabel: 'Envoyer',
      rejectLabel: 'Annuler',
      accept: () => {
        this.passwordResetService.requestPasswordReset(email).subscribe();
      }
    })
  }

}
