import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimaisFormComponent } from './componentes/animais-form/animais-form.component';
import { AnimaisListComponent } from './componentes/animais-list/animais-list.component';

const routes: Routes = [
  {path: 'animais-form', component: AnimaisFormComponent },
  {path: 'animais-list', component: AnimaisListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimaisRoutingModule { }
