import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  isOpen: boolean = false;

  constructor() { }

  openDetailsPopup(product: any): void {

    this.isOpen = true;
    console.log('Opening details popup for:', product);
  }

  closeDetailsPopup(): void {

    this.isOpen = false;
    console.log('Closing details popup');
  }
}
