import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationService } from '../reservation/reservation.service';
import { Reservation } from '../models/reservation';
import { Router, ActivatedRoute } from '@angular/router';
//activatedroute is what you see at the browser level

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css',
})
export class ReservationFormComponent implements OnInit {
  reservationForm: FormGroup = new FormGroup({});
  // can also be initialized as reservationForm!: FormGroup
  // to indicate it will be initialized in OnInit;

  //Dependency injection: Form Builder instance is injected into the component
  //private to ensure only accesible within this component.
  constructor(
    private formBuilder: FormBuilder,
    private reservationService: ReservationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    //lifecycle hook used to initialize the reservation form group using the formBuilderservice.
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      guestName: ['', Validators.required],
      roomNumber: ['', Validators.required],
    });

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    //gets id from route similar to getParams on react
    if (id) {
      let reservation = this.reservationService
        .getReservation(id)
        .subscribe((reservation) => {
          if (reservation) this.reservationForm.patchValue(reservation);
          // if this reservation exists (will get error if not in ifclause due to TS constraints)
        });
      //fetch reservation from current data that matches id
    }
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      let reservation: Reservation = this.reservationForm.value; // create a reservation out of the values of the form

      let id = this.activatedRoute.snapshot.paramMap.get('id');
      //gets id from route similar to getParams on react
      if (id) {
        this.reservationService
          .updateReservation(id, reservation)
          .subscribe(() => console.log('update request processed'));
      } else {
        this.reservationService.addReservation(reservation).subscribe(() => {
          console.log('resevertaion added');
        });
      }
    }
    this.router.navigate(['/list']);
  }
}
