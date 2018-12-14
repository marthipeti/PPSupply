import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../classes/cart';
import { Product } from '../classes/product';
import {MatSnackBar} from '@angular/material';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../classes/reservation';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  private cart: Cart;
  private displayedColumns = ['name','quantity','delete'];
  private reservation: Reservation = {
    id: null,
    user: null,
    products: null
  };

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private reservationService: ReservationService,
    private msg: MatSnackBar,
    private router : Router
  ) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  public removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
    this.cart = this.cartService.getCart();
  }

  public getProducts(): {product: Product, pieces: number}[] {
    return this.cart.products;
  }

  noProductMsg() {
    this.msg.open( "A kosár üres" , null , {
      duration: 2000,
    });
  }

  sendReservation() {
    this.cart.products.length == 0 ? this.noProductMsg() : null;
    this.reservation.user = this.authService.user;
    this.reservation.products = this.cart.products;
    //this.cart.user = this.authService.user;
    console.log(this.reservation.user);
    //console.log(this.cart.cartQuantity);
    console.log(this.reservation.products);
    this.reservationService.addReservation(this.reservation);

    
    //this.cartService.sendReservation();
    //this.cart = this.cartService.getCart();
    this.cartService.getCart();
    //this.router.navigate(['cart']);
  }
}
