import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Agendamento } from '../interfaces/Agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentosService {

  constructor(private http: HttpClient) {
  }

  cadastrar(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>('http://localhost:8080/api/agendamentos', agendamento)

  }

  recuperarTodos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>('http://localhost:8080/api/agendamentos')
  }

  recuperarPorId(id: number): Observable<Agendamento> {
    return this.http.get<Agendamento>('http://localhost:8080/api/agendamentos/ ' + id)
  }

  editar(id: number, agendamento: Agendamento): Observable<Agendamento> {
    return this.http.put<Agendamento>('http://localhost:8080/api/agendamentos/' + id, agendamento)
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>('http://localhost:8080/api/agendamentos/' + id)
  }
}
