import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuscaCepService } from 'src/app/busca-cep.service';
import { ProprietariosService } from '../proprietarios.service';

@Component({
  selector: 'app-proprietarios-form',
  templateUrl: './proprietarios-form.component.html',
  styleUrls: ['./proprietarios-form.component.css']
})
export class ProprietariosFormComponent implements OnInit {
  cep_valido: boolean = false;
  validacao_campo: boolean = false;
  formulario : FormGroup;

  constructor( private formBuilder: FormBuilder, private buscacep: BuscaCepService, private service : ProprietariosService) { }

  ngOnInit(): void {
    this.configurarFormulario();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group(
      {
        nome: [null, [Validators.required, Validators.maxLength(150)]],
        cpf: [null, [Validators.required, Validators.maxLength(11)]],
        telefone: [null,[ Validators.required, Validators.maxLength(11)]],
        dataNascimento: [null, Validators.required],
        email: [null, [Validators.email, Validators.maxLength(100)]],
        sexo: [null, Validators.required],
        cep: [null, [Validators.minLength(8), Validators.maxLength(8)]],
        uf: [null, [Validators.required, Validators.maxLength(2)]],
        cidade: [null, [Validators.required, Validators.maxLength(80)]],
        rua: [null, [Validators.required, Validators.maxLength(100)]],
        numero: [null, [Validators.required, Validators.maxLength(5)]],
        complemento: [null, Validators.maxLength(50)]
      }
    )
  }
  buscaInfo() {
    this.validacao_campo = false;
    this.cep_valido = false;

    let cep: string = this.formulario.get('cep').value;
    let validacao_cep: boolean = /^([0-9]{5}[0-9]{3})$/.test(cep);

    if (validacao_cep === true) {
      this.buscacep.buscar(cep).subscribe((response: any) => {
        if (response.erro === undefined) {
          this.formulario.patchValue({
            uf: response.uf,
            cidade: response.localidade,
            rua: response.logradouro,
            complemento: response.complemento
          })
          this.validacao_campo = true;
          this.cep_valido = true
        }
      });
    }
  }

  onSubmit() {
    for (const campo in this.formulario.value) {
      this.formulario.get(campo).markAsDirty();
    }

    if (this.formulario.get("cep").value === null || this.formulario.get("cep").value === '') {
      this.cep_valido = true;
    }

    if (this.cep_valido === false) {
      console.log("cep " + this.formulario.get("cep").value + " é invalido!")
    }
    else {
      this.service
       .cadastrar(this.formulario.value)
       .subscribe(response => {
        console.log(response);
       }
        )
    }

  }


  removerNumeros(campo: string) {
    let valor: string;
    valor = this.formulario.get(campo).value.replace(/[0-9]/g, '');
    this.formulario.get(campo).setValue(valor);
  }

}
