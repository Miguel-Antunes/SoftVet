import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/componentes/layout/layout.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AgendamentoEditComponent } from './componentes/agendamento-edit/agendamento-edit.component';
import { AgendamentoViewComponent } from './componentes/agendamento-view/agendamento-view.component';
import { AgendamentosListComponent } from './componentes/agendamentos-list/agendamentos-list.component';



const routes: Routes = [
  {
    path: 'agendamentos', component: LayoutComponent, canActivate: [AuthGuard], children: [

      { path: 'view', component: AgendamentoViewComponent },
      { path: 'list', component: AgendamentosListComponent },
      { path: 'edit/:id', component: AgendamentoEditComponent },
      { path: '', redirectTo: '/agendamentos/view', pathMatch: 'full' }


    ]

  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendamentosRoutingModule { }
