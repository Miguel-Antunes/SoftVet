import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';


import { map } from 'rxjs';
import { AgendamentosService } from 'src/app/agendamentos/services/agendamentos.service';
import { AnimaisService } from 'src/app/animais/services/animais.service';
import { VeterinariosService } from 'src/app/veterinarios/services/veterinarios.service';


@Component({
  selector: 'app-agendamento-form',
  templateUrl: './agendamento-form.component.html',
  styleUrls: ['./agendamento-form.component.css']
})
export class AgendamentoFormComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private agendamentoService: AgendamentosService,
    private animalService: AnimaisService,
    private veterinarioService: VeterinariosService,
    private notificationService: PoNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.configurarFormulario();
    this.recuperarAnimais();
    this.recuperarVeterinarios();
  }

  formulario: FormGroup;
  animais: any[];
  veterinarios: any[];
  prioridade: any = [
    { label: " Baixa", value: "baixa" },
    { label: " Moderada", value: "moderada" },
    { label: "Alta", value: "alta" },
  ]

  configurarFormulario(): void {
    this.formulario = this.formBuilder.group({
      descricao: [null, [Validators.required, Validators.maxLength(40)]],
      animal: [null, Validators.required],
      veterinario: [null],
      prioridade: [null, Validators.required],
      dataRealizacao: [null, Validators.required]

    });
  }

  recuperarAnimais(): void {
    this.animalService.recuperarTodos().pipe(map(animais => {
      return animais.map(animal => {
        return {
          label: animal.nome,
          value: { "id": animal.id }
        }

      })
    })).subscribe(animais => {
      this.animais = animais;
    })
  }
  recuperarVeterinarios(): void {
    this.veterinarioService.recuperarTodos().pipe(map(veterinarios => {
      return veterinarios.map(veterinario => {
        return {
          label: veterinario.nome,
          value: { "id": veterinario.id }
        }

      })
    })).subscribe(veterinario => {
      this.veterinarios = veterinario;
    })
  }

  onSubmit() {
    for (const campo in this.formulario.value) {
      this.formulario.get(campo).markAsDirty();
    }
    if (!this.formulario.valid) {
      this.notificationService.setDefaultDuration(2000);
      this.notificationService.warning('Preencha os campos obrigatórios!');

    } else {
      this.agendamentoService.cadastrar(this.formulario.value).subscribe((response) => {
        this.notificationService.setDefaultDuration(2000)
        this.notificationService.success("Cadastrado com sucesso!");
        this.router.navigate(['/agendamentos/view'])

        console.log(response);
      })
    }

  }
  cancelar(): void {
    this.router.navigate(['/agendamentos/view'])

  }

}
