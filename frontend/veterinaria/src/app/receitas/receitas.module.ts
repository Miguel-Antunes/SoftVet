import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceitaViewComponent } from './receita-view/receita-view.component';
import { PoModule, PoPageModule } from '@po-ui/ng-components';

@NgModule({
  declarations: [
    ReceitaViewComponent
  ],
  imports: [
    CommonModule,
    PoModule,
    PoPageModule
  ]
})
export class ReceitasModule { }
