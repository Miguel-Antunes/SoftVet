import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/componentes/layout/layout.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { VeterinariosFormComponent } from './componentes/veterinarios-form/veterinarios-form.component';
import { VeterinariosListComponent } from './componentes/veterinarios-list/veterinarios-list.component';

const routes: Routes = [
  {
    path: 'veterinarios', component: LayoutComponent, canActivate: [AuthGuard], children: [
      { path: 'form', component: VeterinariosFormComponent },
      {
        path: 'list', component: VeterinariosListComponent
      },
      { path: '', redirectTo: '/veterinarios/list', pathMatch: 'full' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeterinariosRoutingModule { }
