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

  proprietarios: Proprietario[];


  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private proprietarioService: ProprietarioService,

  ) { }

  ngOnInit(): void {
    this.recuperarVeterinarios();
  }

  breadCrumb: PoBreadcrumb = {
    items: [{ label: 'Listagem de Proprietários', link: 'proprietarios/list' }]
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
      label: 'Visualizar',
      action: this.visualizar.bind(this)
    },
    {
      label: 'Visualizar Animais',
      action: this.visualizarAnimais.bind(this)
    }
  ]
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

  visualizarAnimais(proprietario: any): void {
    this.router.navigate(['/proprietarios/view/animais/' + proprietario.id])
  }
  visualizar(proprietario: any): void {
    this.router.navigate(['/proprietarios/view/' + proprietario.id])
  }
  editar(proprietario: any): void {
    this.router.navigate(['/proprietarios/edit/' + proprietario.id])
  }
  registrarProprietario() {
    this.router.navigate(['proprietarios/form'])
  }


  recuperarVeterinarios(): void {
    this.proprietarioService.recuperarTodos().subscribe(response => {
      this.proprietarios = response;
    })
  }
}
