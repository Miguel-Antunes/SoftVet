import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamentoViewComponent } from './agendamentos/componentes/agendamento-view/agendamento-view.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/componentes/layout/layout.component';
import { LoginComponent } from './login/componentes/login/login.component';
import { ReceitaViewComponent } from './receitas/receita-view/receita-view.component';
import { AuthGuard } from './shared/guards/auth.guard'
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: LayoutComponent, children: [
      { path: 'agendamentos/view', component: AgendamentoViewComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: '/agendamentos/view', pathMatch: 'full' }

    ]
  },
  {
    path: 'consultas/view/receita/:id', component: ReceitaViewComponent, canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
