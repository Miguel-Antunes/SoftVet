import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CpfCnpjPipe } from './pipes/cpfCnpj.pipe';
import { PhonePipe } from './pipes/phone.pipe';
import { DataPipe } from './pipes/data.pipe';
import { AuthService } from './services/auth.service';
import { BuscaCepService } from './services/busca-cep.service';



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
  ],
  providers: [
    BuscaCepService,  ///modificado recente
    AuthService         ///''''
  ]
})
export class SharedModule { }
