import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {}


  addProduct(formData: FormData): Observable<any> {
    return this.http.post<any>('http://localhost:8080/product/add', formData);

  }

  public getproducts():Observable<any>{
    return this.http.get<any>('http://localhost:8080/product');
  }

  getRandomProducts(x: number): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8080/product/${x}`);
  }

  getSimilarProducts(x: number,productId: number, fcategoryId: number, scategoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8080/product/similarproducts/${x}`, {
      params: {
        productId: productId.toString(),
        fcategoryId: fcategoryId.toString(),
        scategoryId: scategoryId.toString()
      }
    });
  }

  getProductsByCategoryId(fcategoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8080/product/category/${fcategoryId}`); // Corrected URL
  }

  getProductById(x: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8080/product/Id${x}`);
  }

  getProductsByCategoryIds(fcategoryId: number, scategoryId: number): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8080/product/bycategories?fcategoryId=${fcategoryId}&scategoryId=${scategoryId}`);
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/product/${productId}`);
  }
  updateProduct(productId: number, name: string, price: number, promotion: number): Observable<any> {
    const url = `http://localhost:8080/product/${productId}?name=${name}&price=${price}&promotion=${promotion}`;
    return this.http.put(url, null); 
}
  }