import {Injectable} from "@angular/core";
import {User} from "../model/user";

@Injectable()
export class UserService {
  currentUser: User;

  constructor() {
  }

  public setCurrentUser(user: User) {
    this.currentUser = user;
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public isLoggedIn(): boolean {
    return (this.currentUser != null && this.currentUser.isLoggedIn());
  }
}
