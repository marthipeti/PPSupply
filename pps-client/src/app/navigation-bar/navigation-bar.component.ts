import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  cartSize(): number{
    if(this.cartService.getCart().products === null || this.cartService.getCart().products === undefined){
      return 0;
    }else{
      return this.cartService.getCart().products.length;
    }
  }

}
