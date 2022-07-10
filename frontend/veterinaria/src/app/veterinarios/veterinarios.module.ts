import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VeterinariosRoutingModule } from './veterinarios-routing.module';
import { VeterinariosFormComponent } from './veterinarios-form/veterinarios-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { VeterinariosListComponent } from './veterinarios-list/veterinarios-list.component';

@NgModule({
  declarations: [
    VeterinariosFormComponent,
    VeterinariosListComponent
  ],
  imports: [
    CommonModule,
    VeterinariosRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    PoModule
  ],
  exports: [
    VeterinariosFormComponent
  ]
})
export class VeterinariosModule { }
