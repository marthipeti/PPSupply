import { Injectable } from '@angular/core';
import { User} from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _USERS: Array<User>;

  constructor() {
      this._USERS = new Array<User>();
      this._USERS.push(
        { id: 1,
          name: "Xy Admin",
          userName: 'adminUser',
          role: "ADMIN"
        }
      );
      this._USERS.push(
        { id: 2,
          name: "Példa Péter",
          userName: 'felhasznalo',
          role: "USER"
        }
      );
   }

  public getUsers(): Array<User> {
    return this._USERS;
  }

  public getUser(userID: number): User {
    return this._USERS.find(x => x.id == userID);
  }
}
