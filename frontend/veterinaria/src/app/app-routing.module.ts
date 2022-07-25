import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/componentes/layout/layout.component';
import { LoginComponent } from './login/componentes/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard'
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '', component: LayoutComponent, children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: '/home', pathMatch: 'full' }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
