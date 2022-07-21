import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamentosFormComponent } from './componentes/agendamentos-form/agendamentos-form.component';
import { AgendamentosListComponent } from './componentes/agendamentos-list/agendamentos-list.component';

const routes: Routes = [
  { path: 'agendamentos-form', component: AgendamentosFormComponent },
  { path: 'agendamentos-list', component: AgendamentosListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendamentosRoutingModule { }
