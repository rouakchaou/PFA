import { Component } from '@angular/core';
import { CartService } from 'src/app/controller/cart.service';
import { Product } from 'src/app/model/product';
import {MatDialog} from "@angular/material/dialog";
import {FormulaireCommandePopupComponent} from "../formulaire-commande-popup/formulaire-commande-popup.component";
import {RegistrationService} from "../../controller/registration.service";
import {CheckoutButtonCartPopupComponent} from "../checkout-button-cart-popup/checkout-button-cart-popup.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cart: Map<Product, Map<string, number>>;
  cartProducts: Product[]=[];
  promotion: number=0;
  isLoggedIn: boolean = false;

  constructor(private cartService: CartService,
    public dialog: MatDialog,
              private registrationService: RegistrationService,

  ) {}

  ngOnInit() {
    this.getCartProduits();
    this.isLoggedIn = this.registrationService.isLoggedIn();
  }

  getCartProduits() {
    this.cart = this.cartService.getCartProduits();
    this.cartProducts = Array.from(this.cart.keys());
  }

  getMaxQuantity(product: Product, size: string): number{
    let sizes = Object.keys(product.sizeQuantityMap);
    let quantities = Object.values(product.sizeQuantityMap);
    return quantities[sizes.indexOf(size)];
  }

  calculateProductPrice(product: Product): number {
    if (!this.cart.has(product)) {
        return 0;
    }
    const sizeQuantityMap = this.cart.get(product)!;
    let totalPrice = 0;
    sizeQuantityMap.forEach((quantity, size) => {
        const productPrice = product.price - ((product.price*product.promotion)/100 || 0);
        totalPrice += productPrice * quantity;
    });
    return totalPrice;
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    this.cartProducts.forEach((product) => {
        totalPrice += this.calculateProductPrice(product);
    });
    return totalPrice;
  }

  calculateFinalPrice(): number {
    let finalPrice = 0;
        finalPrice = this.calculateTotalPrice()*(1-this.promotion/100);
    return finalPrice;
  }

  setQuantity(article: Product, size: string, quantity: number){
    this.cartService.setQuantite(article,size, quantity);
  }

  handleInput(event: Event, article: Product, size: string) {
    const newValueStr = (event.target as HTMLInputElement).value;
    const newValue = parseInt(newValueStr, 10);
    if (!isNaN(newValue)) {
      if(newValue<=this.getMaxQuantity(article,size)){
        this.setQuantity(article, size, newValue);
        window.location.reload();
      }
    } else {
        console.log('La valeur entrée n\'est pas un nombre valide');
    }
  }

  removeSizeQuantity(article: Product, size: string){
    this.cartService.removeSizeQuantity(article,size);
    window.location.reload();
  }

  toggleCheckoutPopup() {
    const dialogRef = this.dialog.open(CheckoutButtonCartPopupComponent, {
      width: '600px',
    });
  }

  toggleCommandePopup() {
    const dialogRef = this.dialog.open(FormulaireCommandePopupComponent, {
      data: { finalPrice: this.calculateFinalPrice() },
      width:'900px', height:'690px'
    });
  }

  toggleCheckout() {
    if (!this.registrationService.isLoggedIn()) {
      this.toggleCheckoutPopup();
    } else {
      this.toggleCommandePopup();
    }
  }
}
