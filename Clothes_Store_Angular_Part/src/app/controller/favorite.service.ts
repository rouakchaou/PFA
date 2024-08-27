import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  favorites: any[] = [];
  constructor() { }



  isFavorite(product: any): boolean {
    console.log(this.favorites.includes(product));
    return this.favorites.includes(product); 
}

addToFavorites(product: any) {
  let favorites: any[] = JSON.parse(sessionStorage.getItem('favorites') || '[]');


  const isAlreadyAdded = favorites.some(favorite => favorite.id === product.id);

  
  if (!isAlreadyAdded) {
    favorites.push(product);
    sessionStorage.setItem('favorites', JSON.stringify(favorites));
    console.log('Product added to favorites:', product);
  } else {
    console.log('Product is already in favorites:', product);
  }
}

  removeFromFavorites(product: any) {
    let favorites: any[] = JSON.parse(sessionStorage.getItem('favorites') || '[]');
    const index = favorites.findIndex((fav: any) => fav.id === product.id); // Suppose que chaque produit a un champ 'id' unique
    if (index !== -1) {
      favorites.splice(index, 1);
      sessionStorage.setItem('favorites', JSON.stringify(favorites));
    }
  }

  getFavorites() {
    let favoritesString = sessionStorage.getItem('favorites');
    if (favoritesString) {
      return JSON.parse(favoritesString);
    } else {
      return [];
    }
  }

  updateFavorites(favorites: any[]) {
    sessionStorage.setItem('favorites', JSON.stringify(favorites));
  }

}
