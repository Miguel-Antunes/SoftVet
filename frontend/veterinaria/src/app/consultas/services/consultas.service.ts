import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Consulta } from '../interfaces/Consulta';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.apiURLBase + "/api/consultas"
  recuperarConsulataPorVeterinario(id: number): Observable<Consulta[]>{
    return this.http.get<Consulta[]>('http://localhost:8080/api/consultas/veterinario/' + id)
  }
}
