import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeiroAcessoRoutingModule } from './primeiro-acesso-routing.module';
import { PrimeiroAcessoComponent } from './componentes/primeiro-acesso/primeiro-acesso.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { UsuariosModule } from '../usuarios/usuarios.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PrimeiroAcessoComponent
  ],
  imports: [
    CommonModule,
    PrimeiroAcessoRoutingModule,
    ReactiveFormsModule,
    PoModule,
    UsuariosModule,
    SharedModule
  ]
})
export class PrimeiroAcessoModule { }
