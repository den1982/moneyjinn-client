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
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {SideNavComponent} from "./components/side-nav/side-nav.component";
import {AddMoneyflowComponent} from "./components/moneyflow/add-moneyflow/add-moneyflow.component";

export const routes: Routes = [
  {
    path: '',
    data: ['Home', false],
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    data: ['Home', false],
    component: HomeComponent,
    canActivate: [CheckLoginService]
  },
  {
    path: 'login',
    data: ['login', false],
    component: LoginComponent
  }
  ,
  {
    path: 'addMoneyflow',
    data: ['Add Moneyflow', true],
    component: AddMoneyflowComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    ErrorComponent,
    SideNavComponent,
    AddMoneyflowComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(routes),
    NgbModule.forRoot(),
  ],
  providers: [RESTUserService, UserService, ErrorService, CheckLoginService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
