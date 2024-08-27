import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'; 
import { CategoryService } from 'src/app/controller/category.service';
import { ModalService } from 'src/app/controller/modal.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent {

  Category: any={}; 
  CategoryService: any;
  constructor(private categoryservice : CategoryService,
    private modalService : ModalService

  ) {


   }

   submitForm(categoryForm: NgForm) {
    this.categoryservice.addCategory(this.Category).subscribe(
      response => {
        console.log('Category added');
        this.modalService.openSuccessModal('add');
        categoryForm.reset(); // Réinitialisez le formulaire après un ajout réussi
      },
      error => {
        this.modalService.openFailureModal('add');
        console.error('error', error);
      }
    );
  }
}

    