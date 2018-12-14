import { Component, OnInit } from '@angular/core';
import { Product } from '../classes/product';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { MatSnackBar } from '@angular/material';
import { User } from '../classes/user';
import { forEach } from '@angular/router/src/utils/collection';
import { NavigationBarComponent } from '../navigation-bar/navigation-bar.component';


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
    private productMsg: MatSnackBar

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
    if(pieces != undefined){
      this.cartService.addToCart(await this.productService.getProduct(id),pieces);
    }
  }
  
  productAddedMsg(productName: string, quantity: string) {
    quantity ? this.productMsg.open( quantity + "db " + productName + " hozzáadva a kosárhoz" , null, {
      duration: 2000,
    }) : null;
  }
}
