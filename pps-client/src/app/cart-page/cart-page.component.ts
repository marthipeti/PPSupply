import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../classes/cart';
import { Product } from '../classes/product';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  private _CART: Cart;
  private displayedColumns = ['name','quantity','delete'];

  constructor(
    private cartService: CartService,
    private _msg: MatSnackBar
  ) { }

  ngOnInit() {
    this._CART = this.cartService.getCart();
  }

  public removeFromCart(product: Product): void {
    this.cartService.removeFromCart(product);
    this._CART = this.cartService.getCart();
  }

  public getProducts(): {product: Product, pieces: number}[] {
    return this._CART.products;
  }

  noProductMsg() {
    this._msg.open( "A kosár üres" , null , {
      duration: 2000,
    });
  }

  sendReservation() {
    this._CART.products.length == 0 ? this.noProductMsg() : null;
    this.cartService.sendReservation();
    this._CART = this.cartService.getCart();
  }
}
