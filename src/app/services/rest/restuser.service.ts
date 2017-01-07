import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {RESTService} from "./rest.service";
import {UserService} from "../user.service";
import {ErrorService} from "../error.service";

@Injectable()
export class RESTUserService extends RESTService {

  constructor(http: Http,
              userService: UserService,
              errorService: ErrorService) {
    super(http, userService, errorService);
  }

  getUsecaseUrl(): string {
    return 'user/';
  }

  getUserSettingsForStartup(username: string, callback: Function): void {
    super.get('getUserSettingsForStartup/' + username, callback);
  }

}
