import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceitaViewComponent } from './receita-view/receita-view.component';
import { PoModule, PoPageModule } from '@po-ui/ng-components';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ReceitaViewComponent
  ],
  imports: [
    CommonModule,
    PoModule,
    PoPageModule,
    SharedModule
  ]
})
export class ReceitasModule { }
