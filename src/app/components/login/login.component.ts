import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";
import {RESTUserService} from "../../services/rest/restuser.service";
import {ErrorService} from "../../services/error.service";
import {Error} from "../../model/error";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  errors: Error[];

  constructor(private restUserService: RESTUserService,
              private userService: UserService,
              private errorService: ErrorService,
              private router: Router) {
  }

  public doLogin() {
    let user = new User(this.username, this.password);
    this.userService.setCurrentUser(user);
    this.restUserService.getUserSettingsForStartup(this.username, response => this.processResponseCallback(response));
  }

  private processResponseCallback(response: any) {
    if (response != null && response.getUserSettingsForStartupResponse != null) {
      this.userService.getCurrentUser().setLoggedIn(true);
      this.router.navigate(['/home']);
    }
  }

  ngOnInit() {
  }

}
