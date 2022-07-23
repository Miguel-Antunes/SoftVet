import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfCnpjPipe } from './pipes/cpfCnpj.pipe';
import { PhonePipe } from './pipes/phone.pipe';
import { DataPipe } from './pipes/data.pipe';



@NgModule({
  declarations: [
    CpfCnpjPipe,
    PhonePipe,
    DataPipe
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CpfCnpjPipe,
    PhonePipe,
    DataPipe
  ]
})
export class SharedModule { }
