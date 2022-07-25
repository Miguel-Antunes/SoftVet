import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/usuarios/interfaces/Usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrimeiroAcessoService {

  apiUrl: string = environment.apiURLBase + "/api/usuarios"
  constructor(
    private http: HttpClient
  ) { }



  registrarSenha(id: number, usuario: Usuario): any {
    console.log(usuario);
    return this.http.put<any>(this.apiUrl + "/" + id, usuario)
  }
}
