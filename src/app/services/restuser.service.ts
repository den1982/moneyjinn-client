import {Injectable} from "@angular/core";
import {GetUserSettingsForStartupResponse} from "../model/rest/get-user-settings-for-startup-response";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {Observable} from "rxjs";
import {RESTService} from "./rest.service";
import {UserService} from "./user.service";

@Injectable()
export class RESTUserService extends RESTService {

  constructor(http: Http, userService: UserService) {
    super(http, userService);
  }

  getUsecaseUrl(): string {
    return 'user/';
  }

  getUserSettingsForStartup(username: string): Observable<GetUserSettingsForStartupResponse> {
    let response = super.get('getUserSettingsForStartup/' + username)
      .map(response => response.json().getUserSettingsForStartupResponse as GetUserSettingsForStartupResponse);

    if (response != null) {
      this.userService.getCurrentUser().setLoggedIn(true);
    }

    return response;
  }

}
