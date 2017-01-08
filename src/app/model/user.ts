export class User {
  private username: string;
  private password: string;
  private loggedIn: boolean;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

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
}
