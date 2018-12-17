import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../classes/cart';
import { Product } from '../classes/product';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../classes/reservation';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  private cart: Cart;
  private displayedColumns = ['name', 'quantity', 'delete'];
  private reservation = new Reservation();

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private productService: ProductService,
    private reservationService: ReservationService,
    private msg: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.cart = this.cartService.getCart();
  }

  public removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
    this.cart = this.cartService.getCart();
  }

  public incrementQuantity(product: Product): void {
    this.cartService.incrementQuantity(product);
    this.cart = this.cartService.getCart();
  }

  public decrementQuantity(product: Product): void {
    this.cartService.decrementQuantity(product);
    this.cart = this.cartService.getCart();
  }

  public getProducts(): { product: Product, pieces: number }[] {
    return this.cart.products;
  }

  noProductMsg() {
    this.msg.open("A kosár üres", null, {
      duration: 2000,
    });
  }

  sendReservation() {
    if(this.cart.products.length == 0){
      this.noProductMsg();
      return;
    }
    this.reservation.user = this.authService.user;
    this.reservation.products = [];
    for (let i in this.cart.products) {
      this.reservation.products.push(this.cartService.getCart().products[i].product);
      let productId: number = this.cart.products[i].product.id;
      let quantity: number = this.cart.products[i].pieces;
      this.reservation.orderedQuantity[productId] = quantity;
    }
    this.reservationService.addReservation(this.reservation);
    this.cartService.getCart().products = [];
    this.cartService.getCart();
  }
}
