import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendamentosRoutingModule } from './agendamentos-routing.module';
import { AgendamentosListComponent } from './componentes/agendamentos-list/agendamentos-list.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { PoModule } from '@po-ui/ng-components';
import { SharedModule } from '../shared/shared.module';
import { AgendamentoViewComponent } from './componentes/agendamento-view/agendamento-view.component';
import { AgendamentoFormComponent } from './componentes/agendamento-form/agendamento-form.component';
import { AgendamentoDetalheComponent } from './componentes/agendamento-detalhe/agendamento-detalhe.component';
import { AgendamentoEditComponent } from './componentes/agendamento-edit/agendamento-edit.component';


registerLocaleData(localePt);

@NgModule({
  declarations: [
    AgendamentosListComponent,
    AgendamentoViewComponent,
    AgendamentoFormComponent,
    AgendamentoDetalheComponent,
    AgendamentoEditComponent
  ],
  imports: [
    CommonModule,
    AgendamentosRoutingModule,
    FormsModule,
    PoModule,
    SharedModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    ReactiveFormsModule,
  ],
  exports: [AgendamentoViewComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class AgendamentosModule { }
