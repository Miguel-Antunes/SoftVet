import { Injectable } from '@angular/core';
import { Veterinario } from '../interfaces/veterinario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VeterinariosService {

  constructor(private http: HttpClient) {

   }

   cadastrar(veterinario: Veterinario): Observable<Veterinario> {
    return this.http.post<Veterinario>('http://localhost:8080/api/veterinarios', veterinario);
   }

   recuperarTodos(): Observable<Veterinario[]>{
    return this.http.get<Veterinario[]>('http://localhost:8080/api/veterinarios');

   }

}
