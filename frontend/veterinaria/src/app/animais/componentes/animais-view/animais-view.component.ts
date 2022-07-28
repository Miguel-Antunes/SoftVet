import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoDynamicViewField } from '@po-ui/ng-components';
import { map } from 'rxjs';
import { AnimaisService } from 'src/app/animais/services/animais.service';
import { CepPipe } from 'src/app/shared/pipes/cep.pipe';
import { CpfCnpjPipe } from 'src/app/shared/pipes/cpfCnpj.pipe';
import { DataPipe } from 'src/app/shared/pipes/data.pipe';
import { PhonePipe } from 'src/app/shared/pipes/phone.pipe';

import { Animal } from '../../interfaces/animal';

@Component({
  selector: 'app-animais-view',
  providers: [CpfCnpjPipe, PhonePipe, CepPipe],
  templateUrl: './animais-view.component.html',
  styleUrls: ['./animais-view.component.css']
})
export class AnimaisViewComponent implements OnInit {


  campo: Array<PoDynamicViewField> = [
    { property: 'nome', label: 'Nome', divider: 'Dados do Animal', gridColumns: 4, order: 1, },
    { property: 'especie', label: 'Espécie', gridColumns: 4 },
    { property: 'raca', label: 'Raça', gridColumns: 4 },
    { property: 'cor', label: 'Cor', gridColumns: 4, order: 2 },
    { property: 'altura', label: 'Altura', gridColumns: 4, order: 3 },
    { property: 'peso', label: 'Peso', gridColumns: 4, order: 3 },
    { property: 'idade', label: 'Idade', gridColumns: 4, order: 3 },
    { property: 'sexo', label: 'Sexo', gridColumns: 4 },
    { property: 'tipoSangue', label: 'Tipo Sanguíneo', gridColumns: 4, order: 3 },
    { property: 'proprietarioNome', label: 'Nome', divider: 'Dados do Proprietário', gridColumns: 4 },
    { property: 'proprietarioCpf', label: 'CPF', gridColumns: 4 },
    { property: 'proprietarioTelefone', label: 'Telefone', gridColumns: 4 },
    { property: 'proprietarioEmail', label: 'Email', gridColumns: 4 },
    { property: 'proprietarioCep', label: 'CEP', divider: 'Endereço do Proprietário', gridColumns: 4 },
    { property: 'proprietarioUf', label: 'UF', gridColumns: 4 },
    { property: 'proprietarioCidade', label: 'Cidade', gridColumns: 4 },
    { property: 'proprietarioRua', label: 'Rua', gridColumns: 4 },
    { property: 'proprietarioNumero', label: 'Nº', gridColumns: 4 },
    { property: 'proprietarioComplemento', label: 'Complemento', gridColumns: 4 }
  ];
  animal: Animal;
  aux: any;
  idAnimal: number;

  constructor(
    private animalService: AnimaisService,
    private cpfCnpj: CpfCnpjPipe,
    private phonePipe: PhonePipe,
    private cepPipe: CepPipe,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  editar(): void {
    this.router.navigate(['/animais/edit/' + this.animal.id])
  }

  ngOnInit(): void {
    this.pegarIdAnimal();
    this.buscarAnimal();

  }
  pegarIdAnimal(): void {
    this.idAnimal = this.route.snapshot.params['id'];
  }

  buscarAnimal(): void {
    this.animalService.recuperarPorId(this.idAnimal).pipe(map(response => {
      response.proprietario.cpf = this.cpfCnpj.transform(response.proprietario.cpf)
      response.proprietario.cep = this.cepPipe.transform(response.proprietario.cep)
      response.proprietario.telefone = this.phonePipe.transform(response.proprietario.telefone)
      if (response.sexo) {
        response.sexo = response.sexo.toString().toUpperCase()
      }
      this.aux = response;
      return response
    })).subscribe(response => {
      this.animal = {
        ...this.aux,
        proprietarioNome: response.proprietario.nome,
        proprietarioCpf: response.proprietario.cpf,
        proprietarioTelefone: response.proprietario.telefone,
        proprietarioEmail: response.proprietario.email,
        proprietarioCep: response.proprietario.cep,
        proprietarioUf: response.proprietario.uf,
        proprietarioCidade: response.proprietario.cidade,
        proprietarioRua: response.proprietario.rua,
        proprietarioNumero: response.proprietario.numero,
        proprietarioComplemento: response.proprietario.complemento,

      }
    })
  }
  visualizarProntuario(): void {
    this.router.navigate(['/animais/view/prontuario/' + this.idAnimal])

  }

}
