import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-to-cart-popup',
  templateUrl: './add-to-cart-popup.component.html',
  styleUrls: ['./add-to-cart-popup.component.css']
})
export class AddToCartPopupComponent {

  constructor(public dialogRef: MatDialogRef<AddToCartPopupComponent>) { }

  closePopup(): void {
    this.dialogRef.close();
  }
}

