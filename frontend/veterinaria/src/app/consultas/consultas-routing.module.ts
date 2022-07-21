import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultasFormComponent } from './consultas-form/consultas-form.component';

const routes: Routes = [
  { path: 'consultas-form', component: ConsultasFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultasRoutingModule { }
