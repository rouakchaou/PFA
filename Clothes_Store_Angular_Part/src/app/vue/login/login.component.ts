import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/controller/registration.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  emailId: string;
  password: string;
  msg = '';

  constructor(
    private registrationService: RegistrationService, 
    private _route: Router) {}

  loginUser() {
    this.registrationService.loginUser(this.emailId, this.password)
      .subscribe(
        data => {
          if (data && typeof data === 'object') {
            this._route.navigate(['home']);
          } else {
            console.error("Invalid JSON response"/*, data*/);
          }
        },
        error => {
          console.log("Login failed", error);
          this.msg = "Sign in unsuccessful!\nThe email address and password combination you entered does not match our records. Please try again.";
        }
      );
  }

  loginAdmin() {
    this.registrationService.loginAdmin(this.emailId, this.password)
      .subscribe(
        data => {
          if (data && typeof data === 'object') {
            this._route.navigate(['dashboard']);
          } else {
            console.error("Invalid JSON response"/*, data*/);
          }
        },
        error => {
          console.log("Login failed", error);
          this.msg = "Sign in unsuccessful!\nThe email address and password combination you entered does not match our records. Please try again.";
        }
      );
  }

  loginDeliveryPerson() {
    this.registrationService.loginDeliveryPerson(this.emailId, this.password)
      .subscribe(
        data => {
          if (data && typeof data === 'object') {
            this._route.navigate(['deliveryInterface']);
          } else {
            console.error("Invalid JSON response"/*, data*/);
          }
        },
        error => {
          console.log("Login failed", error);
          this.msg = "Sign in unsuccessful!\nThe email address and password combination you entered does not match our records. Please try again.";
        }
      );
  }
}
