import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { jwtDecode } from "jwt-decode";
import { User } from '../model/user';
import { Delivery_person } from '../model/deliveryPerson';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _http: HttpClient) { }


  public loginUser(email: string, password: string):Observable<any>{
    const body = { emailId: email, password: password };
    return this._http.post<any>("http://localhost:8080/login/user",body)
    .pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  public loginAdmin(email: string, password: string):Observable<any>{
    const body = { emailId: email, password: password };
    return this._http.post<any>("http://localhost:8080/login/admin",body)
    .pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  public loginDeliveryPerson(email: string, password: string):Observable<any>{
    const body = { emailId: email, password: password };
    return this._http.post<any>("http://localhost:8080/login/deliveryperson",body)
    .pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getUserId(token: string): number | null {
    try {
      const decodedToken: any = jwtDecode(token);
      return Number(decodedToken.sub);
    } catch (error) {
      console.error("Erreur lors du décodage du JWT :", error);
      return null;
    }
  }

  getUserName(token: string): string | null {
    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.name;
    } catch (error) {
      console.error("Erreur lors du décodage du JWT :", error);
      return null;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  public registerUserFromRemote(user:User):Observable<any>{
    return this._http.post<any>("http://localhost:8080/register/user",user)
  }

  public registerDeliveryPersonFromRemote(deliveryPerson:Delivery_person):Observable<any>{
    return this._http.post<any>("http://localhost:8080/register/deliveryperson",deliveryPerson)
  }

  getUserById(x: number): Observable<User> {
    return this._http.get<User>(`http://localhost:8080/user/Id${x}`);
  }

  updateUser(x: number, user: User): Observable<User>{
    return this._http.put<User>(`http://localhost:8080/update/${x}`, user);
  }
  getallusers(): Observable<User[]> { 
    return this._http.get<User[]>('http://localhost:8080/user'); 
  }

}
