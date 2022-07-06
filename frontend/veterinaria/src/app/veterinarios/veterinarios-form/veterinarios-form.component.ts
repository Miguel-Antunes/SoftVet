import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BuscaCepService } from 'src/app/busca-cep.service';
import { VeterinariosService } from 'src/app/veterinarios.service';

import { PoModalAction, PoModalComponent } from '@po-ui/ng-components';

@Component({
  selector: 'app-veterinarios-form',
  templateUrl: './veterinarios-form.component.html',
  styleUrls: ['./veterinarios-form.component.css']
})
export class VeterinariosFormComponent implements OnInit {


  formulario: FormGroup;

  constructor(private service: VeterinariosService, private formBuilder: FormBuilder, private buscacep: BuscaCepService) {

  }

  ngOnInit(): void {
    this.configurarFormulario();

  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group(
      {
        nome: [null, [Validators.required, Validators.maxLength(80)]],
        cpf: [null, Validators.required],
        telefone: [null, Validators.required],
        dataNascimento: [null, Validators.required],
        email: [null, Validators.email],
        sexo: [null, Validators.required],
        cep: [null, Validators.required],
        uf: [null, Validators.required],
        cidade: [null, Validators.required],
        rua: [null, Validators.required],
        numero: [null, Validators.required],
        complemento: [null, Validators.required]

      }
    )

  }
  buscaInfo() {

    let valido : boolean;
    let cep: string = this.formulario.get('cep').value;
    valido = /^([0-9]{5}[0-9]{3})$/.test(cep);

    if(valido === true){
      this.buscacep.buscar(cep).subscribe((response : any) => {
        
        console.log(response);
        this.formulario.patchValue({
          uf : response.uf,
          cidade : response.localidade,
          rua : response.logradouro,
          complemento : response.complemento
        })

      });


    }else{
      console.log("Inválido!");
    }
    

    

  }
  onSubmit() {
    for (const campo in this.formulario.value) {
      this.formulario.get(campo).markAsDirty();
    }
    //  console.log(this.veterinario);
    // this.service
    //  .cadastrar(this.formulario.value)
    //  .subscribe(response => {
    //   console.log(response);
    //  }
    //   )
    console.log(this.formulario.valid)
  }

  //   mascaraCpf(cpf : string){

  //     cpf = cpf.replace(/\D+/g,'');
  //     cpf = cpf.replace(/^(\d{3})/g, "$1.");
  //     cpf = cpf.replace(/(\d{3})(\d{3})/g, "$1.$2-");
  //     cpf = cpf.replace(/(-\d{2})\d+?$/, '$1');  
  //     return cpf;
  //   }

  //   aplicarMascara(valor : any){
  //     this.formulario.cpf = this.mascaraCpf(valor);
  //  }
}
