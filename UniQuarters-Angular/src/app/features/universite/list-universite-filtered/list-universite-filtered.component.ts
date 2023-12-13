import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { Universite } from 'src/app/models/universite';
import { UniversiteService } from 'src/app/services/universite.service';
import { UniversiteLocationComponent } from '../universite-location/universite-location.component';

@Component({
  selector: 'app-list-universite-filtered',
  templateUrl: './list-universite-filtered.component.html',
  styleUrls: ['./list-universite-filtered.component.scss']
})
export class ListUniversiteFilteredComponent implements OnInit {
  address!:String;
  universities:Universite[]=[];
  constructor(private ac:ActivatedRoute,private uniService:UniversiteService,    private readonly dialogService: DialogService,
    ){}
  ngOnInit(): void {
    this.ac.params.subscribe((param) => {
      this.address = param['address']; });
      this.uniService.fetchUnisByAddress(this.address).subscribe((data:any)=>
      this.universities=data.data.universities);

    }

showLocation(uni:Universite){
  console.log(uni)
  this.dialogService.open(UniversiteLocationComponent, {
    data: { uni },
    header: "Localisation Foyer"
  });

}
onSearch(query: string ) {
  if (query === '') {
    this.uniService.fetchUnisByAddress(this.address).subscribe((data:any)=>
    this.universities=data.data.universities);

  } else {
    this.uniService.search(query,this.address).subscribe((data:any)=>
    this.universities=data.data.universities);


  }

}
}
