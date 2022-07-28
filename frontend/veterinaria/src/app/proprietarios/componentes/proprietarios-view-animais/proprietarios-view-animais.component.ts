import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {
  PoListViewAction,
  PoModalComponent, PoPageAction,
  PoPageFilter
} from '@po-ui/ng-components';
import { SamplePoListViewHiringProcessesService } from '../../services/sample-po-list-view-hiring-processes-service.service';

@Component({
  selector: 'app-proprietarios-view-animais',
  providers: [SamplePoListViewHiringProcessesService],
  templateUrl: './proprietarios-view-animais.component.html',
  styleUrls: ['./proprietarios-view-animais.component.css']
})
export class ProprietariosViewAnimaisComponent implements OnInit {

  constructor(
    private hiringProcessesService: SamplePoListViewHiringProcessesService,
    private route: ActivatedRoute
  ) { }

  pegarIdProprietario(): void {
    this.idProprietario = this.route.snapshot.params['id']
  }
  ngOnInit(): void {
    this.pegarIdProprietario();
    this.animais = this.hiringProcessesService.getItems();
    this.animaisFiltrado = [...this.animais];
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
    placeholder: 'Search'
  };
  formatTitle(item) {
    return `Tótó`;
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
