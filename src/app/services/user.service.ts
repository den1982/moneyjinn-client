import {Injectable} from "@angular/core";
import {User} from "../model/user";
import {CanActivate} from "@angular/router";

@Injectable()
export class UserService implements CanActivate {
  currentUser: User;

  constructor() {
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  canActivate() {
    if (this.currentUser == null) {
      console.log('false1');
      return false;
    } else {
      console.log(this.currentUser.isLoggedIn() + "2");
      return this.currentUser.isLoggedIn();
    }
  }
}
