import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Animal } from '../../interfaces/animal';
import { AnimaisService } from '../../services/animais.service';

@Component({
  selector: 'app-animais-list',
  templateUrl: './animais-list.component.html',
  styleUrls: ['./animais-list.component.css']
})
export class AnimaisListComponent implements OnInit {


  breadCrumb: PoBreadcrumb = {
    items: [{ label: 'Listagem de Animais', link: 'animais-list' }]
  }

  actions: Array<PoPageAction> = [{
    label: 'Registrar',
    action: () => this.registrarAnimal()
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

  animais: Animal[];

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
      property: 'proprietario.nome',
      label: 'Nome do Proprietário',
      width: '15%'
    },
    {
      property: 'raca',
      label: 'Raça',
      width: '20%'

    },
    {
      property: 'cor',
      label: 'Cor',
      width: '30%'
    }
  ];

  constructor(public router: Router, public activatedRoute: ActivatedRoute, private animaisService: AnimaisService) { }

  ngOnInit(): void {

    this.animaisService.recuperarTodos().subscribe(response => {
      this.animais = response;
    })


  }
  mostrarDados(): any {
  }

  registrarAnimal() {
    this.router.navigate(['animais-form'])
  }

  teste() {
    console.log(this.animais)
  }
}
