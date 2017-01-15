import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {BrowserModule} from "@angular/platform-browser";
import {Routes, RouterModule} from "@angular/router";
import {AppComponent} from "./app.component";
import {HomeComponent} from "./components/home/home.component";
import {LoginComponent} from "./components/login/login.component";
import {CheckLoginService} from "./services/check-login.service";
import {UserService} from "./services/user.service";
import {RESTUserService} from "./services/rest/restuser.service";
import {ErrorService} from "./services/error.service";
import {ErrorComponent} from "./components/error/error.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {AddMoneyflowsComponent} from "./components/moneyflows/add-moneyflows/add-moneyflows.component";
import {RESTMoneyflowService} from "./services/rest/restmoneyflow.service";
import {MoneyjinnDatePipe} from "./components/pipes/moneyjinn-date-pipe";
import {DateUtil} from "./util/date-util";

export const routes: Routes = [
  {
    path: '',
    data: ['Sample components', false, 'fa fa-home'],
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    data: ['login', false, ''],
    component: LoginComponent
  },
  {
    path: 'home',
    data: ['Sample components', true, 'fa fa-home'],
    component: HomeComponent,
    canActivate: [CheckLoginService]
  },
  {
    path: 'addMoneyflows',
    data: ['Add Moneyflows', true, 'fa fa-plus'],
    component: AddMoneyflowsComponent,
    canActivate: [CheckLoginService]
  }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ErrorComponent,
    NavbarComponent,
    AddMoneyflowsComponent,
    MoneyjinnDatePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [RESTUserService, RESTMoneyflowService, UserService, ErrorService, CheckLoginService, DateUtil],
  bootstrap: [AppComponent]
})
export class AppModule {
}
