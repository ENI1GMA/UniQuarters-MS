import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-details',
  templateUrl: './reservation-details.component.html',
  styleUrls: ['./reservation-details.component.scss'],
})
export class ReservationDetailsComponent implements OnInit {
  @Input() reservation: any | undefined;

  ngOnInit() {
    console.log('Reservation Data:', this.reservation);
  }
}
