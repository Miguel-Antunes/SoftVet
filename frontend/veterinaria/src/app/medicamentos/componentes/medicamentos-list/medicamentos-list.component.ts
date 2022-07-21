import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Medicamento } from '../../interfaces/Medicamento';
import { MedicamentosService } from '../../services/medicamentos.service';

@Component({
  selector: 'app-medicamentos-list',
  templateUrl: './medicamentos-list.component.html',
  styleUrls: ['./medicamentos-list.component.css']
})
export class MedicamentosListComponent implements OnInit {


  breadCrumb: PoBreadcrumb = {
    items: [{ label: 'Listagem de Medicamentos', link: 'medicamentos-list' }]
  }

  actions: Array<PoPageAction> = [{
    label: 'Registrar',
    action: () => this.registraMedicamentos()
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

  medicamentos: Medicamento[];

  readonly columns: PoTableColumn[] = [
    {
      property: 'id',
      label: 'Código',
      type: 'number',
      width: '5%',
    },
    {
      property: 'descricao',
      label: 'Descrição',
      width: '25%'
    },
    {
      property: 'fabricante',
      label: 'Fabricante',
      width: '15%'
    },
    {
      property: 'quantidade',
      label: 'Quantidade',
      width: '20%'

    },
    {
      property: 'unidade',
      label: 'Unidade',
      width: '30%'
    }
  ];

  constructor(public router: Router, public activatedRoute: ActivatedRoute, private medicamentoService: MedicamentosService) { }

  ngOnInit(): void {

    this.medicamentoService.recuperarTodos().subscribe(response => {
      this.medicamentos = response;
    })


  }
  mostrarDados(): any {
  }

  registraMedicamentos() {
    this.router.navigate(['medicamentos-form'])
  }

}