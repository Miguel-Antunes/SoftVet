import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  usuario: string;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.usuario = this.auth.obterNomeUsuarioAutenticado();
  }

}
