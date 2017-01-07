import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import "rxjs/add/operator/toPromise";
import {RESTService} from "./rest.service";
import {UserService} from "../user.service";
import {ErrorService} from "../error.service";
import {GetUserSettingsForStartupResponse} from "../../model/rest/get-user-settings-for-startup-response";

@Injectable()
export class RESTUserService extends RESTService {

  constructor(http: Http,
              userService: UserService,
              errorService: ErrorService) {
    super(http, userService, errorService);
  }

  protected getUsecaseUrl(): string {
    return 'user/';
  }

  public getUserSettingsForStartup(username: string, callback: Function): void {
    super.get<GetUserSettingsForStartupResponse>('getUserSettingsForStartup/' + username, "getUserSettingsForStartupResponse", callback);
  }

}
