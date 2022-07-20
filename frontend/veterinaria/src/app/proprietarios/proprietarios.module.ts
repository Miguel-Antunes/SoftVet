import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProprietariosRoutingModule } from './proprietarios-routing.module';
import { ProprietariosFormComponent } from './componentes/proprietarios-form/proprietarios-form.component';
import { ProprietariosListComponent } from './componentes/proprietarios-list/proprietarios-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PoModule } from '@po-ui/ng-components';

@NgModule({
  declarations: [
    ProprietariosFormComponent,
    ProprietariosListComponent
  ],
  imports: [
    CommonModule,
    ProprietariosRoutingModule,
    ReactiveFormsModule,
    PoModule
  ]
})
export class ProprietariosModule { }
