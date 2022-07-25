import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/componentes/layout/layout.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { ProprietariosFormComponent } from './componentes/proprietarios-form/proprietarios-form.component';
import { ProprietariosListComponent } from './componentes/proprietarios-list/proprietarios-list.component';

const routes: Routes = [
  {
    path: 'proprietarios', component: LayoutComponent, canActivate: [AuthGuard], children: [
      { path: 'form', component: ProprietariosFormComponent },
      {
        path: 'list', component: ProprietariosListComponent
      },
      { path: '', redirectTo: '/proprietarios/list', pathMatch: 'full' }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProprietariosRoutingModule { }
