import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Consulta } from '../../interfaces/Consulta';
import { ConsultasService } from '../../services/consultas.service';

@Component({
  selector: 'app-consultas-list',
  templateUrl: './consultas-list.component.html',
  styleUrls: ['./consultas-list.component.css']
})
export class ConsultasListComponent implements OnInit {

  constructor(
    private router: Router,
    private consultaService: ConsultasService
  ) { }

  ngOnInit(): void {
    this.recuperarConsultas();

  }

  consultas: Consulta[];

  breadCrumb: PoBreadcrumb = {
    items: [{ label: 'Listagem de Consultas', link: 'consultas/list' }]
  }

  actions: Array<PoPageAction> = [{
    label: 'Registrar',
    action: () => this.registrarConsultas()
  }]

  actionsTable: PoTableAction[] = [

    {
      label: 'Visualizar',
      action: this.visualizarConsulta.bind(this)
    }
  ]

  visualizarConsulta(consulta: Consulta): void {
    this.router.navigate(['/consultas/view/' + consulta.id])
  }

  readonly columns: PoTableColumn[] = [
    {
      property: 'id',
      label: 'Código',
      type: 'number',
      width: '5%',
    },
    {
      property: 'dataRealizacao',
      label: 'Data Realizada',
      width: '10%',
      type: 'columnTemplate'
    },
    {
      property: 'veterinario.nome',
      label: 'Veterinário',
      width: '15%'
    },
    {
      property: 'animal.nome',
      label: 'Animal',
      width: '15%'

    },
    {
      property: 'animal.especie',
      label: 'Espécie',
      width: '15%'
    },
    {
      property: 'animal.raca',
      label: 'Raça',
      width: '15%'
    },
    {
      property: 'animal.proprietario.nome',
      label: ' Proprietário',
      width: '20%'

    },
  ];

  registrarConsultas(): void {
    this.router.navigate(['consultas/form'])
  }

  recuperarConsultas(): void {
    this.consultaService.recuperarTodas().subscribe((response) => {
      this.consultas = response;
      console.log(response)
    })
  }


}
