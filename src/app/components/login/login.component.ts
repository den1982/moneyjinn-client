import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";
import {RESTUserService} from "../../services/rest/restuser.service";
import {GetUserSettingsForStartupResponse} from "../../model/rest/get-user-settings-for-startup-response";
import {UserSettings} from "../../model/user-settings";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private restUserService: RESTUserService,
              private userService: UserService,
              private router: Router) {
  }

  public doLogin() {
    let user = new User(this.username, this.password);
    this.userService.setCurrentUser(user);
    this.restUserService.getUserSettingsForStartup(this.username, response => this.processResponseCallback(response));
  }

  private processResponseCallback(response: GetUserSettingsForStartupResponse) {
    if (response != null) {
      let user: User = this.userService.getCurrentUser();
      user.setLoggedIn(true);
      user.setIsAdmin(response.permissionAdmin);
      user.setIsNew(response.attributeNew);

      let userSettings: UserSettings = new UserSettings();
      userSettings.setSettingDisplayedLanguage(response.settingDisplayedLanguage);

      if (response.settingDateFormat != null) {
        let clientDateFormat: string = response.settingDateFormat.replace('YYYY', 'yyyy');
        clientDateFormat = clientDateFormat.replace('DD', 'dd');
        userSettings.setSettingDateFormat(clientDateFormat);
      }

      this.userService.setCurrentUserSettings(userSettings);

      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }

}
