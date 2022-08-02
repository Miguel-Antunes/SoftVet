import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Animal } from '../interfaces/animal';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.apiURLBase + "/api/animais"

  cadastrar(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>(this.apiUrl, animal)
  }
  recuperarTodos(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.apiUrl);
  }

  recuperarPorId(id: number): Observable<Animal> {
    return this.http.get<Animal>(this.apiUrl + "/" + id);
  }

  recuperarAnimalPorProprietario(idProprietario: any): Observable<Animal[]> {

    return this.http.get<Animal[]>(this.apiUrl + "/proprietario/" + idProprietario);

  }

  editar(id: number, animal: Animal): Observable<Animal> {
    return this.http.put<Animal>(this.apiUrl + "/" + id, animal)
  }

}
