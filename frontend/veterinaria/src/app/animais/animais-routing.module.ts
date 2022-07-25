import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/componentes/layout/layout.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { AnimaisFormComponent } from './componentes/animais-form/animais-form.component';
import { AnimaisListComponent } from './componentes/animais-list/animais-list.component';

const routes: Routes = [
  {
    path: 'animais', component: LayoutComponent, canActivate: [AuthGuard], children: [
      { path: 'form', component: AnimaisFormComponent },
      { path: 'list', component: AnimaisListComponent },
      { path: '', redirectTo: '/animais/list', pathMatch: 'full' }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimaisRoutingModule { }
