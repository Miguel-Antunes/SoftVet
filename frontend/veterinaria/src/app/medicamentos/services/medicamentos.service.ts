import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Medicamento } from '../interfaces/Medicamento';

@Injectable({
  providedIn: 'root'
})
export class MedicamentosService {

  constructor(private http: HttpClient) {

  }

  cadastrar(medicamento: Medicamento): Observable<Medicamento> {
    return this.http.post<Medicamento>('http://localhost:8080/api/medicamentos', medicamento)
  }
  recuperarTodos(): Observable<Medicamento[]> {
    return this.http.get<Medicamento[]>('http://localhost:8080/api/medicamentos')
  }

}
