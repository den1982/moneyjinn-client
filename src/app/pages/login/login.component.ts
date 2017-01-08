import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {User} from "../../model/user";
import {UserService} from "../../services/user.service";
import {RESTUserService} from "../../services/rest/restuser.service";
import {GetUserSettingsForStartupResponse} from "../../model/rest/get-user-settings-for-startup-response";

@Component({
  selector: 'login',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./login.scss')],
  template: require('./login.html'),
})
export class Login {

  public form:FormGroup;
  public username:AbstractControl;
  public password:AbstractControl;
  public submitted:boolean = false;

  constructor(fb:FormBuilder,private restUserService: RESTUserService,
              private userService: UserService,
              private router: Router) {
    this.form = fb.group({
      'username': ['', Validators.compose([Validators.required, Validators.minLength(1)])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(1)])]
    });

    this.username = this.form.controls['username'];
    this.password = this.form.controls['password'];
  }

  public onSubmit(values:Object):void {
    this.submitted = true;
    if (this.form.valid) {
      let user = new User(this.username.value, this.password.value);
      this.userService.setCurrentUser(user);
      this.restUserService.getUserSettingsForStartup(this.username.value, response => this.processResponseCallback(response));
    }
  }

  private processResponseCallback(response: GetUserSettingsForStartupResponse) {
    if (response != null) {
      this.userService.getCurrentUser().setLoggedIn(true);
      this.router.navigate(['/pages/dashboard']);
    }
  }
  
}
