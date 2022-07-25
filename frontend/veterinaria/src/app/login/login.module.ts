import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './componentes/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { PrimeiroAcessoComponent } from '../primeiro-acesso/componentes/primeiro-acesso/primeiro-acesso.component';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PoModule
  ]
})
export class LoginModule { }
