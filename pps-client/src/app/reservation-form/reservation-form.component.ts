import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cart } from '../classes/cart';
import { Reservation } from '../classes/reservation';
import { Product } from '../classes/product';
import { ActivatedRoute } from '@angular/router';
import { CartService} from '../services/cart.service';

type Dictionary = { product: Product ; pieces: number };

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  @Input('cart') public order: Cart;
  @Output('save') public save: EventEmitter<Reservation> 
    = new EventEmitter<Reservation>();

  private _reservation: Reservation = {
    id: null,
    user: null,
    products: null,
    date: null
  };
  

  constructor(
    private route: ActivatedRoute,
    private _cartService: CartService,
  ) { }

  ngOnInit() {
  }

  private onSubmit() {
    const date: Date = new Date();
    const year: number = date.getFullYear();
    const month: number = date.getMonth();
    const day: number = date.getDate();
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();

    this._reservation.date = new Date(year, month, day, hours, minutes);
    this._reservation.user = null;
    this._reservation.products = this._cartService.getProducts();

    this.save.emit(this._reservation);

    console.log(this._reservation);
  }

}
