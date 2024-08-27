import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { CategoryService } from 'src/app/controller/category.service';
import { souscategory } from 'src/app/model/souscategory';

@Component({
  selector: 'app-list-categ-popup',
  templateUrl: './list-categ-popup.component.html',
  styleUrls: ['./list-categ-popup.component.css']
})
export class ListCategPopupComponent {
  subCategory: souscategory[] = [];
  selectedCategory: string | null = null; // Variable pour stocker la catégorie sélectionnée

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private categoryService: CategoryService) {
    // console.log('ID de la catégorie sélectionnée :', this.data.categoryId);
  }


  ngOnInit(): void {
    this.getSubCategoryIds();
  }

  getSubCategoryIds(): void {
    this.categoryService.getSubCategoryIds(this.data.categoryId)
      .subscribe(data => {
        this.subCategory= data;
        // console.log('Identifiants des sous-catégories :', this.subCategory);
      });
  }

  @Output() subCategorySelection: EventEmitter<{ categoryId: number, subCategoryId: number }> = new EventEmitter();
  selectCategory(subCategoryId: number) {
    this.subCategorySelection.emit({ categoryId: this.data.categoryId, subCategoryId: subCategoryId });
    // console.log(this.data.categoryId,subCategoryId);
  }

  isCategorySelected(category: string): boolean {
    return this.selectedCategory === category;
  }
}
