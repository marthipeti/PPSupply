import { Injectable } from '@angular/core';
import { Product } from '../classes/product';
import { Cart } from '../classes/cart';
import { HttpService } from './http.service';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _CART: Cart;

  constructor(
    private httpService : HttpService
    ){ 
    this._CART = new Cart();
    this._CART.products = []
  }

  getCart(): Cart {
    return this._CART;
  }

  public addToCart(product: Product, pieces: number): void {
    this._CART.products.push({product : product, pieces: pieces});
    //this._CART.user = user;
    console.log(this._CART.products);
  }

  public removeFromCart(product: Product): void {
    let index = this._CART.products.findIndex(x => x.product === product );
    if (index !== -1) {
        this._CART.products.splice(index, 1);
    }   
  }

  public getProducts(): {product: Product, pieces: number}[] {
    return this._CART.products;
  }

  public sendReservation() {
    //this._reservationService.addReservation(this._CART);
    console.log(this._CART);
  }
  
}
