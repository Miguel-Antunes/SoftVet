import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoListViewAction, PoPageAction, PoPageFilter } from '@po-ui/ng-components';
import { map } from 'rxjs';
import { ConsultasService } from 'src/app/consultas/services/consultas.service';
import { DataPipe } from 'src/app/shared/pipes/data.pipe';


@Component({
  selector: 'app-animais-view-prontuario',
  providers: [DataPipe],
  templateUrl: './animais-view-prontuario.component.html',
  styleUrls: ['./animais-view-prontuario.component.css']
})
export class AnimaisViewProntuarioComponent implements OnInit {


  constructor(

    private route: ActivatedRoute,
    private consultaService: ConsultasService,
    private dataPipe: DataPipe,
    private router: Router

  ) { }

  pegarIdAnimal(): void {
    this.idAnimal = this.route.snapshot.params['id']
  }

  recuperarConsultasPorAnimal(): void {
    this.consultaService.recuperarConsultaPorAnimal(this.idAnimal).pipe(map(response => {
      response.map(consulta => {
        consulta.dataRealizacao = this.dataPipe.transform(consulta.dataRealizacao)
      })
      return response;
    })).
      subscribe(response => {
        console.log(response)
        this.consultas = response;
      })

  }

  ngOnInit(): void {
    this.pegarIdAnimal();
    this.recuperarConsultasPorAnimal();

    setTimeout(() => {
      this.consultasFiltradas = [...this.consultas];
    }, 300);

  }


  consultas: Array<any> = [

  ];
  aux: any;
  consultasFiltradas: Array<object>;
  labelFilter: string = '';
  modalDetail: boolean = false;
  selectedActionItem = {};
  idAnimal: number;


  readonly actions: Array<PoListViewAction> = [];

  readonly pageActions: Array<PoPageAction> = [

  ];

  readonly filterSettings: PoPageFilter = {
    action: this.filtroAnimais.bind(this),
    placeholder: 'Pesquisar'
  };
  formatarTitulo(item) {
    return item.animal.nome;
  }


  private filtroAnimais(labelFilter: string | Array<string>) {
    const filters = typeof labelFilter === 'string' ? [labelFilter] : [...labelFilter];

    this.consultasFiltradas = this.consultas.filter(item =>
      Object.keys(item).some(key => !(item[key] instanceof Object) && this.includeFilter(item[key], filters))
    );
  }

  private includeFilter(item, filters) {
    return filters.some(filter => String(item).toLocaleLowerCase().includes(filter.toLocaleLowerCase()));
  }
  visualizarProntuario(idConsulta: number): void {
    this.router.navigate(['/consultas/view/' + idConsulta])
  }

}
