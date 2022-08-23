import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { AgendamentosService } from 'src/app/agendamentos/services/agendamentos.service';
import { DataPipe } from 'src/app/shared/pipes/data.pipe';
import { ConsultasService } from '../../services/consultas.service';


@Component({
  selector: 'app-consultas-agendadas-form',
  providers: [DataPipe],
  templateUrl: './consultas-agendadas-form.component.html',
  styleUrls: ['./consultas-agendadas-form.component.css']
})
export class ConsultasAgendadasFormComponent implements OnInit {
  idAgendamento: number;
  formulario: FormGroup
  dataAgendamento: string;
  animal: string;
  veterinario: string;
  idAnimal: number;
  idVeterinario: number;

  constructor(
    private formBuilder: FormBuilder,
    private agendamentoService: AgendamentosService,
    private consultaService: ConsultasService,
    private route: ActivatedRoute,
    private router: Router,
    private dataPipe: DataPipe,
    private notificationService: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.buscarIdAgendamento();
    this.configurarFormulario();
    this.buscarAgendamento();

  }
  buscarIdAgendamento(): void {
    this.idAgendamento = this.route.snapshot.params['id']
  }
  configurarFormulario(): void {
    this.formulario = this.formBuilder.group({
      animal: [null],
      veterinario: [null],
      estadoAnimal: [null, Validators.required],
      ferimento: [null, Validators.required],
      dores: [null, Validators.required],
      febre: [null, Validators.required],
      queixa: [null, Validators.required],
      observacao: [null],
      procedimento: [null, Validators.required],
      receita: [null]
    })
  }
  onSubmit(): void {
    console.log(this.formulario.value)

    for (const campo in this.formulario.value) {
      this.formulario.get(campo).markAsDirty();
    }
    if (!this.formulario.valid) {
      this.notificationService.setDefaultDuration(2000);
      this.notificationService.warning('Preencha os campos obrigatórios!');

    } else {
      this.formulario.get("animal").patchValue({
        id: this.idAnimal
      })
      this.formulario.get("veterinario").patchValue({
        id: this.idVeterinario
      })
      this.consultaService.cadastrarConsulta(this.formulario.value).subscribe(response => {
        console.log(response)
        this.router.navigate(['consultas/view/' + response.id])
      })


    }
  }
  cancelar(): void {
    this.router.navigate(['/agendamentos/detalhe/' + this.idAgendamento])

  }

  buscarAgendamento(): void {
    this.agendamentoService.recuperarPorId(this.idAgendamento).subscribe((response) => {
      this.dataAgendamento = this.dataPipe.transform(response.dataRealizacao);
      this.animal = response.animal.nome;
      this.veterinario = response.veterinario.nome;
      this.idAnimal = response.animal.id;
      this.idVeterinario = response.veterinario.id;
    })
  }

}

