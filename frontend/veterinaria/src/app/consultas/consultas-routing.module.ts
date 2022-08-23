import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/componentes/layout/layout.component';
import { ConsultasListComponent } from './componentes/consultas-list/consultas-list.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ConsultasFormComponent } from './componentes/consultas-form/consultas-form.component';
import { ConsultasViewComponent } from './componentes/consultas-view/consultas-view.component';
import { ConsultasAgendadasFormComponent } from './componentes/consultas-agendadas-form/consultas-agendadas-form.component';


const routes: Routes = [
  {
    path: 'consultas', component: LayoutComponent, canActivate: [AuthGuard], children: [
      { path: 'form', component: ConsultasFormComponent },
      { path: 'agendadas/form/:id', component: ConsultasAgendadasFormComponent },
      { path: 'form/:id', component: ConsultasAgendadasFormComponent },
      { path: 'list', component: ConsultasListComponent },
      { path: 'view/:id', component: ConsultasViewComponent },

      {
        path: '', redirectTo: '/consultas/list', pathMatch: 'full'
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule { }
