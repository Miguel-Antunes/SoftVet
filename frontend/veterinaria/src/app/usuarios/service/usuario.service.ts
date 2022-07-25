import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  apiUrl: string = environment.apiURLBase + '/api/usuarios';

  constructor(
    private http: HttpClient
  ) { }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    console.log(usuario)
    return this.http.post<Usuario>(this.apiUrl, usuario)
  }

  encontrarPorNomeDeUsuario(nomeDeUsuario: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + `/${nomeDeUsuario}`);

  }

}
