import { Injectable } from '@angular/core';
import { Reservation } from '../classes/reservation';
import { CartService } from './cart.service';
import { Cart } from '../classes/cart';
import { ProductService } from './product.service';
import { User } from '../classes/user';
import { UserService } from './user.service';
import { Product } from '../classes/product';
type Dictionary = { product: Product ; pieces: number };


@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private _RESERVATIONS: Array<Reservation>;

  constructor(
    private _ProductService: ProductService,
    private _UserService: UserService
  ) {
    this._RESERVATIONS = new Array<Reservation>();
    let dict = new Array<Dictionary>();
    dict.push({product: this._ProductService.getProduct(2), pieces: 4});
    this._RESERVATIONS.push( {
        id: 1,
        user: this._UserService.getUser(1),
        date: new Date('2017-11-12T14:00'),
        products: dict
      });
      
    dict = new Array<Dictionary>();
    dict.push({product: this._ProductService.getProduct(1), pieces: 6});
    this._RESERVATIONS.push( {
        id: 4,
        user: this._UserService.getUser(1),
        date: new Date('2018-04-11T17:32'),
        products: dict
      });

    dict = new Array<Dictionary>();
    dict.push({product: this._ProductService.getProduct(4), pieces: 1});
    this._RESERVATIONS.push( {
      id: 4,
      user: this._UserService.getUser(1),
      date: new Date('2018-04-11T17:32'),
      products: dict
    });
  }
   

   public getReservations(): Array<Reservation> {
     return this._RESERVATIONS;
   }
   public getReservationsByUser(user: User): Array<Reservation> {
    let reservations = new Array<Reservation>();
    this._RESERVATIONS.forEach(element => {
      element.user == user ? reservations.push(element) : '';
    });
    return reservations;
  }

   public addReservation(reservation: Reservation): void {
     this._RESERVATIONS.push(reservation);
   }
}
