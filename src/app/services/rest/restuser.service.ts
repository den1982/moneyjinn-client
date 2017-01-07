import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Observable} from "rxjs";
import {RESTService} from "./rest.service";
import {UserService} from "../user.service";

@Injectable()
export class RESTUserService extends RESTService {

  constructor(http: Http,
              userService: UserService) {
    super(http, userService);
  }

  getUsecaseUrl(): string {
    return 'user/';
  }

  getUserSettingsForStartup(username: string): Observable<any> {
    return super.get('getUserSettingsForStartup/' + username)
      .map(response => response.json());
  }

}
