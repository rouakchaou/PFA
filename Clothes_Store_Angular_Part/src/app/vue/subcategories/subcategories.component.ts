import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { DeletemodalService } from 'src/app/controller/deletemodal.service';
import { ModalService } from 'src/app/controller/modal.service';
import { SouscategoryService } from 'src/app/controller/souscategory.service';
import { souscategory } from 'src/app/model/souscategory';

@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.css']
})
export class SubcategoriesComponent  implements OnInit {
  subcategoryData: souscategory[] = [];
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource: MatTableDataSource<souscategory>;
 
 constructor(
  
    private souscategoryService: SouscategoryService,
    private deletemodalService : DeletemodalService,
    private modalService : ModalService
  ) { }
  ngOnInit(): void {
    this.getSubcategories();
  }

  getSubcategories() {
    this.souscategoryService.getSubcategories().subscribe(
      (subcategoryData: souscategory[]) => {
        this.subcategoryData = subcategoryData;
        this.dataSource = new MatTableDataSource(subcategoryData); 
  
       
     
   
         console.log(subcategoryData);
        
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de la récupération des données:', error);
      }
    );
  }

    deletesouscategory(souscategoryId: number) {
      this.deletemodalService.openDeleteConfirmation().then((confirm: any) => {
        if (confirm) {
      this.souscategoryService.deletesouscategory(souscategoryId).subscribe(
        () => {
          console.log('sous category supprimé avec succès.');
          this.modalService.openSuccessModal('delete');
          this.getSubcategories();
        },
        (error) => {
          console.error('Une erreur s\'est produite lors de la suppression  de sous category :', error);
        }
      );
    }
  });
  
  
  }}