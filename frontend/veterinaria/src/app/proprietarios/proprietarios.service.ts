import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proprietario } from './proprietario';

@Injectable({
  providedIn: 'root'
})
export class ProprietariosService {

  constructor(private http: HttpClient) {

  }

  cadastrar(veterinario: Proprietario): Observable<Proprietario> {
   return this.http.post<Proprietario>('http://localhost:8080/api/veterinarios', veterinario);

  }
}
