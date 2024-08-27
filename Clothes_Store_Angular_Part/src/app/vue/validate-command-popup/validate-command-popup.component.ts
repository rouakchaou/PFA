import {Component, EventEmitter, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-validate-command-popup',
  templateUrl: './validate-command-popup.component.html',
  styleUrls: ['./validate-command-popup.component.css']
})
export class ValidateCommandPopupComponent {

  closeEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(public dialogRef: MatDialogRef<ValidateCommandPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog) { }

  closePopup(): void {
    this.dialogRef.close();
    this.dialog.closeAll();
  }

}
