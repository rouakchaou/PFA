import { Component, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { ProductService } from 'src/app/controller/product.service';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/controller/cart.service';
import { FavoriteService } from 'src/app/controller/favorite.service';
import { RegistrationService } from 'src/app/controller/registration.service';
import {AddToCartPopupComponent} from "../add-to-cart-popup/add-to-cart-popup.component";

@Component({
  selector: 'app-details-prod-popup',
  templateUrl: './details-prod-popup.component.html',
  styleUrls: ['./details-prod-popup.component.css']
})
export class DetailsProdPopupComponent implements OnInit {
  similarProducts: Product[];
  product: Product;
  bigImageSrc: string;
  selectedOption: string;
  sizes: string[];
  quantities: number[];
  maxQuantity: number = 1;
  quantity: number = 1;
  isFavorite: boolean = false;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productService: ProductService,
    private cartService: CartService,
    private favoritesService: FavoriteService,
    private registrationService: RegistrationService
  ) { }

  ngOnInit(): void {
    this.getProduct(this.data.productId),this.isFavorite;
    console.log(this.isFavorite)
  }

  isLoggedIn():Boolean{
    return this.registrationService.isLoggedIn()
  }

  getProduct(id: number): void {
    this.productService.getProductById(id)
      .subscribe(
        (product) => {
          this.product = product;
          if (this.product) {
            this.initializeSizesAndQuantities();
            if (this.product.image_name && this.product.image_name.length > 0) {
              this.bigImageSrc = 'assets/img/product/' + this.product.id + this.product.name + '/' + this.product.image_name[0];
            }
            this.loadSimilarProducts(this.product.id, this.product.fcategory_id, this.product.scategory_id);
            this.isFavorite = this.favoritesService.isFavorite(this.product); // Mettre à jour isFavorite
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }

  addToFavorites(product: Product) {
    if (!this.isFavorite) {
      this.favoritesService.addToFavorites(product);
      this.isFavorite = true;
      console.log('Product added to favorites:', product);
    } else {
      this.favoritesService.removeFromFavorites(product);
      this.isFavorite = false; // Définir la variable sur false lorsque le produit est supprimé des favoris
      console.log('Product removed from favorites:', product);
    }
  }
  loadSimilarProducts(pId: number, fId: number, sId: number): void {
    this.productService.getSimilarProducts(2, pId, fId, sId)
      .subscribe(products => {
          this.similarProducts = products;
      });
  }

  initializeSizesAndQuantities(): void {
    if (this.product && this.product.sizeQuantityMap) {
      this.sizes = Object.keys(this.product.sizeQuantityMap);
      this.quantities = Object.values(this.product.sizeQuantityMap);
    }
  }

  changeBigImage(imageSrc: string) {
    this.bigImageSrc = imageSrc;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.maxQuantity = this.quantities[this.sizes.indexOf(option)];
  }

  decreaseQuantity() {
    if (this.selectedOption && this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    if (this.selectedOption && this.quantity < this.maxQuantity) {
      this.quantity++;
    }
  }

  quickView(productId: number): void{
    this.data.productId=productId;
    this.selectedOption = 'Choose a size';
    this.quantity = 1;
    this.getProduct(productId);
  }

  ajouterAuPanier(): void {
      if (this.product && this.selectedOption && this.quantity > 0) {
        this.cartService.addToCart(this.product, this.selectedOption, this.quantity);
      }
  }

  toggleAddToCartPopup() {
    const dialogRef = this.dialog.open(AddToCartPopupComponent, {
      width:'800px',
    });
  }
}
