import { Injectable } from '@angular/core';
import { Product } from '../classes/product';
import { Cart } from '../classes/cart';
import { HttpService } from './http.service';
import { ReservationService } from './reservation.service';
import { Reservation } from '../classes/reservation';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart;
  private reservation: Reservation = {
    id: null,
    user: null,
    products: null,
    orderedQuantity: null
  };

  constructor(
    private httpService: HttpService,
    private reservationService: ReservationService
  ) {
    this.cart = new Cart();
    this.cart.products = []
  }

  public getCart(): Cart {
    return this.cart;
  }

  public addToCart(product: Product, pieces: number): void {
    this.cart.products.push({ product: product, pieces: pieces });
  }

  public removeFromCart(product: Product): void {
    let index = this.cart.products.findIndex(x => x.product === product);
    if (index !== -1) {
      this.cart.products.splice(index, 1);
    }
  }

  public incrementQuantity(product: Product): void {
    let index = this.cart.products.findIndex(x => x.product === product);
    let product2 = this.getProduct(this.cart.products[index].product.id);
    console.log(product2);
    if (index !== -1) {
      if (this.cart.products[index].pieces >= product2.quantity) {
        this.cart.products[index].pieces = product2.quantity;
      } else {
        this.cart.products[index].pieces++;
      }

    }
  }

  public decrementQuantity(product: Product): void {
    let index = this.cart.products.findIndex(x => x.product === product);
    if (index !== -1) {
      if (this.cart.products[index].pieces < 2) {
        this.removeFromCart(product);
      } else {
        this.cart.products[index].pieces--;
      }

    }
  }

  public getProducts(): { product: Product, pieces: number }[] {
    return this.cart.products;
  }

  public getProduct(id: number): Product {
    for (let product of this.getProducts()) {
      if (product.product.id === id) {
        return product.product;
      }
    }
    return null;
  }
}
