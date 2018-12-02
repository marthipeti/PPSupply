import { Injectable } from '@angular/core';
import { User} from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _loggedInUser : User
  ;
  constructor() {
    this._loggedInUser = null;
    this._loggedInUser = 
      { id: 1,
        name: "Admin Aladár",
        userName: 'adminA',
        role: "ADMIN"
      };
 }

  public logIn(username: string, password: string): boolean {
    return true;
  }

  public logOut(): void {
    this._loggedInUser = null;
  }

  public getUser(): User {
    return this._loggedInUser;
  }

}
