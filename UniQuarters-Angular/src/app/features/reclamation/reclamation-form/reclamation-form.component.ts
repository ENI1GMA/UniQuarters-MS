import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Reclamation } from 'src/app/models/reclamation';
import { ReclamationStatus } from 'src/app/models/reclamation-status';
import { AuthService } from 'src/app/services/auth.service';
import { ReclamationService } from 'src/app/services/reclamation.service';

@Component({
  selector: 'app-reclamation-form',
  templateUrl: './reclamation-form.component.html',
  styleUrls: ['./reclamation-form.component.scss']
})
export class ReclamationFormComponent implements OnInit {

  statusList = [
    ReclamationStatus.IN_PROGRESS,
    ReclamationStatus.PENDING,
    ReclamationStatus.REJECTED,
    ReclamationStatus.RESOLVED
  ];
  reclamationToSubmit = {} as Reclamation;
  id!: number;
  today: Date = new Date();

  constructor(
    private reclamationService: ReclamationService,
    private authService: AuthService,
    private dialogConfig: DynamicDialogConfig,
    private dialogService: DynamicDialogRef
  ) { }

  ngOnInit(): void {
    if (this.dialogConfig.data) {
      this.id = this.dialogConfig.data.id;
      this.reclamationService.getReclamation(this.id).subscribe((response) => {
        this.reclamationToSubmit = {
          id: response.body.id,
          title: response.body.title,
          description: response.body.description,
          date: response.body.date,
          isDeleted: response.body.isDeleted,
          status: response.body.status,
          userId: response.body.userId,
        };
      });
    }
  }


  submit(f: NgForm) {
    // Add Reclamation
    if (this.id === undefined) {
      this.reclamationToSubmit.userId = sessionStorage.getItem("userId")!;
      this.reclamationToSubmit.date = this.today.toDateString();
      this.reclamationService.addReclamation(this.reclamationToSubmit).subscribe();
      this.dialogService.close();
    }
    // Update Reclamation
    else {

      this.reclamationService.updateReclamation(this.reclamationToSubmit).subscribe();
      this.dialogService.close();
    }
  }


}
