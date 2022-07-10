import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeterinariosFormComponent } from './veterinarios-form/veterinarios-form.component';
import { VeterinariosListComponent } from './veterinarios-list/veterinarios-list.component';

const routes: Routes = [
  {path: 'veterinarios-form', component: VeterinariosFormComponent},
  {path: 'veterinarios-list', component: VeterinariosListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeterinariosRoutingModule { }
