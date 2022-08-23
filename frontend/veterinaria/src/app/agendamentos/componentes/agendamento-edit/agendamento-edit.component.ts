import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { map } from 'rxjs';
import { AnimaisService } from 'src/app/animais/services/animais.service';
import { VeterinariosService } from 'src/app/veterinarios/services/veterinarios.service';
import { AgendamentosService } from '../../services/agendamentos.service';

@Component({
  selector: 'app-agendamento-edit',
  templateUrl: './agendamento-edit.component.html',
  styleUrls: ['./agendamento-edit.component.css']
})
export class AgendamentoEditComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private agendamentoService: AgendamentosService,
    private animalService: AnimaisService,
    private veterinarioService: VeterinariosService,
    private notificationService: PoNotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.pegarIdAgendamento();
    this.recuperarAnimais();
    // this.recuperarVeterinarios();
    // this.recuperarAgendamento();
    this.configurarFormulario();
  }
  aux: any;
  idVeterinario: number;
  idAgendamento: number;
  formulario: FormGroup;
  animais: any[];
  veterinarios: any[];
  prioridade: any = [
    { label: " Baixa", value: "baixa" },
    { label: " Moderada", value: "moderada" },
    { label: "Alta", value: "alta" },
  ]

  pegarIdAgendamento(): void {
    this.idAgendamento = this.route.snapshot.params['id']
  }
  recuperarAgendamento(): void {
    this.agendamentoService.recuperarPorId(this.idAgendamento).pipe(map(agendamento => {
      return agendamento
    }))
      .subscribe(response => {
        this.formulario.patchValue({
          descricao: response.descricao,
          animal: response.animal.id,
          prioridade: response.prioridade,
          dataRealizacao: response.dataRealizacao
        })
        if (response.veterinario) {
          this.formulario.patchValue({
            veterinario: response.veterinario.id
          })
        }
      })
  }

  configurarFormulario(): void {
    this.formulario = this.formBuilder.group({
      descricao: [null, [Validators.required, Validators.maxLength(40)]],
      animal: [null, Validators.required],
      veterinario: [null, Validators.required],
      prioridade: [null, Validators.required],
      dataRealizacao: [null, Validators.required]

    });
  }

  recuperarAnimais(): void {
    this.animalService.recuperarTodos().pipe(map(animais => {
      return animais.map(animal => {
        return {
          label: animal.nome,
          value: animal.id
        }

      })
    })).subscribe(animais => {
      this.animais = animais;
      this.recuperarVeterinarios();
    })
  }
  recuperarVeterinarios(): void {
    this.veterinarioService.recuperarTodos().pipe(map(veterinarios => {
      return veterinarios.map(veterinario => {
        return {
          label: veterinario.nome,
          value: veterinario.id
        }

      })
    })).subscribe(veterinario => {
      this.veterinarios = veterinario;
      this.recuperarAgendamento();
    })
  }
  cancelar(): void {
    this.router.navigate(['/agendamentos/view'])
  }
  onSubmit(): void {

    for (const campo in this.formulario.value) {
      this.formulario.get(campo).markAsDirty();
    }
    if (!this.formulario.valid) {
      this.notificationService.setDefaultDuration(2000);
      this.notificationService.warning('Preencha os campos obrigatórios!');

    } else {
      let veterinario = this.formulario.get('veterinario').value
      this.formulario.get('veterinario').setValue({ id: veterinario })
      let animal = this.formulario.get('animal').value
      this.formulario.get('animal').setValue({ id: animal })


      this.agendamentoService.editar(this.idAgendamento, this.formulario.value).subscribe(response => {
        console.log(response)
        this.notificationService.setDefaultDuration(3000)
        this.notificationService.success("Agendamento editado com sucesso!")
        this.router.navigate(['/agendamentos/view'])
      })
    }
  }

}
