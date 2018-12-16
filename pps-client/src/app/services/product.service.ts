import { Injectable } from '@angular/core';
import { Product } from '../classes/product';
import { HttpService } from './http.service';

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
  
  public async addProduct(product: Product) {
    try {
      await this.httpService.post<Product>(this.route, product);
    } catch (e) {
    }
  }

  public async deleteProduct(id: number){
    try{
      await this.httpService.delete<Product>(this.route + "/" + id);
    } catch(e) {}
  }

}
