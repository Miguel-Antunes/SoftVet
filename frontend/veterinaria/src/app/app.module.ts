import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component';
import { VeterinariosModule } from './veterinarios/veterinarios.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VeterinariosService } from './veterinarios/services/veterinarios.service';
import { HttpClientModule } from '@angular/common/http';
import { ProprietariosModule } from './proprietarios/proprietarios.module';
import { ProprietarioService } from './proprietarios/services/proprietario.service';
import { AnimaisModule } from './animais/animais.module';
import { MedicamentosModule } from './medicamentos/medicamentos.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    TemplateModule,
    VeterinariosModule,
    ProprietariosModule,
    AnimaisModule,
    MedicamentosModule,
    FontAwesomeModule
  ],
  providers: [
    VeterinariosService,
    ProprietarioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
