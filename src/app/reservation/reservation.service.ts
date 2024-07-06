import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';
import { HttpClient } from '@angular/common/http'; //THIS IS WHAT WE USE TO SEND HTTP REQUEST TO MOCKOON/BACKEND
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiURL = 'http://localhost:3001'; //MOCKOON URL

  private reservations: Reservation[] = [];

  constructor(private http: HttpClient) {}

  //crud operations
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiURL + '/reservations');
  }
  getReservation(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(this.apiURL + '/reservation/' + id);
  }

  addReservation(reservation: Reservation): Observable<void> {
    return this.http.post<void>(this.apiURL + '/reservations', reservation); // PASSING A RESERVATION MUST PUT COMMA FOR BODY

    // this.reservations.push(reservation);
  }

  deleteReservation(id: string): Observable<void> {
    return this.http.delete<void>(this.apiURL + '/reservations/' + id);
  }

  updateReservation(
    id: string,
    updatedReservation: Reservation
  ): Observable<void> {
    return this.http.put<void>(
      this.apiURL + '/reservations/' + id,
      updatedReservation
    );
  }
}
