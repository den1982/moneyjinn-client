import {Component} from "@angular/core";
import {RESTUserService} from "./services/restuser.service";
import {UserService} from "./services/user.service";
import {User} from "./model/user";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: string;
  password: string;

  constructor(private restUserService: RESTUserService
    , private userService: UserService) {
  }

  doLogin() {
    let user = new User(this.username, this.password);
    this.userService.setCurrentUser(user);

    let observable = this.restUserService.getUserSettingsForStartup(this.username);
    observable.subscribe(data => console.log("userId: " + data.userId));
  }
}
