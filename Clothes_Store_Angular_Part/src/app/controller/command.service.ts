import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Command } from '../model/command';
@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor(private http: HttpClient) { }

  getAllCommands(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/commande/all');
  }

  addCommand(command: Command): Observable<any> {
    return this.http.post<any>('http://localhost:8080/commande/add', command)
  }

  updateCommand(commandId: number, deliveryPersonId: number): Observable<any> {
    return this.http.put(`http://localhost:8080/commande/update/admin/${commandId}?deliveryPersonId=${deliveryPersonId}`, {});
  }

  getDeliveryPersonCommands(deliveryPersonId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/commande/delivery/person/${deliveryPersonId}?`);
  }
  
  validateCommand(commandId: number): Observable<any>{
    return this.http.put(`http://localhost:8080/commande/update/delivery/person/${commandId}?`,{});
  }
  
}
