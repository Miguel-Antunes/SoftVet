import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosFormComponent } from './componentes/usuarios-form/usuarios-form.component';
import { UsuariosListComponent } from './componentes/usuarios-list/usuarios-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { SharedModule } from '../shared/shared.module';
import { UsuarioService } from './service/usuario.service';


@NgModule({
  declarations: [
    UsuariosFormComponent,
    UsuariosListComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    PoModule,
    SharedModule
  ],
  providers: [
    UsuarioService
  ]
})
export class UsuariosModule { }
