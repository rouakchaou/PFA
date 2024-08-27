import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public static totalCartQuantity: number =0;
  private readonly CART_KEY = 'cart';
  private cart: Map<Product, Map<string, number>> = this.getCartFromSessionStorage();

  constructor() { }

  private getCartFromSessionStorage(): Map<Product, Map<string, number>> {
    const cartString = sessionStorage.getItem(this.CART_KEY);
    let cart = new Map<Product, Map<string, number>>();
    if (cartString) {
      const cartArray = JSON.parse(cartString);
      cartArray.forEach(([product, sizeQuantityMap]: [any, Map<string, number>]) => {
        cart.set(product, new Map(Object.entries(sizeQuantityMap)));
      });
    }
    return cart;
  }

  private saveCartToSessionStorage(): void {
    const cartArray = Array.from(this.cart.entries()).map(([product, sizeQuantityMap]) => {
      return [product, Object.fromEntries(sizeQuantityMap.entries())];
    });
    sessionStorage.setItem(this.CART_KEY, JSON.stringify(cartArray));
  }

  public addToCart(article: Product, size: string, quantite: number = 1): void {
    CartService.totalCartQuantity+=quantite;
    let articleExiste = false;
  
    // Parcourt chaque entrée dans le panier
    this.cart.forEach((value, key) => {
      // Vérifie si l'article est déjà dans le panier
      if (key.id === article.id) {
        // Si l'article existe dans le panier, vérifie si la taille correspondante est déjà présente
        if (value.has(size)) {
          // Si la taille existe déjà, incrémente simplement la quantité
          value.set(size, value.get(size)! + quantite);
        } else {
          // Sinon, ajoute une nouvelle entrée pour cette taille avec la quantité spécifiée
          value.set(size, quantite);
        }
        articleExiste = true;
      }
    });
  
    // Si l'article n'existe pas déjà dans le panier, ajoute-le avec la taille spécifiée
    if (!articleExiste) {
      const newSizeMap = new Map<string, number>();
      newSizeMap.set(size, quantite);
      this.cart.set(article, newSizeMap);
    }
  
    // Sauvegarde le panier mis à jour dans le stockage de session
    this.saveCartToSessionStorage();
  }

  clearSession(): void {
    sessionStorage.removeItem(this.CART_KEY);
  }

  public setQuantite(article: Product, size: string, quantity: number): void {
    this.cart.forEach((value, key) => {
      if (key.id === article.id) {
        if (value.has(size)) {
          value.set(size, quantity);
        }
      }
    });
    this.saveCartToSessionStorage();
  }

  public removeSizeQuantity(article: Product, size: string): void {
    this.cart.forEach((value, key) => {
        if (key.id === article.id) {
            if (value.has(size)) {
                value.delete(size); // Supprimer la taille spécifique de l'article
                if (value.size === 0) {
                    this.cart.delete(key); // Si l'article n'a plus de tailles, le supprimer du panier
                }
            }
        }
    });
    this.saveCartToSessionStorage(); // Enregistrer le panier dans sessionStorage après les modifications
  }

  public getCartProduits(): Map<Product, Map<string, number>> {
    return this.getCartFromSessionStorage();
  }

  public getTotalCartQuantity(): number{
    // this.cart.forEach((value, key) => {
    //   value.forEach((value,key) =>{
    //     this.totalCartQuantity+=value
    //   })
    // })
    // console.log(CartService.totalCartQuantity);
    return CartService.totalCartQuantity;
  }
  
}
