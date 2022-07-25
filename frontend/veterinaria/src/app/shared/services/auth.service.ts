import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenURL: string = environment.apiURLBase + environment.obterTokenUrl;
  clientID: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(private http: HttpClient) { }

  obterToken() {
    const tokenString = localStorage.getItem('access_token');
    if (tokenString) {
      const token = JSON.parse(tokenString).access_token
      return token;
    }
    return null;

  }

  encerrarSessao() {
    localStorage.removeItem('access_token');
  }
  obterNomeUsuarioAutenticado() {
    const token = this.obterToken();

    if (token) {
      const usuario = this.jwtHelper.decodeToken(token).user_name;
      return usuario;
    } else {
      return null;
    }

  }
  obterRoleAdmin() {
    const token = this.obterToken();


    if (token) {
      const role = this.jwtHelper.decodeToken(token).authorities;

      if (role == "ROLE_ADMIN") {
        return true;
      } else {
        return false;
      }
    }
    else {
      return false;
    }

  }

  isAuthenticated(): boolean {
    const token = this.obterToken();

    if (token) {
      const tokenExpirado = this.jwtHelper.isTokenExpired(token);
      if (!tokenExpirado) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  tentarLogar(usuario: string, senha: string): Observable<any> {
    const parametros = new HttpParams().set('username', usuario).set('password', senha).set('grant_type', 'password');
    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return this.http.post(this.tokenURL, parametros.toString(), { headers })
  }
}

