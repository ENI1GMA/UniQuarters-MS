import { Component,OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Universite } from 'src/app/models/universite';
import * as Leaflet from 'leaflet'; 

Leaflet.Icon.Default.imagePath = 'assets/';
@Component({
  selector: 'app-universite-location',
  templateUrl: './universite-location.component.html',
  styleUrls: ['./universite-location.component.scss']
})
export class UniversiteLocationComponent implements OnInit {
constructor(private config: DynamicDialogConfig,){}
uni!:Universite;
  ngOnInit(): void {
    this.uni = this.config.data?.uni;
  }
  map!: Leaflet.Map;
  marker!: Leaflet.Marker ;
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 16,
    center: { lat: 28.626137, lng: 79.821603 }
  }

  initMarkers() {
    const initialMarker = 
      {
        position: { lat: this.uni.foyer.lat, lng: this.uni.foyer.lng },
        draggable: false
      }
     
    ;
  
      const data = initialMarker;
      const marker = this.generateMarker(data);
      marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
      this.map.panTo(data.position);
      this.marker=marker;
    
  }

  generateMarker(data: any) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event))
      .on('dragend', (event) => this.markerDragEnd(event));
  }

  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
  }

  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any) {
    console.log($event.target.getLatLng());
  } 
}
