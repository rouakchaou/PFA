import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/controller/product.service';
import { Product } from 'src/app/model/product';
import { SouscategoryService } from 'src/app/controller/souscategory.service';
import { CategoryService } from 'src/app/controller/category.service';
import { SharedService } from 'src/app/controller/shared.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId: number;
  product: Product;
  productUpdated: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
 

  constructor(private route: ActivatedRoute ,private productService: ProductService , private souscategoryService: SouscategoryService,
   
    private categoryService: CategoryService , private sharedservice : SharedService , private router: Router
    ) { }
  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.productId = params['id'];
      this.productService.getProductById(this.productId).subscribe(
        (product: Product) => {
          this.product = product;
         console.log(product);
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la récupération des données du produit:', error);
        }
      );
    });
  }
   // ngOnInit(): void {
   // this.route.params.subscribe(params => {
     //   this.productId = params['id'];
       // console.log(this.productId);

       // this.sharedservice.toggleafficherEdit(this.productId);
    //});
//}


  updateProduct() {
    this.productService.updateProduct(
        this.product.id, // Envoyez l'ID du produit comme chemin de paramètre
        this.product.name,
        this.product.price,
        this.product.promotion
    ).subscribe(
        (response) => {
            // Gérer la réponse du backend si nécessaire
            console.log('Product updated successfully:', response);
        },
        (error) => {
            // Gérer les erreurs si nécessaire
            console.error('Error updating product:', error);
        }
    );

    const updateSuccess = true;

    if (updateSuccess) {
      this.productUpdated = true;
      this.successMessage = 'Product updated successfully.';
      this.errorMessage = '';
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 2000); // Rediriger vers la page /dashboard après 2 secondes (2000 ms)
    } else {
      this.productUpdated = false;
      this.successMessage = '';
      this.errorMessage = 'Failed to update product.';
    }
  }
}


