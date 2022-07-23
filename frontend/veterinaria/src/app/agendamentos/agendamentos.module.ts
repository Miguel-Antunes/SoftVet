import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendamentosRoutingModule } from './agendamentos-routing.module';
import { AgendamentosFormComponent } from './componentes/agendamentos-form/agendamentos-form.component';
import { AgendamentosListComponent } from './componentes/agendamentos-list/agendamentos-list.component';
import { CalendarioModule } from '../calendario/calendario.module';
import { PoModule } from '@po-ui/ng-components';
import { DataPipe } from '../shared/pipes/data.pipe';
import { SharedModule } from '../shared/shared.module';


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
    SharedModule
  ]
})
export class AgendamentosModule { }
