import { Component,OnInit ,ViewChild} from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { Foyer } from 'src/app/models/foyer';
import { FoyerService } from 'src/app/services/foyer.service';
import { FoyerFormComponent } from '../foyer-form/foyer-form.component';

@Component({
  selector: 'app-list-foyers',
  templateUrl: './list-foyers.component.html',
  styleUrls: ['./list-foyers.component.scss']
})
export class ListFoyersComponent   implements OnInit{
 
   

  @ViewChild('dt') table!: Table;
  


  constructor(
    public uniService: FoyerService,
    private readonly dialogService: DialogService,
    public messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) { 
}
    univ=new Foyer();
   


  
  ngOnInit(): void {
    this.uniService.getAllFoyers().subscribe(
      (response: any) => {
        this.uniService.data = response.data.foyers;
        console.log(this.uniService.data)
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );

  

  }
  Add(){
    this.dialogService.open(FoyerFormComponent, {
      header:"Ajouter un nouveau foyer",
      width: '50%', 
      height: 'auto'
  })
  }
  Edit(id:number) {
   
    this.dialogService.open(FoyerFormComponent, {
      data: { id },
      header: "Modifier les informations du foyer",
      width: '50%', 
      height: 'auto'
    });
  }
  Delete(id:number) {
    this.confirmationService.confirm({
        message: 'Êtes-vous sûr de vouloir effectuer cette action ?',
        acceptLabel: 'Supprimer',
        rejectLabel: 'Annuler',
        accept: () => {
          this.uniService.deleteFoyer(id).subscribe((data)=>{
            this.uniService.getAllFoyers().subscribe(
              (response: any) => {
                this.uniService.data = response.data.foyers;
                console.log(this.uniService.data)
              },
              (error) => {
                console.error('Error fetching data:', error);
              }
    
              
            );
          },
            (error) => {
                
                console.error('Error deleting foyer:', error);
            }
        );
        }
    });


}
onSearchByNom(query: string ) {
  if (query === '') {
    this.uniService.getAllFoyers().subscribe(
      (response: any) => {
        this.uniService.data = response.data.foyers;
        console.log(this.uniService.data)
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  } else {
    this.uniService.fetchFoyersByName(query).subscribe((data:any)=>
    this.uniService.data=data.data.foyers);


  }

}
  
//  verifId(id:number){
//   console.log(id);
//  }
// onSearchByNom(query: string ) {
//   if (query === '') {
//     this.uniService.getAllUniversites().subscribe(
//       (response: any) => {
//         this.uniService.data = response.data.universities;
//         console.log(this.uniService.data)
//       },
//       (error) => {
//         console.error('Error fetching data:', error);
//       }
//     );
//   } else {
//     this.uniService.fetchUnisByName(query).subscribe((data:any)=>
//     this.uniService.data=data.data.universities);


//   }

// }
// onSearchByAddress(query: string ) {
//   if (query === '') {
//     this.uniService.getAllUniversites().subscribe(
//       (response: any) => {
//         this.uniService.data = response.data.universities;
//         console.log(this.uniService.data)
//       },
//       (error) => {
//         console.error('Error fetching data:', error);
//       }
//     );
//   } else {
//     this.uniService.fetchUnisByAddress(query).subscribe((data:any)=>
//     this.uniService.data=data.data.universities);


//   }

// }
// onSearchByFoyer(query: string ) {
//   if (query === '') {
//     this.uniService.getAllUniversites().subscribe(
//       (response: any) => {
//         this.uniService.data = response.data.universities;
//         console.log(this.uniService.data)
//       },
//       (error) => {
//         console.error('Error fetching data:', error);
//       }
//     );
//   } else {
//     this.uniService.fetchUnisByFoyer(query).subscribe((data:any)=>
//     this.uniService.data=data.data.universities);


//   }

// }

 
}
