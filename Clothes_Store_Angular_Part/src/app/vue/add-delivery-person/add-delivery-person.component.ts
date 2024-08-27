import { Component } from '@angular/core';
import { Delivery_person } from 'src/app/model/deliveryPerson';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from 'src/app/controller/registration.service';
import {AddToCartPopupComponent} from "../add-to-cart-popup/add-to-cart-popup.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-add-delivery-person',
  templateUrl: './add-delivery-person.component.html',
  styleUrls: ['./add-delivery-person.component.css']
})
export class AddDeliveryPersonComponent {
  deliveryPersonForm: FormGroup;
  msg: { status: number, message: string } = { status: 0, message: '' };
  deliveryPerson: Delivery_person= new Delivery_person();

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private registrationService: RegistrationService,
  ) {
    this.deliveryPersonForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      emailId: ['', [Validators.required, Validators.pattern(/^\S+@\S+\.\S+$/)]],
      // password: ['', [Validators.required, Validators.minLength(8)]],
      town: ['', Validators.required]
    });
  }

  registerDeliveryPerson() {
    if (this.deliveryPersonForm.valid) {
      this.deliveryPerson.name = this.deliveryPersonForm.value.name;
      this.deliveryPerson.surname = this.deliveryPersonForm.value.surname;
      this.deliveryPerson.phoneNumber = this.deliveryPersonForm.value.phoneNumber;
      this.deliveryPerson.emailId = this.deliveryPersonForm.value.emailId;
      // this.deliveryPerson.password = this.userForm.value.password;
      this.deliveryPerson.town = this.deliveryPersonForm.value.town;

      this.registrationService.registerDeliveryPersonFromRemote(this.deliveryPerson).subscribe(
        data => {
          this.resetForm();
          // console.log("response received");
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

  toggleAddDeliveryPersonPopup() {
    const dialogRef = this.dialog.open(AddToCartPopupComponent, {
      width:'800px',
    });
    dialogRef.afterClosed().subscribe(result => {
      // Reset form after closing the popup
      this.resetForm();
    });
  }

  resetForm() {
    // Reset form and message
    this.deliveryPersonForm.reset();
    this.msg.message = '';
  }
}
