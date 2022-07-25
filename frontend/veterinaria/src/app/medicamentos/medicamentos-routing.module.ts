import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/componentes/layout/layout.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { MedicamentosFormComponent } from './componentes/medicamentos-form/medicamentos-form.component';
import { MedicamentosListComponent } from './componentes/medicamentos-list/medicamentos-list.component';

const routes: Routes = [
  {
    path: 'medicamentos', component: LayoutComponent, canActivate: [AuthGuard], children: [
      { path: "form", component: MedicamentosFormComponent },
      { path: "list", component: MedicamentosListComponent },
      { path: '', redirectTo: '/medicamentos/list', pathMatch: 'full' }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicamentosRoutingModule { }
