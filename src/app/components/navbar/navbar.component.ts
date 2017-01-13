import {Component, OnInit, Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {routes} from "../../app.module";
import {UserService} from "../../services/user.service";

@Injectable()
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private routes: any = routes;
  private userName: string;

  private router: Router;

  public constructor(router: Router, private userService: UserService) {
    this.router = router;
    this.routes = this.routes.filter((v: any) => v.data[1]);
    this.userName = this.userService.getCurrentUser().getUsername();
  }

  ngOnInit() {
  }

}
