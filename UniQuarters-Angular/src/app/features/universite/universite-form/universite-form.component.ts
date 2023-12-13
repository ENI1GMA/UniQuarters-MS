
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Universite } from 'src/app/models/universite';
import { UniversiteService } from 'src/app/services/universite.service';
import * as Leaflet from 'leaflet';

Leaflet.Icon.Default.imagePath = 'assets/';

@Component({
  selector: 'app-universite-form',
  templateUrl: './universite-form.component.html',
  styleUrls: ['./universite-form.component.scss']
})
export class UniversiteFormComponent implements OnInit {

  id: number = 0;
  fbUni: FormGroup = new FormGroup({});
  fbLogo: FormControl = new FormControl();
  logoUni!:File;
  university!: Universite;
  uni: Universite = new Universite();

  gouvernorats: string[] = this.uniService.getGouvernorats();
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
  constructor(private uniService: UniversiteService,
    private fb: FormBuilder,
    private readonly dialogService: DynamicDialogRef,
    private config: DynamicDialogConfig,
    public messageService: MessageService,) { }

  

  ngOnInit(): void {
    this.id = this.config.data?.id;
    console.log(this.id);

    this.fbUni = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      adresse: ['', [Validators.required]],

      foyer: this.fb.group({
        nom: ['', [Validators.required, Validators.minLength(3)]],
        capacite: ['', [Validators.required]],
        lat: ['', Validators.required],
        lng: ['', Validators.required],
      }),

    })

    this.fbLogo= this.fb.control('');

    if (this.id != undefined) {
      this.uniService.fetchUniById(this.id).subscribe({

        next: (data: any) => {
          this.university = data.data.university;

          this.onUniExist(this.university);

          this.initMarkers(this.university.foyer.lat,this.university.foyer.lng);

        }

      });

    }
    else{
      this.fbLogo.setValidators([Validators.required]);
    }
   
  
  }



  add() {
    const formData=new FormData();
    formData.append('universite', JSON.stringify(this.fbUni.getRawValue()));
    formData.append('logo',this.logoUni);
    if (this.id !== undefined) {
      console.log( this.fbUni.getRawValue())
      this.uniService.updateUniversity(this.id,formData).subscribe((data) => {
        this.uniService.getAllUniversites().subscribe(
          (response: any) => {
            this.uniService.data = response.data.universities;

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
    
     console.log(formData.get('logo'))
      this.uniService.addUniversity(formData).subscribe((data) => {
        console.log(this.fbUni.getRawValue())
        this.messageService.add({
          severity: 'success',
          summary: 'Yessss',
          detail: 'Successfully Added ',
          life: 5000,
        });


        this.uniService.getAllUniversites().subscribe(
          (response: any) => {
            this.uniService.data = response.data.universities;
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
  onUniExist(uni: Universite) {
    this.fbUni.patchValue({
      nom: uni.nom,
      adresse: uni.adresse,


    });
    this.fbUni.get('foyer')?.patchValue({
      nom: uni.foyer.nom,
      capacite: uni.foyer.capacite,
      lat: uni.foyer.lat,
      lng: uni.foyer.lng
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

    this.fbUni.get('foyer')!.patchValue({
      lat: lat,
      lng: lng
    });
  });
    

  }

 onUpload(event:any){
  const file= event.target.files[0];
  this.logoUni=file;
 }




  get foyerNom() {
    return this.fbUni.get('foyer.nom');
  }
  get foyerLat() {
    return this.fbUni.get('foyer.lat');
  }
  get foyerLng() {
    return this.fbUni.get('foyer.lng');
  }
  get capacite() {
    return this.fbUni.get('foyer.capacite');
  }
  
  get foyerCapacite() {
    return this.fbUni.get('foyer.capacite');
  }
  get nom() {
    return this.fbUni.get('nom');
  }
  get logo() {
    return this.fbUni.get('logo');
  }
  get adresse() {
    return this.fbUni.get('adresse');
  }




}
