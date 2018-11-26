import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { Reservation } from '../classes/reservation';
import { ReservationService } from '../services/reservation.service';
import { UserService } from '../services/user.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  private loggedIn: User;
  private displayedColumns = ['date','name','quantity'];

  constructor(
    private _UserService: UserService,
    private _ReservationService: ReservationService
  ) { 
    this.loggedIn = _UserService.getUser(1);
  }

  ngOnInit() {
  }

  getReservations(): Array<Reservation> {
    return this._ReservationService.getReservationsByUser(this.loggedIn);
  }
}
