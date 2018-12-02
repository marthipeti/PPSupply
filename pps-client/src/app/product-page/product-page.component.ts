import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/product';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  private _products: Product[];
  private _

  constructor(
    private _productService: ProductService,
    private _cartService: CartService,
    private _productMsg: MatSnackBar

  ) { }

  ngOnInit() {
    this._products = this._productService.getProducts();
  }

  range(min, max, step): Array<number> {
    step = step || 1;
    var array = new Array(max);
    return array;
  }

  toCart(productId: number, pieces:number): void {
    pieces != 0 ?
    ( this._cartService.addToCart(this._productService.getProduct(productId),pieces),
      this._productService.getProduct(productId).pieceToCart = 0 ) : null;
  }
  
  productAddedMsg(productName: string, quantity: string) {
    quantity ? this._productMsg.open( quantity + "db " + productName + " hozzáadva a kosárhoz" , null, {
      duration: 2000,
    }) : null;
  }
}
