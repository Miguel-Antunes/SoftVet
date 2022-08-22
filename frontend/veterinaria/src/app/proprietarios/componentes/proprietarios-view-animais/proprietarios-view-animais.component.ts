import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoListViewAction, PoPageAction, PoPageFilter } from '@po-ui/ng-components';
import { AnimaisService } from 'src/app/animais/services/animais.service';


@Component({
  selector: 'app-proprietarios-view-animais',
  templateUrl: './proprietarios-view-animais.component.html',
  styleUrls: ['./proprietarios-view-animais.component.css']
})
export class ProprietariosViewAnimaisComponent implements OnInit {

  constructor(

    private route: ActivatedRoute,
    private animalService: AnimaisService
  ) { }

  pegarIdProprietario(): void {
    this.idProprietario = this.route.snapshot.params['id']
  }

  recuperarAnimaisPorProprietario(): void {
    this.animalService.recuperarAnimalPorProprietario(this.idProprietario).subscribe(response => {
      this.animais = response;
    })
  }

  ngOnInit(): void {

    this.pegarIdProprietario();
    this.recuperarAnimaisPorProprietario();

    setTimeout(() => {
      this.animaisFiltrado = [...this.animais];
      console.log(this.animais)
    }, 300);

  }

  animais: Array<any>;
  animaisFiltrado: Array<object>;
  labelFilter: string = '';
  modalDetail: boolean = false;
  selectedActionItem = {};
  idProprietario: number;

  readonly actions: Array<PoListViewAction> = [];

  readonly pageActions: Array<PoPageAction> = [

  ];

  readonly filterSettings: PoPageFilter = {
    action: this.filtroAnimais.bind(this),
    placeholder: 'Pesquisar'
  };
  formatTitle(item) {
    return item.nome;
  }


  private filtroAnimais(labelFilter: string | Array<string>) {
    const filters = typeof labelFilter === 'string' ? [labelFilter] : [...labelFilter];

    this.animaisFiltrado = this.animais.filter(item =>
      Object.keys(item).some(key => !(item[key] instanceof Object) && this.includeFilter(item[key], filters))
    );
  }

  private includeFilter(item, filters) {
    return filters.some(filter => String(item).toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  }

}
