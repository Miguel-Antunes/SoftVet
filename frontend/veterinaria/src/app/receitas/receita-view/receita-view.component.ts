import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ConsultasService } from 'src/app/consultas/services/consultas.service';

@Component({
  selector: 'app-receita-view',
  providers: [DatePipe],
  templateUrl: './receita-view.component.html',
  styleUrls: ['./receita-view.component.css']
})
export class ReceitaViewComponent implements OnInit {
  idConsulta: number;
  dataRealizacao: string;
  nomeAnimal: string;
  nomeProprietario: string;
  nomeVeterinario: string;
  receita: string;

  constructor(
    private route: ActivatedRoute,
    private consultaService: ConsultasService,
    private dataPipe: DatePipe,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pegarIdConsulta();
    this.buscaConsulta();

  }

  pegarIdConsulta(): void {
    this.idConsulta = this.route.snapshot.params['id']
  }
  buscaConsulta(): void {
    this.consultaService.recuperarPorId(this.idConsulta)
      .subscribe(response => {
        this.dataRealizacao = this.dataPipe.transform(response.dataRealizacao);
        this.nomeAnimal = response.animal.nome;
        this.nomeProprietario = response.animal.proprietario.nome;
        this.nomeVeterinario = response.veterinario.nome;
        this.receita = response.receita;


        console.log(response)
      })
  }

  voltar(): void {
    this.router.navigate(['/consultas/view/' + this.idConsulta])

  }
  imprimir(): void {
    window.print();
  }
}
