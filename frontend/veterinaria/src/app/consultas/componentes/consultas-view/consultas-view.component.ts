import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoDynamicViewField } from '@po-ui/ng-components';
import { map } from 'rxjs';
import { DataPipe } from 'src/app/shared/pipes/data.pipe';
import { ConsultasService } from '../../services/consultas.service';

@Component({
  selector: 'app-consultas-view',
  providers: [DataPipe],
  templateUrl: './consultas-view.component.html',
  styleUrls: ['./consultas-view.component.css']
})
export class ConsultasViewComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private consultaService: ConsultasService,
    private dataPipe: DataPipe,
    private router: Router
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
    this.consultaService.recuperarPorId(this.idConsulta).pipe(map(response => {

      response.dataRealizacao = this.dataPipe.transform(response.dataRealizacao)

      return response;
    }))
      .subscribe(response => {

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

  imprimirReceita(): void {
    this.router.navigate(['/consultas/view/receita/' + this.idConsulta])
  }
}

