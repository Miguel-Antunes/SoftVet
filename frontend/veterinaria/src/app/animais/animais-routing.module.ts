import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/componentes/layout/layout.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AnimaisEditComponent } from './componentes/animais-edit/animais-edit.component';
import { AnimaisFormComponent } from './componentes/animais-form/animais-form.component';
import { AnimaisListComponent } from './componentes/animais-list/animais-list.component';


import { AnimaisViewProntuarioComponent } from './componentes/animais-view-prontuario/animais-view-prontuario.component';
import { AnimaisViewComponent } from './componentes/animais-view/animais-view.component';

const routes: Routes = [
  {
    path: 'animais', component: LayoutComponent, canActivate: [AuthGuard], children: [
      { path: 'form', component: AnimaisFormComponent },
      { path: 'list', component: AnimaisListComponent },
      { path: 'view/:id', component: AnimaisViewComponent },
      { path: 'view/prontuario/:id', component: AnimaisViewProntuarioComponent },
      { path: 'edit/:id', component: AnimaisEditComponent },
      { path: '', redirectTo: '/animais/list', pathMatch: 'full' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimaisRoutingModule { }
