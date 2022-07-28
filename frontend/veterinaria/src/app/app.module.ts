import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component';
import { VeterinariosModule } from './veterinarios/veterinarios.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VeterinariosService } from './veterinarios/services/veterinarios.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProprietariosModule } from './proprietarios/proprietarios.module';
import { ProprietarioService } from './proprietarios/services/proprietario.service';
import { AnimaisModule } from './animais/animais.module';
import { MedicamentosModule } from './medicamentos/medicamentos.module';
import { AgendamentosModule } from './agendamentos/agendamentos.module';
import { ConsultasModule } from './consultas/consultas.module';
import { LoginModule } from './login/login.module';
import { LayoutComponent } from './layout/componentes/layout/layout.component';
import { LayoutModule } from './layout/layout.module';
import { AuthService } from './shared/services/auth.service';
import { TokenInterceptor } from './shared/token.interceptor';
import { BuscaCepService } from './shared/services/busca-cep.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { PrimeiroAcessoComponent } from './primeiro-acesso/componentes/primeiro-acesso/primeiro-acesso.component';
import { PrimeiroAcessoModule } from './primeiro-acesso/primeiro-acesso.module';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    TemplateModule,
    LoginModule,
    PrimeiroAcessoModule,
    VeterinariosModule,
    ProprietariosModule,
    AnimaisModule,
    MedicamentosModule,
    AgendamentosModule,
    ConsultasModule,
    FontAwesomeModule,
    UsuariosModule
  ],
  providers: [
    BuscaCepService,
    VeterinariosService,
    ProprietarioService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
