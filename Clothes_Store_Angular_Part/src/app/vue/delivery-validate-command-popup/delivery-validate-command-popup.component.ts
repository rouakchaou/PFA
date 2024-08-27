import {Component, EventEmitter, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delivery-validate-command-popup',
  templateUrl: './delivery-validate-command-popup.component.html',
  styleUrls: ['./delivery-validate-command-popup.component.css']
})
export class DeliveryValidateCommandPopupComponent {

  closeEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(public dialogRef: MatDialogRef<DeliveryValidateCommandPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog) { }

  closePopup(): void {
    this.dialogRef.close();
    this.dialog.closeAll();
  }

}
