import {Component, OnInit} from '@angular/core';
import {timer} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ListCategPopupComponent} from "../list-categ-popup/list-categ-popup.component";
import {DetailsProdPopupComponent} from "../details-prod-popup/details-prod-popup.component";
import { ProductService } from 'src/app/controller/product.service';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/controller/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  displayImages: boolean = true;
  images: string[] = ['assets/img/h11.png', 'assets/img/h22.png'];
  currentIndex: number = 0;

  categories: any[] = [];
  selectedCategoryId: number = 0;
  selectedSubCategoryId: number = 0;

  products: Product[] = [];

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts(1);
    this.imageChange();
  }

  onCategorySelected(categoryId: number) {
    this.selectedCategoryId= categoryId;
    this.selectedSubCategoryId= 0;
    this.getProducts();
    // console.log('Category selected:', this.selectedCategoryId);
  }

  imageChange(){
    timer(3000, 3000).subscribe(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    });
  }

  toggleSousCategoriesPopup(categoryId: number) {
    const dialogRef = this.dialog.open(ListCategPopupComponent, {
      data: { categoryId: categoryId },
      disableClose: false,
      autoFocus: false
    });
    const closeDialog = () => dialogRef.close();
    dialogRef.componentInstance.subCategorySelection.subscribe(() => closeDialog());
    dialogRef.componentInstance.subCategorySelection.subscribe((event: { categoryId: number, subCategoryId: number }) => {
      this.selectedCategoryId = event.categoryId;
      this.selectedSubCategoryId = event.subCategoryId;
    });
    dialogRef.afterClosed().subscribe(result => {
        if (this.selectedCategoryId !== 0 && this.selectedSubCategoryId !== 0) {
        this.getProducts();
      }
    });
  }

  toggleProductPopup(productId: number) {
    const dialogRef = this.dialog.open(DetailsProdPopupComponent, {
      data: { productId: productId },
      width:'1120px',
    });
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data: any[]) => {
        this.categories = data.map(category => ({
          id: category.id,
          name: category.name,
          scategories: []
        }));
      },
      (error: any) => {
        console.log('Erreur lors de la récupération des catégories : ', error);
      }
    );
  }

  getProducts(test?: Number): void {
    if (test === 1) {
      this.productService.getRandomProducts(8).subscribe(
        (randomProducts: any[]) => {
          this.products = randomProducts.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            promotion: product.promotion,
            fcategory_id: product.fcategory_id,
            scategory_id: product.scategory_id,
            image_name: product.image_name,
            sizeQuantityMap: {}
          }));
        },
        (error: any) => {
          console.log('Erreur lors de la récupération des produits aléatoires : ', error);
        }
      );
    } else {
      if (test===0){
        this.selectedCategoryId = 0;
        this.selectedSubCategoryId = 0;
        this.displayImages = false;
      }
      if (this.selectedCategoryId!=0 && this.selectedSubCategoryId!=0 ){
        this.displayImages = false;
        this.productService.getProductsByCategoryIds(this.selectedCategoryId, this.selectedSubCategoryId )
        .subscribe(products => {
          this.products = products;
          console.log(this.products);
        });
      }
      else if(this.selectedCategoryId!=0 && this.selectedSubCategoryId===0 ){
        this.displayImages = false;
        this.productService.getProductsByCategoryId(this.selectedCategoryId).subscribe(
          (data: any[]) => {
            this.products = data.map(product => ({
              id: product.id,
              name: product.name,
              price: product.price,
              promotion: product.promotion,
              fcategory_id: product.fcategory_id,
              scategory_id: product.scategory_id,
              image_name: product.image_name,
              sizeQuantityMap: {}
            }));
          },
          (error: any) => {
            console.log('Erreur lors de la récupération des produits : ', error);
          }
        );
      }
      else{
      this.productService.getproducts().subscribe(
        (data: any[]) => {
          this.products = data.map(product => ({
            id: product.id,
            name: product.name,
            price: product.price,
            promotion: product.promotion,
            fcategory_id: product.fcategory_id,
            scategory_id: product.scategory_id,
            image_name: product.image_name,
            sizeQuantityMap: {}
          }));
        },
        (error: any) => {
          console.log('Erreur lors de la récupération des produits : ', error);
        }
      );
      }
    }
  }

}
