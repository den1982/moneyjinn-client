import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {CheckLoginService} from "./services/check-login.service";
import {UserService} from "./services/user.service";
import {RESTUserService} from "./services/rest/restuser.service";
import {ErrorService} from "./services/error.service";
import {ErrorComponent} from "./components/error/error.component";
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
