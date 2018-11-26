import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/product';
import { ProductService } from '../services/product.service';
import { Cart } from '../classes/cart';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  private _products: Product[];
  private _cart: Cart; 
  selectedValue: string;

  constructor(
    private _productService: ProductService,
    private _cartService: CartService
  ) { 
  }

  ngOnInit() {
    this._products = this._productService.getProducts();
  }

  range(min, max, step): Array<number> {
    step = step || 1;
    var array = new Array(max);
    return array;
  }

  toCart(productId: number, pieces:number): void {
    console.log( pieces);
    this.selectedValue != undefined ? this._cartService.addProduct(this._productService.getProduct(productId),pieces) : null;
    this.selectedValue = undefined;
  }

  quantitySelected(event: any, productID: number):void {
    console.log(event + " " + productID);
  }

}
