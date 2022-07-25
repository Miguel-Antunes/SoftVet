import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/componentes/layout/layout.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UsuariosFormComponent } from './componentes/usuarios-form/usuarios-form.component';
import { UsuariosListComponent } from './componentes/usuarios-list/usuarios-list.component';

const routes: Routes = [
  {
    path: 'usuarios', component: LayoutComponent, canActivate: [AuthGuard], children: [
      { path: 'form', component: UsuariosFormComponent },
      { path: 'list', component: UsuariosListComponent },
      { path: '', redirectTo: '/usuarios/list', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
