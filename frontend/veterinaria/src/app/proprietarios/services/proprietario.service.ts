import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proprietario } from '../interfaces/proprietario';

@Injectable({
  providedIn: 'root'
})
export class ProprietarioService {

  constructor(private http: HttpClient) {

  }
  apiUrl = environment.apiURLBase + '/api/proprietarios'
  cadastrar(proprietario: Proprietario): Observable<Proprietario> {
    return this.http.post<Proprietario>('http://localhost:8080/api/proprietarios', proprietario);
  }

  recuperarTodos(): Observable<Proprietario[]> {
    return this.http.get<Proprietario[]>('http://localhost:8080/api/proprietarios');

  }
  recuperarPorId(id: number): Observable<Proprietario> {
    return this.http.get<Proprietario>(this.apiUrl + '/' + id)
  }
}
