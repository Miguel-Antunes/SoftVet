import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProprietariosFormComponent } from './componentes/proprietarios-form/proprietarios-form.component';
import { ProprietariosListComponent } from './componentes/proprietarios-list/proprietarios-list.component';

const routes: Routes = [
  { path: 'proprietarios-form', component: ProprietariosFormComponent },
  {
    path: 'proprietarios-list', component: ProprietariosListComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProprietariosRoutingModule { }
