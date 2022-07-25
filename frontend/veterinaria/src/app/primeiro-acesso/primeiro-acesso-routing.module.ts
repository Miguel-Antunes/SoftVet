import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrimeiroAcessoComponent } from './componentes/primeiro-acesso/primeiro-acesso.component';

const routes: Routes = [
  { path: 'primeiro-acesso', component: PrimeiroAcessoComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrimeiroAcessoRoutingModule { }
