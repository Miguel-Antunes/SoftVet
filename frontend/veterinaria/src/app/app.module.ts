import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateModule } from './template/template.module';
import { HomeComponent } from './home/home.component';
import { VeterinariosModule } from './veterinarios/veterinarios.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VeterinariosService } from './veterinarios.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


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
    FontAwesomeModule
  ],
  providers: [
    VeterinariosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
