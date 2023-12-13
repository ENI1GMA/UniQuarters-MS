import { Component,ViewChild,OnInit, OnChanges, SimpleChanges  } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { Observable } from 'rxjs';
import { Universite } from 'src/app/models/universite';
import { ChambreService } from 'src/app/services/chambre.service';
import { UniversiteService } from 'src/app/services/universite.service';
import { UniversiteFormComponent } from '../universite-form/universite-form.component';

import { Foyer } from 'src/app/models/foyer';


@Component({
  selector: 'app-list-universite',
  templateUrl: './list-universite.component.html',
  styleUrls: ['./list-universite.component.scss']
})
export class ListUniversiteComponent   implements OnInit {
 
   

  @ViewChild('dt') table!: Table;
  


  constructor(
    public uniService: UniversiteService,
    private readonly dialogService: DialogService,
    public messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { 
}
    univ=new Universite();
   


  
  ngOnInit(): void {
    this.uniService.getAllUniversites().subscribe(
      (response: any) => {
        this.uniService.data = response.data.universities;
        console.log(this.uniService.data)
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

  

  }
  Add(){
    this.dialogService.open(UniversiteFormComponent, {
      header:"Ajouter une nouvelle université",
      width: '70%', 
      height: 'auto'
  })
  }
  Edit(id:number) {
   
    this.dialogService.open(UniversiteFormComponent, {
      data: { id },
      header: "Modifier les informations de la chambre",
      width: '70%', 
      height: 'auto'
    });
  }
  Delete(id:number) {
    this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir effectuer cette action ?',
        acceptLabel: 'Supprimer',
        rejectLabel: 'Annuler',
        accept: () => {
          this.uniService.deleteUniversity(id).subscribe((data)=>{
            this.uniService.getAllUniversites().subscribe(
              (response: any) => {
                this.uniService.data = response.data.universities;
                console.log(this.uniService.data)
              },
              (error) => {
                console.error('Error fetching data:', error);
              }
    
              
            );
          },
            (error) => {
                
                console.error('Error deleting university:', error);
            }
        );
        }
    });


}
  
//  verifId(id:number){
//   console.log(id);
//  }
onSearchByNom(query: string ) {
  if (query === '') {
    this.uniService.getAllUniversites().subscribe(
      (response: any) => {
        this.uniService.data = response.data.universities;
        console.log(this.uniService.data)
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  } else {
    this.uniService.fetchUnisByName(query).subscribe((data:any)=>
    this.uniService.data=data.data.universities);


  }

}
onSearchByAddress(query: string ) {
  if (query === '') {
    this.uniService.getAllUniversites().subscribe(
      (response: any) => {
        this.uniService.data = response.data.universities;
        console.log(this.uniService.data)
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  } else {
    this.uniService.fetchUnisByAddress(query).subscribe((data:any)=>
    this.uniService.data=data.data.universities);


  }

}
onSearchByFoyer(query: string ) {
  if (query === '') {
    this.uniService.getAllUniversites().subscribe(
      (response: any) => {
        this.uniService.data = response.data.universities;
        console.log(this.uniService.data)
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  } else {
    this.uniService.fetchUnisByFoyer(query).subscribe((data:any)=>
    this.uniService.data=data.data.universities);


  }

}

 
}
