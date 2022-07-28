import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProprietariosRoutingModule } from './proprietarios-routing.module';
import { ProprietariosFormComponent } from './componentes/proprietarios-form/proprietarios-form.component';
import { ProprietariosListComponent } from './componentes/proprietarios-list/proprietarios-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PoListViewModule, PoModule } from '@po-ui/ng-components';
import { PhonePipe } from '../shared/pipes/phone.pipe';
import { CpfCnpjPipe } from '../shared/pipes/cpfCnpj.pipe';
import { SharedModule } from '../shared/shared.module';
import { ProprietariosViewComponent } from './componentes/proprietarios-view/proprietarios-view.component';
import { ProprietariosEditComponent } from './componentes/proprietarios-edit/proprietarios-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProprietariosViewAnimaisComponent } from './componentes/proprietarios-view-animais/proprietarios-view-animais.component';

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
