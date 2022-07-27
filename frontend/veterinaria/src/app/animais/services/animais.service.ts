import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from '../interfaces/animal';

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(private http: HttpClient) { }

  cadastrar(animal: Animal): Observable<Animal> {
    return this.http.post<Animal>('http://localhost:8080/api/animais', animal)
  }
  recuperarTodos(): Observable<Animal[]> {
    return this.http.get<Animal[]>('http://localhost:8080/api/animais');
  }


}
