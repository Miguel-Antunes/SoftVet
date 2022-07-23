import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarioComponent } from './componentes/calendario/calendario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { PoModule } from '@po-ui/ng-components';
import { AgendamentosFormComponent } from '../agendamentos/componentes/agendamentos-form/agendamentos-form.component';
import { CalendarioRoutingModule } from './calendario-routing.module';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    CalendarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    PoModule,
    ReactiveFormsModule,
    CalendarioRoutingModule
  ],
  exports: [CalendarioComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CalendarioModule { }