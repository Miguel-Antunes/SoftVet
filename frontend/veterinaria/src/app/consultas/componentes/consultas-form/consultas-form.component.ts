import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { map } from 'rxjs';
import { AnimaisService } from 'src/app/animais/services/animais.service';
import { VeterinariosService } from 'src/app/veterinarios/services/veterinarios.service';
import { ConsultasService } from '../../services/consultas.service';


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
    private animalService: AnimaisService,
    private veterinarioService: VeterinariosService,
    private consultaService: ConsultasService,
    private router: Router,
    private notificationService: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.configurarFormulario();
    this.buscarAnimal();
    this.buscarVeterinario();



  }
  configurarFormulario(): void {
    this.formulario = this.formBuilder.group({
      animal: [null, Validators.required],
      veterinario: [null, Validators.required],
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


    for (const campo in this.formulario.value) {
      this.formulario.get(campo).markAsDirty();
    }
    if (!this.formulario.valid) {
      this.notificationService.setDefaultDuration(2000);
      this.notificationService.warning('Preencha os campos obrigatórios!');

    } else {
      let idAnimal = this.formulario.get("animal").value;
      this.formulario.get("animal").patchValue({
        id: idAnimal
      })
      let idVeterinario = this.formulario.get("veterinario").value;
      this.formulario.get("veterinario").patchValue({
        id: idVeterinario
      })
      this.consultaService.cadastrarConsulta(this.formulario.value).subscribe(response => {

        this.router.navigate(['consultas/view/' + response.id])
      })


    }
  }
  cancelar(): void {

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

