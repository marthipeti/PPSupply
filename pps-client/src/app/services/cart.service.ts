import { Injectable } from '@angular/core';
import { Product } from '../classes/product';
import { Cart } from '../classes/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _CART: Cart;

  constructor() {
    this._CART = new Cart;
  }

  public addProduct(product: Product, pieces: number): void {
    this._CART.addToCart(product, pieces);
  }

  public getProducts(): any{
    return this._CART.getProducts();
  }

  public getCart(): Cart{
    return this._CART;
  }

}
