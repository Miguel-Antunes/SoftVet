import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultasRoutingModule } from './consultas-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { ConsultasFormComponent } from './componentes/consultas-form/consultas-form.component';
import { ConsultasListComponent } from './componentes/consultas-list/consultas-list.component';


@NgModule({
  declarations: [
    ConsultasFormComponent,
    ConsultasListComponent
  ],
  imports: [
    CommonModule,
    ConsultasRoutingModule,
    ReactiveFormsModule,
    PoModule
  ]
})
export class ConsultasModule { }
