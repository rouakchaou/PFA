import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/controller/registration.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  userForm: FormGroup;
  msg: { status: number, message: string } = { status: 0, message: '' };
  user: User = new User();

  constructor(
    private fb: FormBuilder,
    private registrationService: RegistrationService,
    private _route: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      emailId: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      gender: ['', Validators.required]
    });
  }

  registerUser() {
    if (this.userForm.valid) {
      this.user.name = this.userForm.value.name;
      this.user.surname = this.userForm.value.surname;
      this.user.phoneNumber = this.userForm.value.phoneNumber;
      this.user.emailId = this.userForm.value.emailId;
      this.user.password = this.userForm.value.password;
      this.user.gender = this.userForm.value.gender;

      this.registrationService.registerUserFromRemote(this.user).subscribe(
        data => {
          // console.log("response received");
          this._route.navigate(['login']);
        },
        error => {
          // console.error("error:", error);
          if (error.status === 400) {
            this.msg.message = "Bad request. Please check your input.";
          } else if (error.status === 401) {
            this.msg.message = "Unauthorized. Please check your credentials.";
          } else if (error.status === 409){
            this.msg.message = error.error.message;
          } else{
            this.msg.message = "An error occurred. Please try again later.";
          }
        }
      );
    } else {
      this.msg.message = "Please fill out all required fields correctly.";
    }
  }
}