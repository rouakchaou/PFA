import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-delivery-person-popup',
  templateUrl: './add-delivery-person-popup.component.html',
  styleUrls: ['./add-delivery-person-popup.component.css']
})
export class AddDeliveryPersonPopupComponent {

  constructor(public dialogRef: MatDialogRef<AddDeliveryPersonPopupComponent>) { }

  closePopup(): void {
    this.dialogRef.close();
  }

}
