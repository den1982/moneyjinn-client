export class User {
  private username: string;
  private password: string;
  private loggedIn: boolean;
  private _isAdmin: boolean;
  private _isNew: boolean;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  getPassword(): string {
    return this.password;
  }

  getUsername(): string {
    return this.username;
  }

  setLoggedIn(loggedIn: boolean) {
    this.loggedIn = loggedIn
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  isAdmin(): boolean {
    return this._isAdmin;
  }

  setIsAdmin(isAdmin: boolean) {
    this._isAdmin = isAdmin;
  }

  isNew(): boolean {
    return this._isNew;
  }

  setIsNew(isNew: boolean) {
    this._isNew = isNew;
  }
}
