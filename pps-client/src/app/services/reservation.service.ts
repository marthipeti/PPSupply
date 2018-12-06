import { Injectable } from '@angular/core';
import { Reservation } from '../classes/reservation';
import { ProductService } from './product.service';
import { User } from '../classes/user';
import { UserService } from './user.service';
import { Product } from '../classes/product';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private _RESERVATIONS: Reservation[];
  private route: string = 'reservations';

  constructor(
    private httpService: HttpService,
    private _ProductService: ProductService,
    private _UserService: UserService

  ) {/*
    this._RESERVATIONS = [];
    let dict : { product: Product , pieces: number }[];
    dict = []
    dict.push({product: this._ProductService.getProduct(2), pieces: 4});
    this._RESERVATIONS.push( {
        id: 1,
        user: this._UserService.getUser(),
        date: new Date('2017-11-12T14:00'),
        products: dict
      });
      
    dict = [];
    dict.push({product: this._ProductService.getProduct(1), pieces: 6});
    this._RESERVATIONS.push( {
        id: 4,
        user: this._UserService.getUser(),
        date: new Date('2018-04-11T17:32'),
        products: dict
      });

      dict = [];
      dict.push({product: this._ProductService.getProduct(1), pieces: 6});
      this._RESERVATIONS.push( {
          id: 5,
          user: null,
          date: new Date('2018-04-11T17:32'),
          products: dict
        });*/
  }


  /*public getReservations(): Reservation[] {
    return this.httpService.get<Reservation[]>(this.route);
  }


  
  public getReservationsByUser(user: User): Reservation[] {
    
   let reservations : Reservation[];
   reservations = [];
   this._RESERVATIONS.forEach(element => {
     element.user == user ? reservations.push(element) : '';
   });
   return reservations;
   //return this.httpService.get<Reservation[]>('users/' + user.id + this.route);
 }

  public addReservation(reservation: Reservation): void {
   this.httpService.post(this.route, reservation);
  }*/
  public getReservations(): Reservation[] {
    return this._RESERVATIONS;
  }

  public getReservationsByUser(user: User): Reservation[] {
    let reservations: Reservation[];
    reservations = [];
    this._RESERVATIONS.forEach(element => {
      element.user == user ? reservations.push(element) : '';
    });
    return reservations;
  }

  public addReservation(reservation: Reservation): void {
    this._RESERVATIONS.push(reservation);
  }
}
