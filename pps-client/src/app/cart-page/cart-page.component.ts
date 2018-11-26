import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../classes/cart';
import { Product } from '../classes/product';
import { ActivatedRoute } from '@angular/router';
import { Reservation } from '../classes/reservation';
import { ReservationService } from '../services/reservation.service';



@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})

export class CartPageComponent implements OnInit {
  public _CART: Cart;
  private displayedColumns = ['name','quantity','delete'];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private reservationService: ReservationService

  ) { }

  ngOnInit() {
    this._CART = this.cartService.getCart();
    const id: number = parseInt(this.route.snapshot.paramMap.get('id'));
  }

  getProducts(): any {
    return this._CART.getProducts();
  }

  removeFromCart(product: Product): void {
    this._CART.removeFromCart(product);
  }

  private onSave(reservation: Reservation) {
    this.reservationService.addReservation(reservation);
    console.log(this.reservationService.getReservations());
  }


  

}
