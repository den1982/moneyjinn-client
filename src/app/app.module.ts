import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {MaterialModule} from "@angular/material";
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

export const routes: Routes = [
  {
    path: '',
    data: ['Sample components', false, 'fa fa-home'],
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    data: ['Sample components', true, 'fa fa-home'],
    component: HomeComponent,
    canActivate: [CheckLoginService]
  },
  {
    path: 'login',
    data: ['login', false, ''],
    component: LoginComponent
  },
  {
    path: 'addMoneyflows',
    data: ['Add Moneyflows', true, 'fa fa-plus'],
    component: AddMoneyflowsComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ErrorComponent,
    NavbarComponent,
    AddMoneyflowsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [RESTUserService, UserService, ErrorService, CheckLoginService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
