import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Delivery_person } from '../model/deliveryPerson';

@Injectable({
  providedIn: 'root'
})
export class DeliveryPersonService {
  constructor(private http: HttpClient) { }

  getDeliveryPersonsByTown(town: string): Observable<Delivery_person[]> {
    return this.http.get<Delivery_person[]>('http://localhost:8080/get/deliveryperson/town', { params: { town } });
  }
  
  getdeliverypersons(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/get/deliveryperson');
  }
}
