import { Component } from '@angular/core';
import { SharedService } from 'src/app/controller/shared.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  constructor(private sharedService: SharedService) {}

  onClick(type: string) {
    if (type === 'product') {
      this.sharedService.toggleFormulaireProduit();
    } else if (type === 'category') {
      this.sharedService.toggleFormulaireCategorie();
    }
    else if (type === 'souscategory') {
      this.sharedService.toggleFormulaireSousCategorie();
    }
    else if (type === 'deliveryperson') {
      this.sharedService.toggleFormulaireLivreur();
    }
    else if (type === 'viewproducts') {
      this.sharedService.toggleafficherproducts();
    }
    else if (type === 'viewcategories') {
      this.sharedService.toggleaffichercategories();
    }
    else if (type === 'viewsubcategories') {
      this.sharedService.toggleaffichersubcategories();
    }
    else if (type === 'viewcommandes') {
      this.sharedService.toggleaffichercommandes();
    }
    else if (type === 'dash') {
      this.sharedService.toggleafficherdash();
    }  
  }
}
