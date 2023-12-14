import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { Reclamation } from 'src/app/models/reclamation';
import { ReclamationService } from 'src/app/services/reclamation.service';
import { ReclamationFormComponent } from '../reclamation-form/reclamation-form.component';

@Component({
  selector: 'app-list-reclamation',
  templateUrl: './list-reclamation.component.html',
  styleUrls: ['./list-reclamation.component.scss']
})
export class ListReclamationComponent {
  reclamationsList: Reclamation[] = [];

  subscription: Subscription = new Subscription;

  constructor(
    private reclamationService: ReclamationService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
  ) { }
  ngOnInit(): void {
    this.getData();
    this.subscription = this.reclamationService.refresh$.subscribe(() => this.getData())
  }

  getData() {
    this.reclamationService.getReclamations().subscribe(
      (      response: { body: Reclamation[]; }) => this.reclamationsList = response.body
    );
  }

  Add() { this.dialogService.open(ReclamationFormComponent, { header: "Ajouter une reclamation" }) }
  Edit(id: number) { this.dialogService.open(ReclamationFormComponent, { header: "Modifier les informations d'une reclamation", data: { id } }) }
  Delete(id: number) {
    this.confirmationService.confirm({
      message: "Êtes-vous sûr de vouloir effectuer cette action ?",
      acceptLabel: 'Supprimer',
      rejectLabel: 'Annuler',
      accept: () => {
        this.reclamationService.deleteReclamation(id).subscribe()
      }
    })
  }

}
