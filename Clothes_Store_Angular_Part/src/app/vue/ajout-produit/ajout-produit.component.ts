import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/controller/category.service';
import { ProductService } from 'src/app/controller/product.service';
import { SouscategoryService } from 'src/app/controller/souscategory.service';
import { ModalService } from 'src/app/controller/modal.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {

  product: any = {};
  images: FileList | File | null = null;
  subcategories: any[] = [];
  categories: any[] = [];

  constructor(
    private souscategoryService: SouscategoryService,
    private productService: ProductService,
    private categoryService: CategoryService,
    private modalService: ModalService 
  ) {}

  ngOnInit() {
  this.getSubCategories();
  }

  getSubCategories(): void{
    this.souscategoryService.getSubcategories().subscribe(
      (data: any) => {
        this.subcategories = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onSubcategorySelected(event: any) {
    const subcategoryId = event.target.value;
    this.categoryService.getCategoriesBySubCategoryId(subcategoryId).subscribe(
      (data: any) => {
        this.categories = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  onCategorySelected(event: any) {
    const categoryId = event.target.value;
    console.log("Catégorie principale sélectionnée :", categoryId);
    this.product.fcategory_id = categoryId;
  }
  
  onSizeChecked(size: string) {
    switch (size) {
      case 'S':
        this.product.quantityS = this.product.sizeS ? null : 0; // Réinitialiser la quantité si la case est décochée
        break;
      case 'M':
        this.product.quantityM = this.product.sizeM ? null : 0;
        break;
      case 'L':
        this.product.quantityL = this.product.sizeL ? null : 0;
        break; 
      case 'XL':
       this.product.quantityL = this.product.sizeL ? null : 0;
        break; 
      case '4a':
        this.product.quantity4a = this.product.size4a ? null : 0;
        break;
      case '6a':
        this.product.quantity6a = this.product.size6a ? null : 0;
        break;
      case '8a':
        this.product.quantity8a = this.product.size8a ? null : 0;
        break;
      case '10a':
        this.product.quantity10a = this.product.size10a ? null : 0;
        break;
      case '12a':
        this.product.quantity12a = this.product.size12a ? null : 0;
        break;
      case '3m':
        this.product.quantity3m = this.product.size3m ? null : 0;
        break;
      case '6m':
        this.product.quantity6m = this.product.size6m ? null : 0;
        break;
      case '9m':
        this.product.quantity9m = this.product.size9m ? null : 0;
        break;
      case '12m':
        this.product.quantity12m = this.product.size12m ? null : 0;
        break;
      case '18m':
        this.product.quantity18m = this.product.size18m ? null : 0;
        break;
      case '24m':
        this.product.quantity24m = this.product.size24m ? null : 0;
        break;
    }
  }
  
  onSubmit(produitform: NgForm) {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('price', this.product.price.toString());
    formData.append('promotion', this.product.promotion.toString());
    formData.append('fcategory_id', this.product.fcategory_id.toString());
    formData.append('scategory_id', this.product.scategory_id.toString());
    if (this.images instanceof FileList) {
      for (let i = 0; i < this.images.length; i++) {
          formData.append('images', this.images[i], this.images[i].name);
      }
    } else if (this.images instanceof File) {
        formData.append('images', this.images, this.images.name);
    }
   
    const sizes: string[] = [];
    const quantities: number[] = [];
    
    if (this.product.sizeS) {
      sizes.push('S');
      quantities.push(this.product.quantityS);
    }
    if (this.product.sizeM) {
      sizes.push('M');
      quantities.push(this.product.quantityM);
    }
    if (this.product.sizeL) {
      sizes.push('L');
      quantities.push(this.product.quantityL);
    }
    if (this.product.sizeXL) {
      sizes.push('XL');
      quantities.push(this.product.quantityXL);
    }
    if (this.product.size4a) {
      sizes.push('4A');
      quantities.push(this.product.quantity4a);
    }
    if (this.product.size6a) {
      sizes.push('6A');
      quantities.push(this.product.quantity6a);
    }
    if (this.product.size8a) {
      sizes.push('8A');
      quantities.push(this.product.quantity8a);
    }
    if (this.product.size10a) {
      sizes.push('10A');
      quantities.push(this.product.quantity10a);
    }
    if (this.product.size12a) {
      sizes.push('12A');
      quantities.push(this.product.quantity12a);
    }
    if (this.product.size3m) {
      sizes.push('3M');
      quantities.push(this.product.quantity3m);
    }
    if (this.product.size6m) {
      sizes.push('6M');
      quantities.push(this.product.quantity6m);
    }
    if (this.product.size9m) {
      sizes.push('9M');
      quantities.push(this.product.quantity9m);
    }
    if (this.product.size12m) {
      sizes.push('12M');
      quantities.push(this.product.quantity12m);
    }
    if (this.product.size18m) {
      sizes.push('18M');
      quantities.push(this.product.quantity18m);
    }
    if (this.product.size24m) {
      sizes.push('24M');
      quantities.push(this.product.quantity24m);
    }
    // Créer des paires taille-quantité et les ajouter à l'objet FormData
    for (let i = 0; i < sizes.length; i++) {
      formData.append('sizes', sizes[i]);
      formData.append('quantities', quantities[i].toString());
    }

    this.productService.addProduct(formData)
    .subscribe(
      response => {
        console.log(response);
   
        this.modalService.openSuccessModal('add');
        produitform.reset();
      },
      error => {
        console.error(error);
       
        this.modalService.openFailureModal('add');
      }
    );
  
  }

  handleFileInput(event: any) {
    const files: FileList | null = event.target.files;
    if (files) {
        this.images = files;
    }
  }
}
