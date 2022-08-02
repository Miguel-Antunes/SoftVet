import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { BuscaCepService } from 'src/app/shared/services/busca-cep.service';
import { VeterinariosService } from '../../services/veterinarios.service';

@Component({
  selector: 'app-veterinarios-edit',
  templateUrl: './veterinarios-edit.component.html',
  styleUrls: ['./veterinarios-edit.component.css']
})
export class VeterinariosEditComponent implements OnInit {
  formulario: FormGroup
  validacao_campo: boolean = false;
  idVeterinario: number;

  constructor(
    private formBuilder: FormBuilder,
    private buscaCep: BuscaCepService,
    private veterinarioService: VeterinariosService,
    private route: ActivatedRoute,
    private notificationService: PoNotificationService,
    private router: Router

    // private dataPipe: DataPipe,
    // private phonePipe: PhonePipe,
    // private cpfCnpj: CpfCnpjPipe,
    // private cepPipe: CepPipe
  ) { }

  ngOnInit(): void {
    this.pegarIdveterinario();
    this.buscarVeterinario();
    this.configurarFormulario();
  }

  pegarIdveterinario(): void {
    this.idVeterinario = this.route.snapshot.params['id'];
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
      this.buscaCep.buscar(cep).subscribe((response: any) => {
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
  removerNumeros(campo: string) {
    let valor: string;
    valor = this.formulario.get(campo).value.replace(/[0-9]/g, '');
    this.formulario.get(campo).setValue(valor);
  }
  buscarVeterinario(): void {
    this.veterinarioService.recuperarPorId(this.idVeterinario).subscribe(response => {
      this.formulario.patchValue({
        nome: response.nome,
        cpf: response.cpf,
        telefone: response.telefone,
        dataNascimento: response.dataNascimento,
        email: response.email,
        sexo: response.sexo,
        cep: response.cep,
        uf: response.uf,
        cidade: response.uf,
        rua: response.rua,
        numero: response.numero,
        complemento: response.numero,
      }
      )
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
      this.veterinarioService.editar(this.idVeterinario, this.formulario.value).subscribe((response) => {
        this.notificationService.setDefaultDuration(2000);
        this.notificationService.success("Editado com sucesso!");
        this.router.navigate(['veterinarios/list']);
        console.log(response);
      }, (responseErro) => {

        this.formulario.get('cpf').setErrors({ incorrect: true });
        this.notificationService.setDefaultDuration(2000);
        this.notificationService.warning("CPF está inválido");

      }
      )
    }

  }
  cancelar(): void {
    this.router.navigate(['/veterinarios/list'])

  }



}
