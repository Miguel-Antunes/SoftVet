import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VeterinariosRoutingModule } from './veterinarios-routing.module';
import { VeterinariosFormComponent } from './componentes/veterinarios-form/veterinarios-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { PoModule, PoPageModule } from '@po-ui/ng-components';
import { VeterinariosListComponent } from './componentes/veterinarios-list/veterinarios-list.component';
import { PhonePipe } from '../pipes/phone.pipe';
import { CpfCnpjPipe } from '../pipes/cpfCnpj.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    VeterinariosFormComponent,
    VeterinariosListComponent,
    PhonePipe,
    CpfCnpjPipe
  ],
  imports: [
    CommonModule,
    VeterinariosRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    PoModule,
    PoPageModule,
    BrowserAnimationsModule

  ],
  exports: [
    VeterinariosFormComponent,
    PhonePipe,
    CpfCnpjPipe
  ]
})
export class VeterinariosModule { }
