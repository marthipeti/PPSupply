import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/product';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { MatSnackBar } from '@angular/material';
import { User } from '../classes/user';
import { forEach } from '@angular/router/src/utils/collection';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
  private products: Product[];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private productMsg: MatSnackBar,
    private authService: AuthService

  ) { }

  async ngOnInit() {
    this.products = await this.productService.getProducts();
  }

  range(min, max, step): Array<number> {
    step = step || 1;
    var array = new Array(max);
    return array;
  }

  async toCart(id: number, pieces: number) {
    if(this.cartService.getCart().products === null){
      this.cartService.getCart().products = [];
    }
    //let products:  { product: Product, pieces: number }[];
    let product : Product = await this.productService.getProduct(id);
    let bool : boolean = false;
    if(pieces != undefined){
      for(let cartProduct of this.cartService.getProducts()){
        if(product.id === cartProduct.product.id){
          if(Number(cartProduct.pieces) + Number(pieces) > cartProduct.product.quantity){
            cartProduct.pieces = cartProduct.product.quantity;
          }else{
            cartProduct.pieces = Number(cartProduct.pieces) + Number(pieces);
          }
          bool = true;
          break;
        }
      }
      if(!bool){
        this.cartService.addToCart(product, pieces);
      }
    }
  }
  
  productAddedMsg(productName: string, quantity: string) {
    quantity ? this.productMsg.open( quantity + "db " + productName + " hozzáadva a kosárhoz" , null, {
      duration: 2000,
    }) : null;
  }

  async deleteProduct(productId: number) {
    this.productService.deleteProduct(productId);
    this.products = await this.productService.getProducts();
  }
}
