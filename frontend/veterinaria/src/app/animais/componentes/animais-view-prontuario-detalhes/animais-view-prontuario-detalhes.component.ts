import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PoDynamicViewField } from '@po-ui/ng-components';
import { ConsultasService } from 'src/app/consultas/services/consultas.service';

@Component({
  selector: 'app-animais-view-prontuario-detalhes',
  templateUrl: './animais-view-prontuario-detalhes.component.html',
  styleUrls: ['./animais-view-prontuario-detalhes.component.css']
})
export class AnimaisViewProntuarioDetalhesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private consultaService: ConsultasService
  ) { }

  formulario: FormGroup;
  idConsulta: number;

  ngOnInit(): void {
    this.pegarIdConsulta();
    this.recuperarConsulta();
  }
  pegarIdConsulta(): void {
    this.idConsulta = this.route.snapshot.params['id']

  }
  recuperarConsulta() {
    this.consultaService.recuperarPorId(this.idConsulta)
      .subscribe(response => {
        console.log(response)
        this.consulta = {
          ...response,
          nomeAnimal: response.animal.nome,
          nomeVeterinario: response.veterinario.nome,
        }
        this.observacao = response.observacao;
        this.queixa = response.queixa;
        this.procedimentoRealizado = response.procedimento;
        this.receita = response.receita;

      })
  }

  campos: Array<PoDynamicViewField> = [
    { property: 'nomeAnimal', label: 'Nome Animal', divider: 'Dados da consulta', gridColumns: 4, order: 1 },
    { property: 'nomeVeterinario', label: 'Nome Veterinário', gridColumns: 4, order: 2 },
    { property: 'dataRealizacao', label: 'Data de Realização', gridColumns: 4, order: 3 },
    { property: 'estadoAnimal', label: 'Estado do Animal', divider: 'Situação do Animal', gridColumns: 4, },
    { property: 'ferimento', label: 'Ferimento', gridColumns: 4, },
    { property: 'dores', label: 'Dores', gridColumns: 4 },
    { property: 'febre', label: 'Febre', gridColumns: 4, }



  ];
  consulta = {
  }
  procedimentoRealizado: any;
  receita: any;
  queixa: any;
  observacao: any;
}

