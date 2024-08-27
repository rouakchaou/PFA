import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.css']
})
export class AddProductModalComponent {

  action: 'add' | 'delete'; 

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddProductModalComponent>
  ) {
    this.action = this.data.action; 
  }

  get modalTitle(): string {
    if (this.action === 'add') {
      return this.data.success ? 'Add succeeded' : 'Problem with the add';
    } else if (this.action === 'delete') {
      return this.data.success ? 'Delete succeeded' : 'Problem with the delete';
    }
  
    return '';
  }

  get modalMessage(): string {
    if (this.action === 'add') {
      return this.data.success ? ' added successfully !' : 'An error occurred while adding ';
    } else if (this.action === 'delete') {
      return this.data.success ? ' deleted successfully !' : 'An error occurred while deleting ';
    }
    return '';
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
