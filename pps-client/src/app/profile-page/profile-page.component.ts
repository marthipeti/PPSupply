import { Component, OnInit } from '@angular/core';
import { User } from '../classes/user';
import { AuthService } from '../services/auth.service';
import { Reservation } from '../classes/reservation';
import { ReservationService } from '../services/reservation.service';
import { Product } from '../classes/product';
import { MatSnackBar } from '@angular/material';
import { RouterModule, Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { OrderedQuantity } from '../classes/orderedQuantity';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  private reservations: Reservation[];
  private products: { product: Product, pieces: number }[];
  private orderedArray: number[];
  private displayedColumns = ['id', 'name', 'quantity'];
  public selectedIndex: number = 1;


  constructor(
    private authService: AuthService,
    private reservationService: ReservationService,
    private productMsg: MatSnackBar,
    private router: Router
  ) { }

  async ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.reservations = await this.reservationService.getReservationsByUser(this.authService.user);
      this.orderedArray = this.makeArray(this.reservations);
      //console.log(this.orderedArray);
    } else {
      this.router.navigate(['login'])
    }
  }

  public makeArray(reservations: Reservation[]): number[] {
    let array: number[] = [];
    for (let reservation of reservations) {
      for (let j of reservation.products) {
        array.push(reservation.orderedQuantity[j.id])
      }
    }
    return array;
  }

  deleteReservation(reservation: Reservation) {
    //console.log(product);
    console.log(reservation.id);
    this.reservationService.deleteReservation(reservation.id);
    this.reservations = this.getReservations();
  }

  getReservations(): Reservation[]{
    return this.reservations;
  }

  getReservationProducts(reservationId: number):  OrderedProducts[] {
    let op: OrderedProducts[] = [];
    for (let p of this.reservations.find(x => x.id == reservationId).products) {
      let o: OrderedProducts = new OrderedProducts;
      o.product = p;
      o.quantity = this.reservations.find(x => x.id == reservationId).orderedQuantity[p.id];
      op.push(o);
    }
    return op;
  }

  getReservationAsString(reservationId: number): string {
    let s: string = "";
    for (let p of this.reservations.find(x => x.id == reservationId).products) {
      s = s + p.name + ", ";
    }
    if (s.length > 15) {
      s = s.substring(0, 15) + "..."
    }
    return s;
  }

  async deleteOrder(reservationId: number) {
    this.reservationService.deleteReservation(reservationId);
    this.reservations = await this.reservationService.getReservationsByUser(this.authService.user);
    this.orderedArray = this.makeArray(this.reservations);
  }
}

class OrderedProducts {
  product: Product;
  quantity: number; 
}