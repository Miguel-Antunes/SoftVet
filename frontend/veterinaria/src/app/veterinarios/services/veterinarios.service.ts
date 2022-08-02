import { Injectable } from '@angular/core';
import { Veterinario } from '../interfaces/veterinario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VeterinariosService {

  apiURL: string = environment.apiURLBase + '/api/veterinarios';
  constructor(private http: HttpClient) {

  }

  cadastrar(veterinario: Veterinario): Observable<Veterinario> {
    return this.http.post<Veterinario>(this.apiURL, veterinario);
  }

  recuperarTodos(): Observable<Veterinario[]> {
    return this.http.get<Veterinario[]>(this.apiURL);

  }
  recuperarPorId(id: number): Observable<Veterinario> {
    return this.http.get<Veterinario>(this.apiURL + "/" + id)
  }

  editar(id: number, veterinario: Veterinario): Observable<Veterinario> {
    return this.http.put<Veterinario>(this.apiURL + "/" + id, veterinario)
  }
  editarSituacao(id: number, situacao: string): Observable<Veterinario> {
    return this.http.put<Veterinario>(this.apiURL + "/situacao/" + id, situacao)
  }


}
