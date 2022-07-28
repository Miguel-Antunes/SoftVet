import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CepPipe } from 'src/app/shared/pipes/cep.pipe';
import { CpfCnpjPipe } from 'src/app/shared/pipes/cpfCnpj.pipe';
import { DataPipe } from 'src/app/shared/pipes/data.pipe';
import { PhonePipe } from 'src/app/shared/pipes/phone.pipe';
import { BuscaCepService } from 'src/app/shared/services/busca-cep.service';
import { VeterinariosService } from '../../services/veterinarios.service';

@Component({
  selector: 'app-veterinarios-edit',
  providers: [CpfCnpjPipe, DataPipe, PhonePipe, CepPipe],
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
    private route: ActivatedRoute

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
  onSubmit(): void {

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
  cancelar(): void {

  }
  // buscarVeterinario(): void {
  //   this.veterinarioService.recuperarPorId(this.idVeterinario).pipe(map(response => {

  //     response.dataCadastro = this.dataPipe.transform(response.dataCadastro)
  //     response.cep = this.cepPipe.transform(response.cep)
  //     response.cpf = this.cpfCnpj.transform(response.cpf)
  //     response.telefone = this.phonePipe.transform(response.telefone)
  //     return response
  //   })).subscribe((response) => {
  //     this.aux = response;
  //   })


  // }
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

}
