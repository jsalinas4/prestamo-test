import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {}

  // Método para obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.urlApi+"client");
  }

  getClientByDni(dni: number): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/data/${dni}`);
  }

  getClientByRuc(ruc: number): Observable<any> {
    return this.http.get<any>(`${environment.urlApi}/pyme/${ruc}`);
  }

  sendClientData(clientData: any): Observable<any> {
    return this.http.post(environment.urlApi+"/client", clientData);
  }
  
}