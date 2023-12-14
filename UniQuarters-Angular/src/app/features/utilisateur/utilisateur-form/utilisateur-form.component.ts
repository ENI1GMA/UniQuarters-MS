import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-utilisateur-form',
  templateUrl: './utilisateur-form.component.html',
  styleUrls: ['./utilisateur-form.component.scss'],
})
export class UtilisateurFormComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private dialogConfig: DynamicDialogConfig,
    private dialogService: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    if (this.dialogConfig.data) {
      this.id = this.dialogConfig.data.id;
      this.userService.getUser(this.id).subscribe((response) => {
        this.oldusername = response.body.username;
        this.userToSubmit = {
          id: response.body.id,
          username: response.body.username,
          password: response.body.password,
        };
      });
    }
  }

  userToSubmit = {} as User;
  oldusername!: string;
  id!: string;

  submit(f: NgForm) {
    // Add user
    if (this.id === undefined) {
      this.userService.addUser(this.userToSubmit).subscribe();
      this.dialogService.close();
    }
    // Update user
    else {

      this.userService.updateUser(this.userToSubmit).subscribe();
      this.dialogService.close();
    }
  }


}
