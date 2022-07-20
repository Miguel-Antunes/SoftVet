import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Proprietario } from '../../interfaces/proprietario';
import { ProprietarioService } from '../../services/proprietario.service';

@Component({
  selector: 'app-proprietarios-list',
  templateUrl: './proprietarios-list.component.html',
  styleUrls: ['./proprietarios-list.component.css']
})
export class ProprietariosListComponent implements OnInit {

  breadCrumb: PoBreadcrumb = {
    items: [{ label: 'Listagem de Proprietários', link: 'proprietarios-list' }]
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

  proprietarios: Proprietario[];

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

  constructor(public router: Router, public activatedRoute: ActivatedRoute, private proprietarioService : ProprietarioService) { }

  ngOnInit(): void {

    this.proprietarioService.recuperarTodos().subscribe(response => {
      this.proprietarios = response;
    })

    // this.veterinarios = [{
    //   id: '1',
    //   nome: 'Giulia',
    //   cpf: '45897780846',
    //   telefone: '18997212406',
    //   email: 'giulialazaro01@gmail.com'
    // },
    // {
    //   id: '2',
    //   nome: 'Joao',
    //   cpf: '45897780846',
    //   telefone: '5518997212406',
    //   email: 'giulialazaro01@gmail.com'
    // }]

  }
  mostrarDados(): any {
  }

  registrarProprietario() {
    this.router.navigate(['proprietarios-form'])
  }

}
