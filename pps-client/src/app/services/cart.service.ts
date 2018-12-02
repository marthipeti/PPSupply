import { Injectable } from '@angular/core';
import { Product } from '../classes/product';
import { Cart } from '../classes/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _CART: Cart;

  constructor() { 
    this._CART = new Cart();
    this._CART.products = []
  }

  getCart(): Cart {
    return this._CART;
  }

  public addToCart(product: Product, pieces: number): void {
    this._CART.products.push({product : product, pieces: pieces});
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
    console.log(this._CART);
  }
  
}
