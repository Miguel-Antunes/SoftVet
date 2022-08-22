import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PoModule, PoPageModule } from '@po-ui/ng-components';

import { SharedModule } from '../shared/shared.module';
import { VeterinariosFormComponent } from './componentes/veterinarios-form/veterinarios-form.component';
import { VeterinariosListComponent } from './componentes/veterinarios-list/veterinarios-list.component';
import { VeterinariosRoutingModule } from './veterinarios-routing.module';
import { VeterinariosEditComponent } from './componentes/veterinarios-edit/veterinarios-edit.component';
import { VeterinariosViewComponent } from './componentes/veterinarios-view/veterinarios-view.component';


@NgModule({
  declarations: [
    VeterinariosFormComponent,
    VeterinariosListComponent,
    VeterinariosEditComponent,
    VeterinariosViewComponent
  ],
  imports: [
    CommonModule,
    VeterinariosRoutingModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    PoModule,
    PoPageModule,
    BrowserAnimationsModule,
    SharedModule
  ]
})
export class VeterinariosModule { }
