import {Component, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {BlocService} from "../../../services/bloc.service";
import {DialogService} from "primeng/dynamicdialog";
import {ConfirmationService, MessageService } from "primeng/api";
import {BlocFormComponent} from "../bloc-form/bloc-form.component";
import {Router} from "@angular/router";
import {RippleModule} from "primeng/ripple";
@Component({
  selector: 'app-list-bloc',
  templateUrl: './list-bloc.component.html',
  styleUrls: ['./list-bloc.component.scss']
})
export class ListBlocComponent {
  @ViewChild('dt') table!: Table;
  nomBloc: string = "";
  constructor(
      private route: Router,
      public blocService: BlocService,
      private readonly dialogService: DialogService,
      public messageService: MessageService,
      private confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
    this.blocService.getAllBlocs().subscribe(
        (response: any) => {
          this.blocService.data = response.data.blocs;

          console.log("BLOCS :::: " + JSON.stringify(this.blocService.data, null, 2))
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
    )
  }

  Add(){
    this.dialogService.open(BlocFormComponent, {
      header:"Ajouter un nouveau bloc"
    })
  }

  Edit(id:number) {
    this.dialogService.open(BlocFormComponent, {
      data: { id },
      header: "Modifier les informations du bloc"
    });
  }

  Delete(id:number) {
    this.confirmationService.confirm({
      message: 'Êtes-vous sûr de vouloir effectuer cette action ?',
      acceptLabel: 'Supprimer',
      rejectLabel: 'Annuler',
      accept: () => {
        this.blocService.deleteBloc(id).subscribe((data)=>{
          this.blocService.getAllBlocs().subscribe(
              (response: any) => {
                this.blocService.data = response.data.blocs;
                console.log("DELETE BLOC DONE " + response.data.getRawValue())
              },
              (error) => {
                console.error('Error fetching data:', error);
              }
          );
          this.messageService.add({
            severity: 'success',
            summary: 'Done',
            detail: 'Bloc Deleted Successfully',
            life: 5000,
          });
        });
      }
    });
  }
  goToScheduler() {
    this.route.navigate(['/gestion/scheduler'])
  }

  exportPDF(){
    this.blocService.pdfExport().subscribe(data=>{
        const blob = new Blob([data], {type: 'application/pdf'});
        if(window.navigator &&   (window.navigator as any).msSaveOrOpenBlob){
          (window.navigator as any).msSaveOrOpenBlob(data);

          return;
        }
        const data1 = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = data1;
        //link.download = "blocs.pdf";
        link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
        setTimeout(function(){
          window.URL.revokeObjectURL(data1);
          link.remove();
        }, 100);
      },
      error => {
        console.error('Error during PDF export:', error);
        // Handle or log the error as needed
      }
    );


  }

  exportExcel(){
    this.blocService.excelExport().subscribe(data=>{
      const blob = new Blob([data], {type: 'application/pdf'});
      if(window.navigator &&   (window.navigator as any).msSaveOrOpenBlob){
        (window.navigator as any).msSaveOrOpenBlob(data);

        return;
      }
      const data1 = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data1;
      link.download = "etudiant.xlsx";
      link.dispatchEvent(new MouseEvent('click', {bubbles: true, cancelable: true, view: window}));
      setTimeout(function(){
        window.URL.revokeObjectURL(data1);
        link.remove();
      }, 100);
    });

  }
}
