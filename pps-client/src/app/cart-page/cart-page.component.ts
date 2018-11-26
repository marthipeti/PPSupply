import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { Cart } from '../classes/cart';
import { Product } from '../classes/product';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})

export class CartPageComponent implements OnInit {
  public _CART: Cart;
  private displayedColumns = ['name','quantity','delete'];

  constructor(
    private _cartService: CartService
  ) { }

  ngOnInit() {
    this._CART = this._cartService.getCart();
    console.log(this._CART);
  }

  getProducts(): any {
    return this._CART.getProducts();
  }

  removeFromCart(product: Product): void {
    this._CART.removeFromCart(product);
  }


  

}
