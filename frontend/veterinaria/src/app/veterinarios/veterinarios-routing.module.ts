import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VeterinariosFormComponent } from './veterinarios-form/veterinarios-form.component';

const routes: Routes = [
  {path: 'veterinarios-form', component: VeterinariosFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VeterinariosRoutingModule { }
