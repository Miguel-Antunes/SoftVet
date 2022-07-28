import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BuscaCepService } from 'src/app/shared/services/busca-cep.service';
import { ProprietarioService } from '../../services/proprietario.service';

@Component({
  selector: 'app-proprietarios-edit',
  templateUrl: './proprietarios-edit.component.html',
  styleUrls: ['./proprietarios-edit.component.css']
})
export class ProprietariosEditComponent implements OnInit {

  formulario: FormGroup
  validacao_campo: boolean = false;
  idProprietario: number;

  constructor(
    private formBuilder: FormBuilder,
    private buscaCep: BuscaCepService,
    private proprietarioService: ProprietarioService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.pegarIdProprietario();
    this.buscarProprietario();
    this.configurarFormulario();
  }
  onSubmit(): void {

  }
  pegarIdProprietario(): void {
    this.idProprietario = this.route.snapshot.params['id'];
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
  cancelar(): void {

  }

  buscarProprietario(): void {
    this.proprietarioService.recuperarPorId(this.idProprietario).subscribe(response => {

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

}
