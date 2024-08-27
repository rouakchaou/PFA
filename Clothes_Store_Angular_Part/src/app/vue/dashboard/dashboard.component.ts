import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/controller/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  sideBarOpen = true;
  afficherFormulaireProduit: boolean = false;
  afficherFormulaireCategorie: boolean = false;
  afficherFormulaireSousCategorie: boolean = false;
  afficherFormulaireLivreur: boolean=false;
  afficherFormulaireproducts : boolean = false;
  afficherFormulaireEdit : boolean = false;
  afficherFormulaireCategories: boolean = false;
  afficherFormulairesubcategories: boolean = false;
  affichercommandes: boolean = false;
  afficherdash: boolean = false;
  constructor(private sharedService: SharedService) {}

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  ngOnInit() {
    this.sharedService.afficherFormulaireLivreur$.subscribe((afficher) => {
      this.afficherFormulaireLivreur = afficher;
    });

    this.sharedService.afficherFormulaireProduit$.subscribe((afficher) => {
      this.afficherFormulaireProduit = afficher;
    });

    this.sharedService.afficherFormulaireCategorie$.subscribe((afficher) => {
      this.afficherFormulaireCategorie = afficher;
    });

    this.sharedService.afficherFormulaireSousCategorie$.subscribe((afficher) => {
      this.afficherFormulaireSousCategorie = afficher;
    });

    this.sharedService.afficherFormulaireproducts$.subscribe((afficher) => {
      this.afficherFormulaireproducts= afficher;
    });

   this.sharedService.afficherFormulaireEdit$.subscribe((afficher) => {
      this.afficherFormulaireEdit= afficher;
    });
 
   this.sharedService.afficherFormulairecategories$.subscribe((afficher) => {
    this.afficherFormulaireCategories= afficher;
    });

  this.sharedService.afficherFormulairesubcategories$.subscribe((afficher) => {
    this.afficherFormulairesubcategories= afficher;
  });
    
  this.sharedService.affichercommandes$.subscribe((afficher) => {
    this.affichercommandes= afficher;
  });

  this.sharedService.afficherdash$.subscribe((afficher) => {
    this.afficherdash= afficher;
  });

}}
