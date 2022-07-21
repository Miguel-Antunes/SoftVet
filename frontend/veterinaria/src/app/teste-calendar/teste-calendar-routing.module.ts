import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TesteCalendarComponent } from './componentes/teste-calendar/teste-calendar.component';

const routes: Routes = [
  { path: 'teste-calendar', component: TesteCalendarComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TesteCalendarRoutingModule { }
