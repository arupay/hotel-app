import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    //lifecycle hook used to initialize the reservation form group using the formBuilderservice.
    this.reservationForm = this.formBuilder.group({
      checkInDate: ['', Validators.required],
      checkOutDate: ['', Validators.required],
      guestEmail: ['', [Validators.required, Validators.email]],
      guestName: ['', Validators.required],
      roomNumber: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.reservationForm.valid) {
      console.log('valid');
    }
  }
}
