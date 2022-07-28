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
    return this.http.post<Animal>('http://localhost:8080/api/animais', animal)
  }
  recuperarTodos(): Observable<Animal[]> {
    return this.http.get<Animal[]>('http://localhost:8080/api/animais');
  }

  recuperarPorId(id: number): Observable<Animal> {
    return this.http.get<Animal>(this.apiUrl + "/" + id);
  }

}
