import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { Observable } from 'rxjs';
import { souscategory } from '../model/souscategory';

@Injectable({
 providedIn: 'root'
})
export class CategoryService {


 constructor(private http: HttpClient) { }

 addCategory(category: Category): Observable<any> {
    return this.http.post<any>('http://localhost:8080/category/first', category);
 }

 getCategories(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/category/first');
 }

 getCategoriesBySubCategoryId(subCategoryId: number): Observable<any[]> {
   return this.http.get<any[]>(`http://localhost:8080/category/subcategory/${subCategoryId}`);
 }


  getSubCategoryIds(categoryId: number): Observable<souscategory[]> {
    return this.http.get<souscategory[]>(`http://localhost:8080/category/${categoryId}/sousByFirst`);
  }

  getCategoryById(categoryId:number): Observable<Category> {
    return this.http.get<Category>(`http://localhost:8080/category/Id/${categoryId}`)
  }
  public deletecategory(souscategoryId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/category/first/${souscategoryId}`);
  }

}
