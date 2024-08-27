import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddProductModalComponent } from '../vue/add-product-modal/add-product-modal.component';


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }

  openSuccessModal(action: 'add' | 'delete'): void {
    this.dialog.open(AddProductModalComponent, {
      width: '250px',
      data: { success: true, action },
      disableClose: true,
      panelClass: 'custom-modal-container',
      autoFocus: false,
      backdropClass: 'custom-backdrop'
    });
  }

  openFailureModal(action: 'add' | 'delete'): void {
    this.dialog.open(AddProductModalComponent, {
      width: '250px',
      data: { success: false, action }, // Fusionner les données success et action dans un seul objet data
      disableClose: true,
      panelClass: 'custom-modal-container',
      autoFocus: false,
      backdropClass: 'custom-backdrop'
    });
  }
}
