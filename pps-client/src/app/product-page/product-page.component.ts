import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/product';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { MatSnackBar } from '@angular/material';
import { User } from '../classes/user';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  private _products: Product[];

  constructor(
    private _productService: ProductService,
    private _cartService: CartService,
    private _productMsg: MatSnackBar

  ) { }

  async ngOnInit() {
    this._products = await this._productService.getProducts();
  }

  range(min, max, step): Array<number> {
    step = step || 1;
    var array = new Array(max);
    return array;
  }

  async toCart(id: number, pieces: number) {
    if(pieces != undefined){
      this._cartService.addToCart(await this._productService.getProduct(id),pieces);
      //this._productService.getProduct(id).pieceToCart = 0;
    }
  }
  
  productAddedMsg(productName: string, quantity: string) {
    quantity ? this._productMsg.open( quantity + "db " + productName + " hozzáadva a kosárhoz" , null, {
      duration: 2000,
    }) : null;
  }
}
