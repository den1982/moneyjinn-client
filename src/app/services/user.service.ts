import {Injectable} from "@angular/core";
import {User} from "../model/user";

@Injectable()
export class UserService {
  currentUser: User;

  constructor() {
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

}
