import { Injectable } from '@angular/core';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public _PRODUCTS: Product[];

  constructor() {

  }

  public addProduct(product: Product): void {
    console.log("asd");
  }

}
