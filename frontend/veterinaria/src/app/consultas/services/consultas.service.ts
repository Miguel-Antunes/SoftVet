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
  recuperarConsulataPorVeterinario(idVeterinario: number): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.apiUrl + '/veterinario/' + idVeterinario)
  }

  recuperarConsultaPorAnimal(idAnimal: number): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.apiUrl + '/animal/' + idAnimal)

  }
  recuperarPorId(idConsulta: number): Observable<Consulta> {
    return this.http.get<Consulta>(this.apiUrl + "/" + idConsulta)
  }
  recuperarTodas(): Observable<Consulta[]> {
    return this.http.get<Consulta[]>(this.apiUrl)
  }
}
