import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultasRoutingModule } from './consultas-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';
import { ConsultasFormComponent } from './componentes/consultas-form/consultas-form.component';
import { ConsultasListComponent } from './componentes/consultas-list/consultas-list.component';
import { SharedModule } from '../shared/shared.module';
import { ConsultasViewComponent } from './componentes/consultas-view/consultas-view.component';
import { ConsultasAgendadasFormComponent } from './componentes/consultas-agendadas-form/consultas-agendadas-form.component';
import { ReceitasComponent } from './componentes/receitas/receitas.component';


@NgModule({
  declarations: [
    ConsultasFormComponent,
    ConsultasListComponent,
    ConsultasViewComponent,
    ConsultasAgendadasFormComponent,
    ReceitasComponent
  ],
  imports: [
    CommonModule,
    ConsultasRoutingModule,
    ReactiveFormsModule,
    PoModule,
    SharedModule,
    FormsModule
  ]
})
export class ConsultasModule { }
