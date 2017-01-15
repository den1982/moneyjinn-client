import {Injectable} from "@angular/core";
import {User} from "../model/user";
import {UserSettings} from "../model/user-settings";

@Injectable()
export class UserService {
  currentUser: User;
  currentUserSettings: UserSettings;

  constructor() {
  }

  public setCurrentUser(user: User) {
    this.currentUser = user;
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public setCurrentUserSettings(userSettings: UserSettings) {
    this.currentUserSettings = userSettings;
  }

  public getCurrentUserSettings(): UserSettings {
    return this.currentUserSettings;
  }

  public isLoggedIn(): boolean {
    return (this.currentUser != null && this.currentUser.isLoggedIn());
  }
}
