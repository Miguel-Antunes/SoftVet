import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoNotification, PoNotificationService } from '@po-ui/ng-components';
import { MedicamentosService } from '../../services/medicamentos.service';

@Component({
  selector: 'app-medicamentos-form',
  templateUrl: './medicamentos-form.component.html',
  styleUrls: ['./medicamentos-form.component.css']
})
export class MedicamentosFormComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private service: MedicamentosService,
    private router: Router,
    private notificationService: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.configurarFormulario();
  }

  configurarFormulario(): void {
    this.formulario = this.formBuilder.group({
      descricao: [null, [Validators.required, Validators.maxLength(50)]],
      fabricante: [null, [Validators.maxLength(50)]],
      quantidade: [null, [Validators.required, Validators.max(100000)]],
      unidade: [null, [Validators.required, Validators.maxLength(30)]],
      dataFabricacao: [null],
      dataValidade: [null],


    });
  }
  onSubmit(): void {

    for (const campo in this.formulario.value) {
      this.formulario.get(campo).markAsDirty();
    }
    if (!this.formulario.valid) {
      this.notificationService.setDefaultDuration(4000);
      this.notificationService.warning('Preencha os campos obrigatórios!');
    } else {
      this.service.cadastrar(this.formulario.value).subscribe((response) => {
        this.notificationService.success("Cadastrado com sucesso!");
        this.router.navigate(['/', 'medicamentos-list']);
        console.log(response);
      }, (responseErro) => {
        console.log(responseErro)
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
