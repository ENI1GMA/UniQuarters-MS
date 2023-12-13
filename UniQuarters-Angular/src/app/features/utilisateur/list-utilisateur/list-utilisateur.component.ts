import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { UtilisateurFormComponent } from '../utilisateur-form/utilisateur-form.component';
import { Role } from 'src/app/models/role';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PasswordResetService } from 'src/app/services/password-reset.service';

@Component({
  selector: 'app-list-utilisateur',
  templateUrl: './list-utilisateur.component.html',
  styleUrls: ['./list-utilisateur.component.scss']
})
export class ListUtilisateurComponent implements OnInit {

  usersList: User[] = [];

  subscription: Subscription = new Subscription;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
  ) { }
  ngOnInit(): void {
    this.getData();
    this.subscription = this.userService.refresh$.subscribe(() => this.getData())
  }

  getData() {
    this.userService.getUsers().subscribe(
      (      response: { body: User[]; }) => this.usersList = response.body
    );
  }

  Add() { this.dialogService.open(UtilisateurFormComponent, { header: "Ajouter un utilisateur" }) }
  Edit(id: string) { this.dialogService.open(UtilisateurFormComponent, { header: "Modifier les informations d'uilisateur", data: { id } }) }
  Delete(id: string) {
    this.confirmationService.confirm({
      message: "Êtes-vous sûr de vouloir effectuer cette action ?",
      acceptLabel: 'Supprimer',
      rejectLabel: 'Annuler',
      accept: () => {
        this.userService.deleteUser(id).subscribe()
      }
    })
  }

}
