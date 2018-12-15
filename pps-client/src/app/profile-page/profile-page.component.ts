import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { AuthService } from '../services/auth.service';
import { Reservation } from '../classes/reservation';
import { ReservationService } from '../services/reservation.service';
import { Product } from '../classes/product';
import { MatSnackBar } from '@angular/material';
import { RouterModule, Router } from '@angular/router';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  private reservations: Reservation[];
  private products: {product: Product, pieces: number}[];
  //private displayedColumns = ['products', 'orderedQuantity'];
  //private displayedColumns = ['id','name', 'quantity'];


  constructor(
    private authService: AuthService,
    private reservationService: ReservationService,
    private productMsg: MatSnackBar,
    private router: Router
  ) {}

  async ngOnInit() {
    if(this.authService.isLoggedIn){
      this.reservations = await this.reservationService.getReservationsByUser(this.authService.user);
    }else{
      this.router.navigate(['login'])
    }
  }

  /*public makeArray(): void{
    for(let reservation of this.reservations){
      for(let product of reservation.products){
        this.products.push(product);
      }
    }
  }*/





}
