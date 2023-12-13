import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Chambre } from 'src/app/models/chambre';
import { Etudiant } from 'src/app/models/etudiant';
import { Reservation } from 'src/app/models/reservation';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.scss'],
})
export class ReservationFormComponent implements OnInit {
  id: String = '';

  reservation: Reservation = {} as Reservation;

  selectedEtudiant: Etudiant | null = null;
  selectedChambre: Chambre | null = null;
  chambres: Chambre[] = [];
  etudiants: Etudiant[] = [];
  constructor(
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public messageService: MessageService,
    private dialogRef: DynamicDialogRef
  ) {}

  getReservation(id: String) {
    this.reservationService.getReservation(id).subscribe({
      next: (data: any) => {
        this.reservation = data.reservation as Reservation;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getEtudiants() {
    this.reservationService.getEtudiants().subscribe({
      next: (response: any) => {
        this.etudiants = response.data.etudiants as Etudiant[];
        console.log('🚀 ~  this.etudiants:', this.etudiants);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getEtudiantLabel(etudiant: Etudiant) {
    return `${etudiant.nom} ${etudiant.prenom}, ${etudiant.cin}`;
  }

  getChambres() {
    this.reservationService.getChambres().subscribe({
      next: (response: any) => {
        this.chambres = response.data.chambres as Chambre[];
        console.log('🚀 ~ this.chambres:', this.chambres); 
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.getEtudiants();
    this.getChambres();

    console.log('selectedEtudiant', this.selectedEtudiant);
    console.log('selectedChambre', this.selectedChambre);

    if (this.getMode() === 'Edit') {
      this.getReservation(this.id);
    }
  }

  getMode() {
    return this.id ? 'Edit' : 'Add';
  }
  onSubmit(form: NgForm) {
    console.log(form);

    if (this.getMode() === 'Edit') {
      this.reservationService.updateReservation(this.id);
    } else {
      if (form.valid) {
        const {
          selectedChambre: { id: chambreId },
          selectedEtudiant: { cin: etudiantCin },
        } = form.value;
        console.log('Form submitted:', form.value);
        this.reservationService
          .addReservation(chambreId, etudiantCin)
          .subscribe({
            next: (response: any) => {
              console.log('🚀 ~ response', response);
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: response.message || 'Reservation added successfully',
              });
              this.reservationService.getReservations();
            },
            error: (err) => {
              console.log(err);
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: err?.error?.message || 'Something went wrong',
              });
            },
            complete: () => {
              console.log('completed');
            },
          });
      } else {
        // Handle validation errors
        console.log('Form has validation errors');
      }
      this.dialogRef.close();
    }
  }

  isFormControlInvalid(form: NgForm, controlName: string): boolean {
    const control = form.controls[controlName];
    console.log('🚀 ~ control:', control);
    //return control && control.invalid && (control.dirty || control.touched);
    const result = control && control.invalid && control.touched;
    console.log('control.invalid', control.invalid);
    console.log('control.touched', control.touched);

    console.log('🚀 ~ result:', result);
    return result;
  }
}
