import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";
import {RESTUserService} from "../../services/rest/restuser.service";
import {GetUserSettingsForStartupResponse} from "../../model/rest/get-user-settings-for-startup-response";

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
      this.userService.getCurrentUser().setLoggedIn(true);
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }

}
