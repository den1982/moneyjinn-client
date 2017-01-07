import {Location} from "@angular/common";
import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {UserService} from "./user.service";

@Injectable()
export class CheckLoginService implements CanActivate {

  constructor(private router: Router,
              private location: Location,
              private userService: UserService) {
  }

  canActivate(): boolean {
    if (this.userService.isLoggedIn()) {
      return true;
    }

    this.location.replaceState('/');
    this.router.navigate(['/login']);
    return false;
  }
}
