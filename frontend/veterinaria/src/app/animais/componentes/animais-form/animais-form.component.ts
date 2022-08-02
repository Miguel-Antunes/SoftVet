import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoNotificationService } from '@po-ui/ng-components';
import { map } from 'rxjs';
import { ProprietarioService } from 'src/app/proprietarios/services/proprietario.service';
import { AnimaisService } from '../../services/animais.service';

@Component({
  selector: 'app-animais-form',
  templateUrl: './animais-form.component.html',
  styleUrls: ['./animais-form.component.css']
})
export class AnimaisFormComponent implements OnInit {


  proprietarios: any[];
  formulario: FormGroup;
  validacao_campo: boolean = false;
  erros: any;

  constructor(
    private formBuilder: FormBuilder,
    private proprietarioService: ProprietarioService,
    private notificationService: PoNotificationService,
    private service: AnimaisService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.configurarFormulario();
    this.buscarProprietario();
  }

  configurarFormulario(): void {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.maxLength(150)]],
      proprietario: [null, [Validators.required]],
      idade: [null],
      sexo: [null],
      especie: [null, [Validators.required, Validators.maxLength(100)]],
      raca: [null, [Validators.required, Validators.maxLength(100)]],
      cor: [null, [Validators.required, Validators.maxLength(50)]],
      altura: [null, [Validators.required, Validators.max(1000)]],
      peso: [null, [Validators.required, Validators.max(5000)]],
      tipoSangue: [null, [Validators.maxLength(3)]]
    })
  }
  buscarProprietario(): void {
    this.proprietarioService.recuperarTodos().pipe(
      map((proprietario: any) => {
        return proprietario.map((item: any) => {
          return {
            label: item.nome,
            value: { "id": item.id }
          }
        })
      }
      )).subscribe(response => {
        this.proprietarios = response;
        console.log(response)
      });
  }
  removerNumeros(campo: string) {
    let valor: string;
    valor = this.formulario.get(campo).value.replace(/[0-9]/g, '');
    this.formulario.get(campo).setValue(valor);
  }

  onSubmit() {
    for (const campo in this.formulario.value) {
      this.formulario.get(campo).markAsDirty();
    }
    if (!this.formulario.valid) {
      this.notificationService.setDefaultDuration(2000);
      this.notificationService.warning('Preencha os campos obrigatórios!');
    } else {
      console.log(this.formulario.value)
      this.service.cadastrar(this.formulario.value).subscribe((response) => {
        console.log(response);
        this.notificationService.success("Cadastrado com sucesso!");
        this.router.navigate(['animais/list']);

      }
      )
    }
  }
  cancelar(): void {
    location.reload();
  }
}
