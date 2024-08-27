import { Injectable } from '@angular/core';
import { DeletemodalComponent } from '../vue/deletemodal/deletemodal.component';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DeletemodalService {

  constructor(private dialog: MatDialog) { }

  openDeleteConfirmation(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const dialogRef = this.dialog.open(DeletemodalComponent, {
        width: '250px',
        data: {}
      });

      dialogRef.afterClosed().subscribe(result => {
    
        if (result === true) {
          resolve(true); 
        } else {
          resolve(false); 
        }
      });
    });
  }
}
