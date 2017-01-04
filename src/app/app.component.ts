import {Component} from "@angular/core";
import {RESTUserService} from "./services/restuser.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  username: string;
  password: string;

  constructor(private restUserService: RESTUserService) {

  }

  doLogin() {
    var response = this.restUserService.getUserSettingsForStartup(this.username, this.password);
    console.log("userId: " + response.userId);
  }
}
