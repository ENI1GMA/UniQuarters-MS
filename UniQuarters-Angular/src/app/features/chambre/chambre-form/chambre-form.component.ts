import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { ChambreService } from 'src/app/services/chambre.service';
import { Chambre } from 'src/app/models/chambre';
import { BlocService } from 'src/app/services/bloc.service';
import { TypeChambre } from 'src/app/models/typeChambre';

@Component({
  selector: 'app-chambre-form',
  templateUrl: './chambre-form.component.html',
  styleUrls: ['./chambre-form.component.scss'],
  encapsulation:ViewEncapsulation.None

})
export class ChambreFormComponent implements OnInit {
  loading: boolean = false;
  submitted = false;
  typeChambreOptions: { value: string; label: string }[] = [];
  addedChambre!: Chambre;
  selectedBlocId: string | null = null;


  constructor(
    public chambreService: ChambreService,
    private readonly ref: DynamicDialogRef,
    public messageService: MessageService,
    public blocService: BlocService
  ) { }

  ngOnInit(): void {
    this.typeChambreOptions = Object.values(TypeChambre).map(value => ({ value, label: value }));
    this.loadBlocs()
  }

  toggleBooleanValue(key: string): void {
    const control = this.chambreService.AddOrEditChambreForm.get(key);
    if (control) {
    
      control.setValue(!control.value);
    }
    console.log(this.chambreService.AddOrEditChambreForm.value)
  }

  loadChambres() {
    this.chambreService.retrieveChambres().subscribe(
      (response: any) => {
        console.log(response.body.data.chambres)

        this.chambreService.chambres = response.body.data.chambres;
      },
      (error) => {
        console.error('Error loading chambres:', error);
      }
    );
  }

  loadBlocs() {
    this.blocService.getAllBlocs().subscribe(
      (response: any) => {
        this.blocService.data = response.data.blocs;      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    )
  }
  AddChambre() {
    this.submitted = true;

    if (this.chambreService.AddOrEditChambreForm.valid) {
      this.loading = true;
      
      if (this.chambreService.AddOrEditChambreForm.value.type === 'SIMPLE') {
        this.chambreService.AddOrEditChambreForm.value.capacity=1;
      } else if (this.chambreService.AddOrEditChambreForm.value.type === 'DOUBLE') {
        this.chambreService.AddOrEditChambreForm.value.capacity=2;
      } else if (this.chambreService.AddOrEditChambreForm.value.type === 'TRIPLE') {
        this.chambreService.AddOrEditChambreForm.value.capacity=3;
      }
      console.log(this.chambreService.AddOrEditChambreForm.value)
      this.chambreService.addChambre(this.chambreService.AddOrEditChambreForm.value as Chambre).subscribe(
        (response: any) => {

          this.addedChambre = response.body.data.chambre;
          this.loadChambres();
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Chambre ajoutée',
            life: 5000,
          });
          this.ref.close();
          this.chambreService.AddOrEditChambreForm.reset();
          this.submitted = false;
          this.loading = false;

   
        },
        (addError) => {
          console.error('Erreur lors de l\'ajout de la chambre', addError);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Erreur lors de l\'ajout de la chambre',
            life: 5000,
          });
          this.loading = false;
        }
      );

    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Le formulaire n\'est pas valide. Veuillez remplir tous les champs requis.',
        life: 5000,
      });
    }
  }

  UpdateChambre() {
    this.submitted = true;

    if (this.chambreService.AddOrEditChambreForm.valid) {
      this.loading = true;
      if (this.chambreService.AddOrEditChambreForm.value.type === 'SIMPLE') {
        this.chambreService.AddOrEditChambreForm.value.capacity=1;
      } else if (this.chambreService.AddOrEditChambreForm.value.type === 'DOUBLE') {
        this.chambreService.AddOrEditChambreForm.value.capacity=2;
      } else if (this.chambreService.AddOrEditChambreForm.value.type === 'TRIPLE') {
        this.chambreService.AddOrEditChambreForm.value.capacity=3;
      }
      console.log(this.chambreService.AddOrEditChambreForm.value)
      const updatedChambre = this.chambreService.AddOrEditChambreForm.value;
      if (updatedChambre.id !== undefined && updatedChambre.id !== null) {
        this.chambreService.updateChambre(updatedChambre.id, updatedChambre as Chambre).subscribe(
          (response) => {
            console.log(response)
            this.loadChambres();

            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Chambre mise à jour avec succès',
              life: 5000,
            });
            this.ref.close();
            this.chambreService.AddOrEditChambreForm.reset();
            this.submitted = false;
            this.loading = false;
          },
          (error) => {
            console.error('Error updating chambre:', error);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Erreur lors de la mise à jour de la chambre',
              life: 5000,
            });
            this.loading = false;
          }
        );
      }

    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Le formulaire n\'est pas valide. Veuillez remplir tous les champs requis.',
        life: 5000,
      });
    }
  }

  populateForm(d: any) {
    this.chambreService.AddOrEditChambreForm.reset({
      id: d.id,
      numero: d.numero,
      description: d.description,
      type: d.type,
      wifi: d.wifi,
      airConditioning: d.airConditioning,
      privateBathroom: d.privateBathroom,
      balcony: d.balcony,
      workspace: d.workspace,
      kitchenette: d.kitchenette,
      petFriendly: d.petFriendly,
      travaux: d.travaux
    });
  }
}