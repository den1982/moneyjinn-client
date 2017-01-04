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
    let observable = this.restUserService.getUserSettingsForStartup(this.username);
    observable.subscribe(data => console.log("userId: " + data.userId));
  }
}
