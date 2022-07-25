import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/componentes/layout/layout.component';
import { ConsultasFormComponent } from './consultas-form/consultas-form.component';
import { ConsultasListComponent } from './componentes/consultas-list/consultas-list.component';
import { AuthGuard } from '../shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'consultas', component: LayoutComponent, canActivate: [AuthGuard], children: [
      { path: 'form', component: ConsultasFormComponent },
      { path: 'list', component: ConsultasListComponent },
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
