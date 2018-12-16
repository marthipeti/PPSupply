import { Injectable } from '@angular/core';
import { Reservation } from '../classes/reservation';
import { ProductService } from './product.service';
import { User } from '../classes/user';
import { AuthService } from './auth.service';
import { Product } from '../classes/product';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private route: string = 'users';

  constructor(
    private httpService: HttpService,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router

  ){}

  public putUser(id: number, user: User): Promise<User> {
    return this.httpService.put<User>(this.route + "/" + id, user);
  }
}