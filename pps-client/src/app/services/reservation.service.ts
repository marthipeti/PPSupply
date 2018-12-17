import { Injectable } from '@angular/core';
import { Reservation } from '../classes/reservation';
import { ProductService } from './product.service';
import { User } from '../classes/user';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private routeUser: string = 'users';
  private routeReservation: string = 'reservations';

  constructor(
    private httpService: HttpService,
    private productService: ProductService,
    private authService: AuthService,
    private router: Router

  ){}

  public getReservations(): Promise<Reservation[]> {
    return this.httpService.get<Reservation[]>(this.routeReservation);
  }

  public getReservationsByUser(user: User): Promise<Reservation[]> {
    return this.httpService.get<Reservation[]>(this.routeUser + "/" + user.id + '/reservations')
  }

  public async addReservation(reservation: Reservation) {
    try {
      await this.httpService.post<Reservation>(this.routeReservation, reservation);
      //this.router.navigate(['my-reservations']);
    } catch (e) {}
  }

  public async deleteReservation(id: number){
    try{
      await this.httpService.delete<Reservation>(this.routeReservation + "/" + id);
    }catch(e){}
  }
}
