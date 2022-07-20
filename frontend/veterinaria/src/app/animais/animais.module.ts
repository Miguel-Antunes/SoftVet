import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimaisRoutingModule } from './animais-routing.module';
import { AnimaisFormComponent } from './componentes/animais-form/animais-form.component';
import { AnimaisListComponent } from './componentes/animais-list/animais-list.component';


@NgModule({
  declarations: [
    AnimaisFormComponent,
    AnimaisListComponent
  ],
  imports: [
    CommonModule,
    AnimaisRoutingModule
  ]
})
export class AnimaisModule { }
