import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/product';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  private _products: Product[];

  constructor(
    private _productService: ProductService
  ) { 
  }

  ngOnInit() {
    this._products = this._productService.getProducts();
  }

}
