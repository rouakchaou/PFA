import { Component, OnInit } from '@angular/core';
import { FavoriteService } from 'src/app/controller/favorite.service';
import {MatDialog} from "@angular/material/dialog";
import {DetailsProdPopupComponent} from "../details-prod-popup/details-prod-popup.component";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit{
  favorites: any[] = [];

  constructor(private favoritesService: FavoriteService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.favorites = this.favoritesService.getFavorites();
  }
  removeFromFavorites(product: any): void {
    this.favoritesService.removeFromFavorites(product);
    this.favorites = this.favoritesService.getFavorites(); // Mettre à jour la liste des favoris après la suppression
  }

  viewMoreDetails(product: any): void {
    const dialogRef = this.dialog.open(DetailsProdPopupComponent, {
      width: '1100px',
      data: { productId: product.id }
    });
  }

}
