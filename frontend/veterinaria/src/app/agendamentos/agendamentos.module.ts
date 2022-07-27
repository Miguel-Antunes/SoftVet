import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { CalendarioModule } from '../calendario/calendario.module';
import { SharedModule } from '../shared/shared.module';
import { AgendamentosRoutingModule } from './agendamentos-routing.module';
import { AgendamentosFormComponent } from './componentes/agendamentos-form/agendamentos-form.component';
import { AgendamentosListComponent } from './componentes/agendamentos-list/agendamentos-list.component';


@NgModule({
  declarations: [
    AgendamentosFormComponent,
    AgendamentosListComponent
  ],
  imports: [
    CommonModule,
    AgendamentosRoutingModule,
    CalendarioModule,
    PoModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AgendamentosModule { }
