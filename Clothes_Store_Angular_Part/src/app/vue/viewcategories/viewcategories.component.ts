import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/controller/category.service';
import { Category } from 'src/app/model/category';
import { MatTableDataSource } from '@angular/material/table';
import { DeletemodalService } from 'src/app/controller/deletemodal.service';
import { ModalService } from 'src/app/controller/modal.service';
@Component({
  selector: 'app-viewcategories',
  templateUrl: './viewcategories.component.html',
  styleUrls: ['./viewcategories.component.css']
})
export class ViewcategoriesComponent  implements OnInit {
  categoryData: Category[] = [];
  displayedColumns: string[] = ['id', 'name','action'];
  dataSource: MatTableDataSource<Category>;

 

  constructor(
  
    private categoryService: CategoryService,
    private deletemodalService : DeletemodalService,
    private modalService : ModalService
  
  ) { }
  ngOnInit(): void {
    this.getcategories();
  }


  getcategories() {
    this.categoryService.getCategories().subscribe(
      (categoryData: Category[]) => {
        this.categoryData = categoryData;
        this.dataSource = new MatTableDataSource(categoryData); 
  
       
     
   
         console.log(categoryData);
        
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des données:', error);
      }
    );
  }

  deletecategory(souscategoryId: number) {
    this.deletemodalService.openDeleteConfirmation().then((confirm: any) => {
      if (confirm) {
    this.categoryService.deletecategory(souscategoryId).subscribe(
      () => {
        console.log('  category supprimé avec succes .');
        this.modalService.openSuccessModal('delete');
        this.getcategories();
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la suppression de la category :', error);
      }
    );
  }
});


}}