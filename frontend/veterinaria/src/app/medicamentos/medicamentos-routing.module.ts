import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MedicamentosFormComponent } from './componentes/medicamentos-form/medicamentos-form.component';
import { MedicamentosListComponent } from './componentes/medicamentos-list/medicamentos-list.component';

const routes: Routes = [
  { path: "medicamentos-form", component: MedicamentosFormComponent },
  { path: "medicamentos-list", component: MedicamentosListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicamentosRoutingModule { }
