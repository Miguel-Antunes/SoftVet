import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarioComponent } from '../calendario/componentes/calendario/calendario.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AgendamentosFormComponent } from './componentes/agendamentos-form/agendamentos-form.component';
import { AgendamentosListComponent } from './componentes/agendamentos-list/agendamentos-list.component';

const routes: Routes = [
  {
    path: 'agendamentos', component: CalendarioComponent, canActivate: [AuthGuard], children: [
      { path: 'form', component: AgendamentosFormComponent },
      { path: 'list', component: AgendamentosListComponent },
      { path: '', redirectTo: '/agendamentos/list', pathMatch: 'full' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendamentosRoutingModule { }
