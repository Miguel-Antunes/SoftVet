import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { BuscaCepService } from 'src/app/shared/services/busca-cep.service';
import { VeterinariosService } from 'src/app/veterinarios/services/veterinarios.service';


@Component({
  selector: 'app-veterinarios-form',
  templateUrl: './veterinarios-form.component.html',
  styleUrls: ['./veterinarios-form.component.css']
})
export class VeterinariosFormComponent implements OnInit {
  validacao_campo: boolean = false;
  formulario: FormGroup;
  erros: any;

  constructor(
    private service: VeterinariosService,
    private formBuilder: FormBuilder,
    private buscacep: BuscaCepService,
    private notificationService: PoNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.configurarFormulario();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.maxLength(150)]],
      cpf: [null, [Validators.required, Validators.maxLength(11)]],
      telefone: [null, [Validators.required, Validators.maxLength(11)]],
      dataNascimento: [null, Validators.required],
      email: [null, [Validators.email, Validators.maxLength(100)]],
      sexo: [null],
      cep: [null, [Validators.minLength(8), Validators.maxLength(8)]],
      uf: [null, [Validators.required, Validators.maxLength(2)]],
      cidade: [null, [Validators.required, Validators.maxLength(80)]],
      rua: [null, [Validators.required, Validators.maxLength(100)]],
      numero: [null, [Validators.required, Validators.maxLength(5)]],
      complemento: [null, Validators.maxLength(50)],
    });
  }

  buscaInfo() {
    this.validacao_campo = false;
    let cep: string = this.formulario.get('cep').value;
    let validacao_cep: boolean = /^([0-9]{5}[0-9]{3})$/.test(cep);

    if (validacao_cep === true) {
      this.buscacep.buscar(cep).subscribe((response: any) => {
        if (response.erro === undefined) {
          this.formulario.patchValue({
            uf: response.uf,
            cidade: response.localidade,
            rua: response.logradouro,
            complemento: response.complemento,
          });
          this.validacao_campo = true;
        } else {
          this.formulario.get('cep').setErrors({ incorrect: true });
        }
      });
    }
  }

  onSubmit() {
    for (const campo in this.formulario.value) {
      this.formulario.get(campo).markAsDirty();
    }
    if (!this.formulario.valid) {
      this.notificationService.setDefaultDuration(4000);
      this.notificationService.warning('Preencha os campos obrigatórios!');
    } else {
      this.service.cadastrar(this.formulario.value).subscribe((response) => {
        this.notificationService.success("Cadastrado com sucesso!");
        this.router.navigate(['veterinarios/list']);
        console.log(response);
      }, (responseErro) => {
        console.log(responseErro)
        this.erros = responseErro.error.errors;

        if (this.erros == 'CPF está inválido') {
          this.formulario.get('cpf').setErrors({ incorrect: true });
          this.notificationService.setDefaultDuration(4000);
          this.notificationService.warning("CPF está inválido");
        }
      }
      )
    }
  }

  removerNumeros(campo: string) {
    let valor: string;
    valor = this.formulario.get(campo).value.replace(/[0-9]/g, '');
    this.formulario.get(campo).setValue(valor);
  }
  cancelar(): void {
    location.reload();
  }
}