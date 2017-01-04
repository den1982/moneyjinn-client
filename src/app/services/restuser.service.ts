import {Injectable} from "@angular/core";
import {GetUserSettingsForStartupResponse} from "../model/rest/get-user-settings-for-startup-response";

@Injectable()
export class RESTUserService {

  constructor() {
  }

  getUserSettingsForStartup(username: string, password: string): GetUserSettingsForStartupResponse {
    let response: GetUserSettingsForStartupResponse;
    response = new GetUserSettingsForStartupResponse();
    response.userId = 1;

    console.log("username: " + username);

    return response;
  }
}
