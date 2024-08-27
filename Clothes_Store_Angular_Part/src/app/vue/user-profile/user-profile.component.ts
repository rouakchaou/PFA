import { Component } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { RegistrationService } from 'src/app/controller/registration.service';
import { User } from 'src/app/model/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AddToCartPopupComponent} from "../add-to-cart-popup/add-to-cart-popup.component";
import {EditProfilePopupComponent} from "../edit-profile-popup/edit-profile-popup.component";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  edit: boolean = false;
  passworIsTrue: boolean = false;
  user: User;
  editUserForm: FormGroup;

  ngOnInit(): void {
    this.getuser();
  }

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: RegistrationService,
    private fb: FormBuilder,
    ){ }

  getuser(): void{
    this.userService.getUserById(this.data.userId)
    .subscribe(
      (user: User) => {
        this.user = user;
        this.initializeForm();
      },
      (error: any) => {
        console.error('Erreur lors de la récupération de l\'utilisateur : ', error);
      }
    );
  }

  showEditProfile(): void{
    this.edit=true;
  }

  initializeForm(): void {
    this.editUserForm = this.fb.group({
      name: [this.user.name, Validators.required],
      surname: [this.user.surname, Validators.required],
      phoneNumber: [this.user.phoneNumber, [Validators.required, Validators.pattern(/^\d{8}$/)]],
      emailId: [this.user.emailId, [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      gender: [this.user.gender, Validators.required]
    });
  }

  showNewPasswordInput(): void{
    if (document.getElementById('currentPasswordInput')!=null){
     const currentPasswordInput = (document.getElementById('currentPasswordInput') as HTMLInputElement).value;
     if (currentPasswordInput === this.user.password) {
         this.passworIsTrue = true;
      }
    }
  }

  editUser(): void{
    if (this.editUserForm.valid) {
      this.user.name = this.editUserForm.value.name;
      this.user.surname = this.editUserForm.value.surname;
      this.user.phoneNumber = this.editUserForm.value.phoneNumber;
      this.user.emailId = this.editUserForm.value.emailId;
      this.user.password = this.editUserForm.value.password;
      this.user.gender = this.editUserForm.value.gender;
      this.userService.updateUser(this.data.userId,this.user).subscribe(
        data => {
          this.toggleEditPopup();
          // console.log("response received");
        },
        error => {
          // console.error("error:", error);
        }
      );
    } else {
      // this.msg.message = "Please fill out all required fields correctly.";
    }
    }

  toggleEditPopup() {
    const dialogRef = this.dialog.open(EditProfilePopupComponent, {
      width:'800px',
    });
  }

}
