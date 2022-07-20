import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PoModule, PoPageModule } from '@po-ui/ng-components';

import { CpfCnpjPipe } from '../pipes/cpfCnpj.pipe';
import { PhonePipe } from '../pipes/phone.pipe';
import { VeterinariosFormComponent } from './componentes/veterinarios-form/veterinarios-form.component';
import { VeterinariosListComponent } from './componentes/veterinarios-list/veterinarios-list.component';
import { VeterinariosRoutingModule } from './veterinarios-routing.module';

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
