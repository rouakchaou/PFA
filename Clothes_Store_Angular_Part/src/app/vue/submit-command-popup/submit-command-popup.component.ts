import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {Router} from "@angular/router";

@Component({
  selector: 'app-submit-command-popup',
  templateUrl: './submit-command-popup.component.html',
  styleUrls: ['./submit-command-popup.component.css']
})
export class SubmitCommandPopupComponent {

  constructor(public dialogRef: MatDialogRef<SubmitCommandPopupComponent>,
              private router: Router) { }

  closeAndRedirectToHome(): void {
    this.dialogRef.close();
    this.dialogRef.afterClosed().subscribe(result => {
      window.location.reload()
    });
    this.router.navigateByUrl('/home');
  }
}
