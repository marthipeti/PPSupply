import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/product';
import { ProductService } from '../services/product.service';
import { Cart } from '../classes/cart';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  private _products: Product[];
  private _cart: Cart; 

  constructor(
    private _productService: ProductService
  ) { 
  }

  ngOnInit() {
    this._products = this._productService.getProducts();
  }

  range = function(min, max, step) {
    step = step || 1;
    var array = new Array(max);
    return array;
};

}
