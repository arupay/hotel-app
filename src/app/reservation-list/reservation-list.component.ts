import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css',
})
export class ReservationListComponent implements OnInit {
  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {}
  //INJECTING an instance of reservationservice into this component!

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe((reservations) => {
      this.reservations = reservations;
    });
    //ngoninit is a lifecycle hook called after the data bound properties are initialized
    //but BEFORE rendering the view.
  }
  deleteReservation(id: string) {
    this.reservationService
      .deleteReservation(id)
      .subscribe(() => console.log('successful delete'));
  }
}
