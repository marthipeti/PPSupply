import { Injectable } from '@angular/core';
import { Product } from '../classes/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private _PRODUCTS: Product[] = [
    { id: 1, name: 'fénymásoló papír', quantity: 100, description: 'A4', image: null, tags: null, pieceToCart: 0},
    { id: 2, name: 'Bic toll', quantity: 10, description: 'piros', image: 'pen.jpg', tags: null, pieceToCart: 0},
    { id: 3, name: 'Bic toll', quantity: 0, description: 'kék', image: null, tags: null, pieceToCart: 0},
    { id: 4, name: 'Stabilo ceruza', quantity: 1230, description: 'HB', image: null, tags: null, pieceToCart: 0},
    { id: 5, name: 'fénymásoló papír', quantity: 54, description: 'A3', image: null, tags: null, pieceToCart: 0},
    { id: 6, name: 'papír', quantity: 10, description: 'A4', image: null, tags: null, pieceToCart: 0},
    { id: 6, name: 'post-it', quantity: 64, description: 'többszínű', image: null, tags: null, pieceToCart: 0},
    { id: 7, name: 'post-it', quantity: 0, description: 'fehér', image: null, tags: null, pieceToCart: 0},
    { id: 8, name: 'félfamentes rajzlap', quantity: 100, description: 'A2', image: null, tags: null, pieceToCart: 0},
    { id: 9, name: 'Stabilo ceruza', quantity: 10, description: 'rózsaszín', image: null, tags: null, pieceToCart: 0},
  ];



  constructor() { }

  public getProducts(): Product[] {
    return this._PRODUCTS;
  }

  public getProduct(productId: number): Product {
    return this._PRODUCTS.find(x => x.id == productId);
  }

}
