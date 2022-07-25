import { Component } from '@angular/core';
import { BuscaCepService } from './shared/services/busca-cep.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'veterinaria';

  constructor(private cepService: BuscaCepService) {

  }
  consultaCep(cep, form) {
    return this.cepService
      .buscar(cep).
      subscribe((dados) => {
        this.populaForm(dados, form);

      }
      )
  }
  populaForm(dados, form) {
    form.setValue({
      cep: dados.cep,
      uf: dados.uf,
      cidade: dados.cidade,
      rua: dados.logradouro
    })
  }

}
