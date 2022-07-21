import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TesteCalendarRoutingModule } from './teste-calendar-routing.module';
import { TesteCalendarComponent } from './componentes/teste-calendar/teste-calendar.component';


@NgModule({
  declarations: [
    TesteCalendarComponent
  ],
  imports: [
    CommonModule,
    TesteCalendarRoutingModule
  ]
})
export class TesteCalendarModule { }
