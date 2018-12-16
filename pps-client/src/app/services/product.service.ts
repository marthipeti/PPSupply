import { Injectable } from '@angular/core';
import { Product } from '../classes/product';
import { HttpService } from './http.service';
import { Tag } from '../classes/tag';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private route: string = 'products';

  constructor(
    private httpService: HttpService
  ) {}

  public getProducts(): Promise<Product[]> {
    return this.httpService.get<Product[]>(this.route);
  }

  public getProduct(id: number): Promise<Product> {
    return this.httpService.get<Product>(this.route + '/' + id);
  }
  
  public async addProduct(name: string, description: string, quantity: number, tags: Tag[]): Promise<User> {
    try {
      /*const token = btoa(username + ':' + password);
      window.localStorage.setItem('token', token);
      const user: User = await this.httpService.post('users/login', username) as User;
      this.isLoggedIn = true;
      this.user = user;
      return Promise.resolve(user);*/
    } catch (e) {
      window.localStorage.setItem('token', '');
      return Promise.reject(e);
    }
  }

}
