import { Injectable } from '@angular/core';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _PRODUCTS: Product[] = [
    { id: 1, name: 'fénymásoló papír', quantity: 100, description: 'A4', tags: null},
    { id: 2, name: 'Bic toll', quantity: 10, description: 'piros', tags: null},
    { id: 3, name: 'Bic toll', quantity: 64, description: 'kék', tags: null},
    { id: 4, name: 'Stabilo ceruza', quantity: 1230, description: 'HB', tags: null},
    { id: 5, name: 'fénymásoló papír', quantity: 54, description: 'A3', tags: null},
    { id: 6, name: 'félfamentes rajzlap', quantity: 10, description: 'A4', tags: null},
    { id: 6, name: 'post-it', quantity: 64, description: 'többszínű', tags: null},
    { id: 7, name: 'post-it', quantity: 1230, description: 'fehér', tags: null},
    { id: 8, name: 'félfamentes rajzlap', quantity: 100, description: 'A2', tags: null},
    { id: 9, name: 'Stabilo ceruza', quantity: 10, description: 'rózsaszín', tags: null},
  ];

  constructor() { }

  public getProducts(): Product[] {
    return this._PRODUCTS;
  }
}
