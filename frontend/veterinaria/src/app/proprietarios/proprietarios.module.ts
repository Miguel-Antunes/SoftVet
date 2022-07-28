import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PoListViewModule, PoModule } from '@po-ui/ng-components';

import { SharedModule } from '../shared/shared.module';
import { ProprietariosEditComponent } from './componentes/proprietarios-edit/proprietarios-edit.component';
import { ProprietariosFormComponent } from './componentes/proprietarios-form/proprietarios-form.component';
import { ProprietariosListComponent } from './componentes/proprietarios-list/proprietarios-list.component';
import {
  ProprietariosViewAnimaisComponent,
} from './componentes/proprietarios-view-animais/proprietarios-view-animais.component';
import { ProprietariosViewComponent } from './componentes/proprietarios-view/proprietarios-view.component';
import { ProprietariosRoutingModule } from './proprietarios-routing.module';

@NgModule({
  declarations: [
    ProprietariosFormComponent,
    ProprietariosListComponent,
    ProprietariosViewComponent,
    ProprietariosEditComponent,
    ProprietariosViewAnimaisComponent,
  ],
  imports: [
    CommonModule,
    ProprietariosRoutingModule,
    ReactiveFormsModule,
    PoModule,
    SharedModule,
    PoListViewModule,
    BrowserAnimationsModule
  ]
})
export class ProprietariosModule { }
