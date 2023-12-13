import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Foyer } from 'src/app/models/foyer';
import * as Leaflet from 'leaflet';
import { FoyerService } from 'src/app/services/foyer.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { Universite } from 'src/app/models/universite';
import { UniversiteService } from 'src/app/services/universite.service';
@Component({
  selector: 'app-foyer-form',
  templateUrl: './foyer-form.component.html',
  styleUrls: ['./foyer-form.component.scss']
})
export class FoyerFormComponent {
  id: number = 0;
  fbUni: FormGroup = new FormGroup({});
 
  foyer!: Foyer;
  unis: Universite[]=[];
  f: Foyer = new Foyer();

  map!: Leaflet.Map;
  marker!: Leaflet.Marker;
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 16,
    center: { lat: 28.626137, lng: 79.821603 }
  }
  constructor(private uniService: FoyerService,private univService:UniversiteService,
    private fb: FormBuilder,
    private readonly dialogService: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public messageService: MessageService,) { }

  

  ngOnInit(): void {
    this.id = this.config.data?.id;
    console.log(this.id);
    this.univService.getAllUniversites().subscribe((response: any) => {
      this.unis = response.data.universities;
      
    },
    (error) => {
      console.error('Error fetching data:', error);
    })
    console.log(this.unis)
    this.fbUni = this.fb.group({
     
        nom: ['', [Validators.required, Validators.minLength(3)]],
        capacite: ['', [Validators.required]],
        lat: ['', Validators.required],
        lng: ['', Validators.required],
        idUniversite:['', Validators.required]
    })

   

 

    if (this.id != undefined) {
      this.uniService.fetchUniById(this.id).subscribe({

        next: (data: any) => {
          this.foyer = data.data.foyer;

          this.onUniExist(this.foyer);

          this.initMarkers(this.foyer.lat,this.foyer.lng);

        }

      });

    }
   
   
  
  }



  add() {
   
    if (this.id !== undefined) {
      console.log( this.fbUni.getRawValue())
      this.uniService.updateFoyer(this.id,this.fbUni.getRawValue()).subscribe((data) => {
        this.uniService.getAllFoyers().subscribe(
          (response: any) => {
            this.uniService.data = response.data.foyers;

          },
          (error) => {
            console.error('Error fetching data:', error);
          }


        );
        this.messageService.add({
          severity: 'success',
          summary: 'Yessss',
          detail: 'Successfully Updated ',
          life: 5000,
        });
        this.dialogService.close();
        this.fbUni.reset();
      });


    }
    else {
    
   
      this.uniService.addFoyer(this.fbUni.getRawValue()).subscribe((data) => {
        console.log(this.fbUni.getRawValue())
        this.messageService.add({
          severity: 'success',
          summary: 'Yessss',
          detail: 'Successfully Added ',
          life: 5000,
        });


        this.uniService.getAllFoyers().subscribe(
          (response: any) => {
            this.uniService.data = response.data.foyers;
            console.log(this.uniService.data)
          },
          (error) => {
            console.error('Error fetching data:', error);
          }
        );


      });
      this.dialogService.close();
      this.fbUni.reset();
    }

  }
  onUniExist(uni: Foyer) {
   
    this.fbUni.patchValue({
      nom: this.foyer.nom,
      capacite: this.foyer.capacite,
      lat: this.foyer.lat,
      lng: this.foyer.lng,
      idUniversite:this.foyer.idUniversite
    })
  }


  initMarkers(lat: number, lng: number) {
    const initialMarker =
    {
      position: { lat: lat, lng: lng },
      draggable: true

    }

      

    const data = initialMarker;
    const marker = this.generateMarker(data);
    marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
    this.map.panTo(data.position);
    this.marker = marker;

  }

  generateMarker(data: any) {
    return Leaflet.marker(data.position, { draggable: data.draggable })

  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    if (this.id == undefined) {
      this.initMarkers(33.892166,9.561555);

    }
   this.map.on('dblclick', (event) => {
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    this.fbUni.patchValue({
      lat: lat,
      lng: lng
    });
  });
    

  }

 




  get foyerNom() {
    return this.fbUni.get('nom');
  }
  get foyerLat() {
    return this.fbUni.get('lat');
  }
  get foyerLng() {
    return this.fbUni.get('lng');
  }
  get capacite() {
    return this.fbUni.get('capacite');
  }
  
  get uni() {
    return this.fbUni.get('idUniversite');
  }
  


}
