import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    AgendamentosRoutingModule
  ],
})
export class AgendamentosModule { }
