import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { AgendamentosService } from 'src/app/agendamentos/services/agendamentos.service';
import { AnimaisService } from 'src/app/animais/services/animais.service';
import { VeterinariosService } from 'src/app/veterinarios/services/veterinarios.service';


@Component({
  selector: 'app-consultas-form',
  templateUrl: './consultas-form.component.html',
  styleUrls: ['./consultas-form.component.css']
})
export class ConsultasFormComponent implements OnInit {
  formulario: FormGroup
  animais: any[];
  veterinarios: any[];
  agendado: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private agendamentoService: AgendamentosService,
    private animalService: AnimaisService,
    private veterinarioService: VeterinariosService
  ) { }

  ngOnInit(): void {
    this.configurarFormulario();
    this.buscarAnimal();
    this.buscarAgendamento();
    this.buscarVeterinario();



  }
  configurarFormulario(): void {
    this.formulario = this.formBuilder.group({
      animal: [null],
      veterinario: [null],
      dataAgendamento: [],
      estadoAnimal: [null],
      ferimento: [null],
      dores: [null],
      febre: [null],
      queixa: [null],
      observacao: [null],
      procedimento: [null],
      receita: [null],
      situacao: []
    })
  }
  onSubmit(): void {
    console.log({
      id: this.formulario.get("animal").value
    })
  }
  cancelar(): void {

  }

  buscarAgendamento(): void {
    this.agendamentoService.recuperarPorId(7).subscribe((response) => {
      console.log(response)
    })
  }
  buscarAnimal(): void {
    let label: any;
    this.animalService.recuperarTodos()
      .pipe(
        map((response: any) => {
          return response.map((item: any) => {
            return {
              value: item.id, label: item.nome
            }
          })
        }
        ))
      .subscribe((response) => {
        this.animais = response;
        console.log(this.animais)
      })
  }

  buscarVeterinario(): void {
    this.veterinarioService.recuperarTodos().pipe(map(
      (response) => {
        return response.map((item) => {
          return {
            value: item.id, label: item.nome
          }
        })

      }
    )).subscribe((response) => {
      this.veterinarios = response;
    })
  }


}

