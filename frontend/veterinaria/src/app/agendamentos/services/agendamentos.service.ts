import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Agendamento } from '../interfaces/Agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentosService {

  constructor(private http: HttpClient) {
  }
  apiUrl = environment.apiURLBase + '/api/agendamentos'

  cadastrar(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.apiUrl, agendamento)

  }

  recuperarTodos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.apiUrl)
  }

  recuperarPorId(id: number): Observable<Agendamento> {
    return this.http.get<Agendamento>(this.apiUrl + '/ ' + id)
  }

  editar(id: number, agendamento: Agendamento): Observable<Agendamento> {
    return this.http.put<Agendamento>(this.apiUrl + '/' + id, agendamento)
  }

  deletar(id: number): Observable<void> {
    return this.http.delete<void>('http://localhost:8080/api/agendamentos/' + id)
  }
}
