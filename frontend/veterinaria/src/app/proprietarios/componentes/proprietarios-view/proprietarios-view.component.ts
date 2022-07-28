import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoDynamicViewField } from '@po-ui/ng-components';
import { map } from 'rxjs';
import { AnimaisService } from 'src/app/animais/services/animais.service';
import { CepPipe } from 'src/app/shared/pipes/cep.pipe';
import { CpfCnpjPipe } from 'src/app/shared/pipes/cpfCnpj.pipe';
import { DataPipe } from 'src/app/shared/pipes/data.pipe';
import { PhonePipe } from 'src/app/shared/pipes/phone.pipe';
import { Proprietario } from '../../interfaces/proprietario';
import { ProprietarioService } from '../../services/proprietario.service';



@Component({
  selector: 'app-proprietarios-view',
  providers: [CpfCnpjPipe, DataPipe, PhonePipe, CepPipe],
  templateUrl: './proprietarios-view.component.html',
  styleUrls: ['./proprietarios-view.component.css']
})
export class ProprietariosViewComponent implements OnInit {

  campo: Array<PoDynamicViewField> = [
    { property: 'nome', label: 'Nome', divider: 'Dados Pessoais', gridColumns: 4, order: 1, },
    { property: 'dataNascimento', label: 'Nascimento', gridColumns: 4 },
    { property: 'sexo', label: 'Sexo', gridColumns: 4 },
    { property: 'cpf', label: 'CPF', gridColumns: 4, order: 2 },
    { property: 'telefone', label: 'Celular', gridColumns: 4, order: 3 },
    { property: 'dataCadastro', label: 'Data de Cadastro', gridColumns: 4, divider: 'Dados do Sistema' },
    { property: 'cidade', label: 'Cidade', divider: 'Endereço', gridColumns: 4 },
    { property: 'uf', label: 'UF', gridColumns: 4 },
    { property: 'cep', label: 'CEP', gridColumns: 4 },
    { property: 'rua', label: 'Rua', gridColumns: 4 },
    { property: 'numero', label: 'Numero', gridColumns: 4 },
    { property: 'complemento', label: 'Complemento', gridColumns: 4 }
  ];
  proprietario: Proprietario
  aux: any;
  idProprietario: number;

  constructor(
    private proprietarioService: ProprietarioService,
    private animalService: AnimaisService,
    private cpfCnpj: CpfCnpjPipe,
    private dataPipe: DataPipe,
    private phonePipe: PhonePipe,
    private cepPipe: CepPipe,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  editar(): void {
    this.router.navigate(['/proprietarios/edit/' + this.proprietario.id])
  }
  visualizarAnimais(): void {
    this.router.navigate(['/proprietarios/view/animais/' + this.idProprietario])
  }

  ngOnInit(): void {
    this.pegarIdProproetario();
    this.buscarProprietario();

  }

  buscarProprietario(): void {
    this.proprietarioService.recuperarPorId(this.idProprietario).pipe(map(response => {
      response.dataCadastro = this.dataPipe.transform(response.dataCadastro)
      response.cep = this.cepPipe.transform(response.cep)
      response.cpf = this.cpfCnpj.transform(response.cpf)
      response.telefone = this.phonePipe.transform(response.telefone)
      if (response.sexo) {
        response.sexo = response.sexo.toString().toUpperCase()
      }

      return response
    })).subscribe((response) => {
      this.aux = response;
      this.proprietario = {
        ...this.aux
      }
    })


  }
  recuperarAnimais() {

  }
  pegarIdProproetario(): void {
    this.idProprietario = this.route.snapshot.params['id'];
  }


}
