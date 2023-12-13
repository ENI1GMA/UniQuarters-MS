import { Component } from '@angular/core';
import { BlocService } from 'src/app/services/bloc.service';
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService} from "primeng/api";
import {Bloc} from "../../../models/Bloc";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-bloc-form',
  templateUrl: './bloc-form.component.html',
  styleUrls: ['./bloc-form.component.scss']
})
export class BlocFormComponent {
  id: number = 0;
  foyers: any[] = [];
  selectedFoyerId!: number;
  constructor(
      private blocService: BlocService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private readonly dialogService: DynamicDialogRef,
      private config: DynamicDialogConfig,
      public messageService: MessageService,
      private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.id = this.config.data?.id;
    console.log("ID onInit f lvl ::: "+this.id);
    if (this.id != undefined) {
      this.blocService.fetchBlocById(this.id).subscribe({
        next: (data: any) => { this.bl = data.data.bloc; },
      });
    }
    this.id = this.config.data?.id;

    // Fetch the list of foyers when the component initializes
    this.blocService.getAllFoyers().subscribe({
      next: (data: any[]) => {
        this.foyers = data;
        console.log("FOYERS LIST f lvl ::: "+JSON.stringify(this.foyers, null, 2));
      },
      error: (error) => {
        console.error('Error fetching foyer list:', error);
      },
    });

    if (this.id !== undefined) {
      // Existing code to fetch bloc data
    }
  }
  bl: Bloc = new Bloc();
 /* add(f: NgForm){
    console.log("form value  :::: "+f.value);
    // if the id is EXIST  then we are adding a new bloc ELSE we ADD the BLOC
    if (this.id !== undefined) {
      this.blocService.updateBloc(this.id, this.bl).subscribe((data)=>{
        this.blocService.getAllBlocs().subscribe(
            (response: any) => {
              this.blocService.data = response.data.blocs;
              console.log("UPDATE BLOC DONE " + response.data.getRawValue())
            },
            (error) => {
              console.error('Error fetching data f lvl:', error);
            }
        );
        this.dialogService.close();
        f.reset()
      });
    }else{
      //adding bloc to the database
      console.log(this.bl.nom)
      this.blocService.addBloc(this.bl).subscribe((data)=>{
        console.log("BLOC DATA TO BE ADDED form comp level " + JSON.stringify(data, null, 2));
        // message to be displayed after adding bloc
        this.messageService.add({
          severity: 'success',
          summary: 'Done',
          detail: 'Successfully Updated ',
          life: 5000,
        });
        // auto updating the bloc list
        this.blocService.getAllBlocs().subscribe(
            (response: any) => {
              this.blocService.data = response.data.blocs;
              console.log("ADD BLOC DONE f lvl:", JSON.stringify(this.blocService.data, null, 2));
            },
            (error) => {
              console.error('Error fetching data f lvl:', error);
            }
        );
      });
      this.dialogService.close();
      f.reset();
    }
  }*/

  add(f: NgForm) {
    const blocData = { ...this.bl, foyerId: this.selectedFoyerId };
    if (this.id !== undefined) {
      this.blocService.addBlocWithFoyer( blocData, this.selectedFoyerId).subscribe((data)=>{
        this.blocService.getAllBlocs().subscribe(
          (response: any) => {
            this.blocService.data = response.data.blocs;
            console.log("UPDATE BLOC DONE " + response.data.getRawValue())
          },
          (error) => {
            console.error('Error fetching data f lvl:', error);
          }
        );
        this.dialogService.close();
        f.reset()
      });

    } else {
      this.blocService.addBlocWithFoyer(blocData, this.selectedFoyerId).subscribe((data) => {
        // Handle the response
        console.log("BLOC DATA ADDED with Foyer", data);

        // Update the bloc list
        this.blocService.getAllBlocs().subscribe(
          (response: any) => {
            this.blocService.data = response.data.blocs;
            console.log("ADD BLOC DONE", this.blocService.data);
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );

        // Display success message
        this.messageService.add({
          severity: 'success',
          summary: 'Done',
          detail: 'Successfully Added Bloc with Foyer',
          life: 5000,
        });

        // Close the dialog and reset the form
        this.dialogService.close();
        f.reset();
      });
    }
  }
}
