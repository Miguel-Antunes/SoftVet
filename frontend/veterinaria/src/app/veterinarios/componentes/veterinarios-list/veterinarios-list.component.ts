import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Veterinario } from '../../interfaces/veterinario';

@Component({
  selector: 'app-veterinarios-list',
  templateUrl: './veterinarios-list.component.html',
  styleUrls: ['./veterinarios-list.component.css']
})
export class VeterinariosListComponent implements OnInit {

  breadCrumb: PoBreadcrumb = {
    items: [{ label: 'Listagem de Veterinários', link: 'veterinarios-list' }, { label: 'Registar Veterinário', link: '' }]
  }

  actions: Array<PoPageAction> = [{
    label: 'Registrar',
    action: () => this.registrarVeterinario()
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

  veterinarios: any;

  readonly columns: PoTableColumn[] = [
    {
      property: 'id',
      label: 'Código',
      type: 'number',
      width: '5%',
    },
    {
      property: 'nome',
      label: 'Nome',
      width: '25%'
    },
    {
      property: 'cpf',
      label: 'CPF',
      width: '15%',
      type: 'columnTemplate'
    },
    {
      property: 'telefone',
      label: 'Telefone',
      width: '20%',
      type: 'columnTemplate'

    },
    {
      property: 'email',
      label: 'E-mail',
      width: '30%'
    }
  ];

  constructor(public router: Router, public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.veterinarios = [{
      id: '1',
      nome: 'Giulia',
      cpf: '45897780846',
      telefone: '18997212406',
      email: 'giulialazaro01@gmail.com'
    },
    {
      id: '2',
      nome: 'Joao',
      cpf: '45897780846',
      telefone: '5518997212406',
      email: 'giulialazaro01@gmail.com'
    }]

  }
  mostrarDados(): any {



  }

  registrarVeterinario() {
    this.router.navigate(['veterinarios-form'])
  }

}
