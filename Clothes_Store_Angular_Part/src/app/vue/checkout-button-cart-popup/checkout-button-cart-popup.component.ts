import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {RegistrationService} from "../../controller/registration.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout-button-cart-popup',
  templateUrl: './checkout-button-cart-popup.component.html',
  styleUrls: ['./checkout-button-cart-popup.component.css']
})
export class CheckoutButtonCartPopupComponent {

  isLoggedIn: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CheckoutButtonCartPopupComponent>,
    private registrationService: RegistrationService,
    private router: Router
  ) {
    this.isLoggedIn = this.registrationService.isLoggedIn();
  }

  closePopup(): void {
    this.dialogRef.close();
  }

  closeAndRedirectToLogin() {
    this.dialogRef.close();
    this.router.navigate(['/login']);
  }

  protected readonly close = close;
}
