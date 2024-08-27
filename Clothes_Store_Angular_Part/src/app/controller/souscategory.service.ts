import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { souscategory } from '../model/souscategory';



@Injectable({
  providedIn: 'root'
})
export class SouscategoryService {

  constructor(private http: HttpClient) { }

  public addsouscategory(souscategory: souscategory):Observable<void>{
    return this.http.post<void>('http://localhost:8080/category/sous',souscategory);
  }

  public getSubcategories():Observable<any>{
    return this.http.get<any>('http://localhost:8080/category/sous');
  }

  public getSubcategoryById(x:number):Observable<souscategory>{
    return this.http.get<souscategory>(`http://localhost:8080/category/subcategory/Id/${x}`);
  }

  public deletesouscategory(souscategoryId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/category/sous/${souscategoryId}`);
  }
  
}