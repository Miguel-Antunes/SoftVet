import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimaisRoutingModule } from './animais-routing.module';
import { AnimaisFormComponent } from './componentes/animais-form/animais-form.component';
import { AnimaisListComponent } from './componentes/animais-list/animais-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoFieldModule, PoModule } from '@po-ui/ng-components';
import { AnimaisViewComponent } from './componentes/animais-view/animais-view.component';
import { AnimaisEditComponent } from './componentes/animais-edit/animais-edit.component';
import { AnimaisViewProntuarioComponent } from './componentes/animais-view-prontuario/animais-view-prontuario.component';




@NgModule({
  declarations: [
    AnimaisFormComponent,
    AnimaisListComponent,
    AnimaisViewComponent,
    AnimaisEditComponent,
    AnimaisViewProntuarioComponent
  ],
  imports: [
    CommonModule,
    AnimaisRoutingModule,
    ReactiveFormsModule,
    PoModule,
    FormsModule
  ]
})
export class AnimaisModule { }
