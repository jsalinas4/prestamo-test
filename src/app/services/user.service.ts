import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/v1/client'; // Ajusta la URL si es diferente
  private apiData = 'http://localhost:8080/api/v1/data/';

  constructor(private http: HttpClient) {}

  // Método para obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getClientByDni(dni: string): Observable<any> {
    return this.http.get<any>(`${this.apiData}/${dni}`);
  }

  sendClientData(clientData: any): Observable<any> {
    return this.http.post(this.apiUrl, clientData);
  }
}