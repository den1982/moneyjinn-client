import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {MaterialModule} from "@angular/material";
import {AppComponent} from "./app.component";
import {RESTUserService} from "./services/restuser.service";
import {UserService} from "./services/user.service";
import {HomeComponent} from "./components/home/home.component";
import {Routes, RouterModule} from "@angular/router";
import {LoginComponent} from "./components/login/login.component";


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [UserService]},
  {path: 'login', component: LoginComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [RESTUserService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
