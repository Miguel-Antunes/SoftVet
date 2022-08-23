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
    items: [{ label: 'Listagem de Agendamentos', link: 'agendamentos/list' }]
  }

  actions: Array<PoPageAction> = [{
    label: 'Registrar',
    action: () => this.registrarProprietario()
  }]

  actionsTable: PoTableAction[] = [
    {
      label: 'Alterar',
      action: this.editar.bind(this)
    },
    {
      label: 'Excluir',
      action: this.excluir.bind(this)
    },
    {
      label: 'Visualizar',
      action: this.visualizar.bind(this)
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
    this.router.navigate(['agendamentos/form'])
  }

  editar(agendamento: Agendamento) {
    this.router.navigate([`../../agendamentos/edit/${agendamento.id}`])
  }
  visualizar(agendamento: Agendamento): void {
    this.router.navigate(['agendamentos/detalhe/' + agendamento.id])
  }
  excluir(agendamento: Agendamento): void {
    if (confirm("Deseja excluir o agendamento " + agendamento.descricao + "?")) {
      this.agendamentoService.deletar(agendamento.id).subscribe((response) => {
        location.reload();
      })
    }
  }
}