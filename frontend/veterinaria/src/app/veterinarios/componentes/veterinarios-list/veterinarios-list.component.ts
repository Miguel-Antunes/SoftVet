import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Veterinario } from '../../interfaces/veterinario';
import { VeterinariosService } from '../../services/veterinarios.service';

@Component({
  selector: 'app-veterinarios-list',
  templateUrl: './veterinarios-list.component.html',
  styleUrls: ['./veterinarios-list.component.css']
})
export class VeterinariosListComponent implements OnInit {

  veterinarios: Veterinario[];
  roleAdmin: boolean;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private veterinarioService: VeterinariosService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.roleAdmin = this.auth.obterRoleAdmin();
    this.verificaRole();
    this.recuperarVeterinarios();
  }


  breadCrumb: PoBreadcrumb = {
    items: [{ label: 'Listagem de Veterinários', link: 'veterinarios/list' }, { label: 'Registar Veterinário', link: '' }]
  }

  actions: Array<PoPageAction> = [{
    label: 'Registrar',
    action: () => this.registrarVeterinario()
  }]

  actionsTable: PoTableAction[] = [
    {
      label: 'Visualizar',
      action: this.visualizar.bind(this)
    }
  ]

  visualizar(value: any): void {
    this.router.navigate(['/veterinarios/view/', value.id])
  }
  editar(veterinario: any): void {
    this.router.navigate(['/veterinarios/edit/' + veterinario.id])
  }



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
      width: '25%'
    },
    {
      property: 'situacao',
      type: 'label',
      width: '10%',
      label: 'Situação',
      labels: [
        { value: 'Inativo', color: 'color-07', label: 'Inativo' },
        { value: 'Ativo', color: 'color-10', label: 'Ativo' }
      ]
    }
  ];


  recuperarVeterinarios(): void {
    this.veterinarioService.recuperarTodos().subscribe(response => {
      this.veterinarios = response;
    })
  }

  registrarVeterinario() {
    this.router.navigate(['veterinarios/form'])
  }

  verificaRole(): void {
    if (this.roleAdmin == true) {
      this.actionsTable = [
        ...this.actionsTable,

        {
          label: 'Alterar',
          action: this.editar.bind(this)
        },
      ]
    }

  }

}
