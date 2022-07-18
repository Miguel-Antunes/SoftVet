import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProprietariosFormComponent } from './proprietarios-form/proprietarios-form.component';
import { ProprietariosListComponent } from './proprietarios-list/proprietarios-list.component';

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
