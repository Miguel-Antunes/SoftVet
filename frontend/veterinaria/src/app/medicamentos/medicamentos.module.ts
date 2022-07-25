import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicamentosRoutingModule } from './medicamentos-routing.module';
import { MedicamentosFormComponent } from './componentes/medicamentos-form/medicamentos-form.component';
import { MedicamentosListComponent } from './componentes/medicamentos-list/medicamentos-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { PrimeiroAcessoModule } from '../primeiro-acesso/primeiro-acesso.module';


@NgModule({
  declarations: [
    MedicamentosFormComponent,
    MedicamentosListComponent
  ],
  imports: [
    CommonModule,
    MedicamentosRoutingModule,
    ReactiveFormsModule,
    PoModule
  ]
})
export class MedicamentosModule { }
