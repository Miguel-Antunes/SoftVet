import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Agendamento } from '../../interfaces/Agendamento';
import { AgendamentosService } from '../../services/agendamentos.service';

@Component({
  selector: 'app-agendamentos-list',
  templateUrl: './agendamentos-list.component.html',
  styleUrls: ['./agendamentos-list.component.css']
})
export class AgendamentosListComponent implements OnInit {

  breadCrumb: PoBreadcrumb = {
    items: [{ label: 'Listagem de Agendamentos', link: 'agendamentos-list' }]
  }

  actions: Array<PoPageAction> = [{
    label: 'Registrar',
    action: () => this.registrarProprietario()
  }]

  actionsTable: PoTableAction[] = [
    {
      label: 'Alterar',
      action: null
    },
    {
      label: 'Excluir',
      action: null
    }
  ]

  agendamentos: Agendamento[];

  readonly columns: PoTableColumn[] = [
    {
      property: 'prioridade',
      type: "label",
      width: '10%',
      labels: [
        { value: 'baixa', color: 'color-2', label: 'baixa' },
        { value: 'moderada', color: 'color-08', label: 'moderada' },
        { value: 'alta', color: 'color-07', label: 'alta' }
      ]


      // color: (row, column) => {
      //   return row[column] == 'baixa' ? 'color-09' : row[column] == 'moderada' ? 'color-08' : 'color-07'
      // }
    },
    {
      property: 'descricao',
      label: 'Descrição',
      width: '15%',
    },
    {
      property: 'animal.nome',
      label: 'Animal',
      width: '20%'
    },
    {
      property: 'animal.proprietario.nome',
      label: 'Proprietário',
      width: '20%'
    },
    {
      property: 'veterinario.nome',
      label: 'Veterinario',
      width: '20%'

    },
    {
      property: 'dataRealizacao',
      label: 'Data de Realização',
      width: '10%',
      type: 'columnTemplate'
    }
  ];

  constructor(public router: Router, public activatedRoute: ActivatedRoute, private agendamentoService: AgendamentosService) { }

  ngOnInit(): void {

    this.agendamentoService.recuperarTodos().subscribe(response => {
      this.agendamentos = response;
    })

  }
  mostrarDados(): any {
  }

  registrarProprietario() {
    this.router.navigate(['proprietarios-form'])
  }
}