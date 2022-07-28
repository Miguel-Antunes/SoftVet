import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoModalComponent, PoNotificationService } from '@po-ui/ng-components';
import { map } from 'rxjs';
import { AnimaisService } from 'src/app/animais/services/animais.service';
import { VeterinariosService } from 'src/app/veterinarios/services/veterinarios.service';
import { AgendamentosService } from '../../services/agendamentos.service';

@Component({
  selector: 'app-agendamento-edit',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './agendamento-edit.component.html',
  styleUrls: ['./agendamento-edit.component.css']
})
export class AgendamentoEditComponent implements OnInit {

  @ViewChild("modal", { static: true }) modal: PoModalComponent
  teste = "aaaa";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private agendamentoService: AgendamentosService,
    private animalService: AnimaisService,
    private veterinarioService: VeterinariosService,
    private notificationService: PoNotificationService

  ) { }

  ngOnInit(): void {
    this.params();
    this.recuperaragendamento();
    this.recuperarAnimais();
    this.recuperarVeterinarios();

    this.configurarFormulario()
  }
  formulario: FormGroup;
  idAgendamento: number;

  animais: any[];
  veterinarios: any[];

  prioridade: any = [
    { label: " Baixa", value: "baixa" },
    { label: " Moderada", value: "moderada" },
    { label: "Alta", value: "alta" },


  ]

  params(): void {
    this.idAgendamento = this.route.snapshot.params["id"]
  }

  recuperarAnimais(): void {
    this.animalService.recuperarTodos().pipe(map(
      (response) => {
        return response.map(item => {
          return {
            label: item.nome,
            value: item.id
          }
        })
      })).subscribe(response => {

        this.animais = response;

      })
  }
  recuperarVeterinarios(): void {
    this.veterinarioService.recuperarTodos().pipe(map((response => {
      return response.map((item) => {
        return {
          label: item.nome,
          value: item.id
        }
      })
    }))).subscribe((response) => {
      this.veterinarios = response;

    })
  }
  recuperaragendamento(): void {

    this.agendamentoService.recuperarPorId(this.idAgendamento).subscribe((response) => {
      this.formulario.get("descricao").setValue(response.descricao)

      setTimeout(() => {
        this.formulario.get("animal").setValue(response.animal.id)
        this.formulario.get("veterinario").setValue(response.veterinario.id)
        this.formulario.get("prioridade").setValue(response.prioridade)
        this.formulario.get("dataRealizacao").setValue(response.dataRealizacao)
      }, 400);
    })
  }

  configurarFormulario(): void {
    this.formulario = this.formBuilder.group({
      id: [null],
      descricao: [null, [Validators.required, Validators.maxLength(40)]],
      animal: [null, Validators.required],
      veterinario: [null],
      prioridade: [null, Validators.required],
      dataRealizacao: [null, Validators.required]

    });

  }
  onSubmit(): void {
    this.agendamentoService.editar(this.idAgendamento, this.formulario.value).subscribe(response => {
      this.notificationService.setDefaultDuration(3000)
      this.notificationService.success("Editado com sucesso!")
      this.router.navigate(['agendamentos/views'])
    })
  }
  cancelar(): void {
    this.router.navigate(['agendamentos/views'])
  }
}