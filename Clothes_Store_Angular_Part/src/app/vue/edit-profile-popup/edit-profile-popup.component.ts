import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-profile-popup',
  templateUrl: './edit-profile-popup.component.html',
  styleUrls: ['./edit-profile-popup.component.css']
})
export class EditProfilePopupComponent {

  closeEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(public dialogRef: MatDialogRef<EditProfilePopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private dialog: MatDialog) { }

  closePopup(): void {
    this.dialogRef.close();
    this.dialog.closeAll();
  }
}
