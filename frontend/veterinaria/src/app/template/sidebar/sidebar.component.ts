import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  usuario: string;
  roleAdmin: boolean = false;

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.usuario = this.auth.obterNomeUsuarioAutenticado();
    this.roleAdmin = this.auth.obterRoleAdmin();
  }

  logout() {
    this.auth.encerrarSessao();
  }

}
