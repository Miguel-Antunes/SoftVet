import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultasRoutingModule } from './consultas-routing.module';
import { ConsultasFormComponent } from './consultas-form/consultas-form.component';
import { ConsultasListComponent } from './componentes/consultas-list/consultas-list.component';


@NgModule({
  declarations: [
    ConsultasFormComponent,
    ConsultasListComponent
  ],
  imports: [
    CommonModule,
    ConsultasRoutingModule
  ]
})
export class ConsultasModule { }
