import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { UserService } from '../services/user.service';
import { Reservation } from '../classes/reservation';
import { ReservationService } from '../services/reservation.service';
import { Product } from '../classes/product';
import { MatSnackBar } from '@angular/material';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  private _user: User;
  private displayedColumns = ['date','name','quantity'];


  constructor(
    private _userService: UserService,
    private _reservationService: ReservationService,
    private _productMsg: MatSnackBar,
    private _router: Router
  ) { 
    this._user = this._userService.getUser();
    if (this._user == null) {
      _router.navigate(['login']);
    } else {
      
    }

  }

  /*async*/ ngOnInit() {
    /*this._user = await this._userService.getUser();
    console.log(this._user);*/
  }

  getUserReservations(): Reservation[] {
    return this._reservationService.getReservationsByUser(this._user);
  }

  logOut() {
    this.logOutdMsg();
    this._userService.logOut();
  }

  logOutdMsg() {
    this._productMsg.open(this._userService.getUser().name + " sikeresen kijelentkeztél!" , null, {
      duration: 3000});
  }

}
