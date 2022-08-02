import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { map } from 'rxjs';
import { ProprietarioService } from 'src/app/proprietarios/services/proprietario.service';
import { AnimaisService } from '../../services/animais.service';

@Component({
  selector: 'app-animais-edit',
  templateUrl: './animais-edit.component.html',
  styleUrls: ['./animais-edit.component.css']
})
export class AnimaisEditComponent implements OnInit {

  proprietarioAtual: any;
  idAnimal: number;
  proprietarios: any[];
  formulario: FormGroup;
  validacao_campo: boolean = false;
  nomeProprietario: any;

  constructor(
    private formBuilder: FormBuilder,
    private proprietarioService: ProprietarioService,
    private animalService: AnimaisService,
    private notificationService: PoNotificationService,
    private service: AnimaisService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.configurarFormulario();
    this.recuperarProprietarios();
    this.recuperarAnimal();


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


  recuperarProprietarios(): void {
    this.proprietarioService.recuperarTodos().pipe(map(response => {
      return response.map(item => {
        return {
          label: item.nome,
          value: item.id
        }
      })
    })).subscribe(response => {
      this.proprietarios = response;
      console.log(response);

    });
  }

  recuperarAnimal(): void {
    this.idAnimal = this.route.snapshot.params['id']

    this.animalService.recuperarPorId(this.idAnimal)
      .subscribe(response => {

        setTimeout(() => {
          this.formulario.patchValue({
            nome: response.nome,
            proprietario: response.proprietario.id,
            idade: response.idade,
            sexo: response.sexo,
            especie: response.especie,
            raca: response.raca,
            cor: response.cor,
            altura: response.altura,
            peso: response.peso,
            tipoSangue: response.tipoSangue
          })

        }, 500);


      })
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
      this.proprietarioAtual = this.formulario.get('proprietario').value
      this.formulario.get('proprietario').setValue({ id: this.proprietarioAtual })
      this.animalService.editar(this.idAnimal, this.formulario.value).subscribe((response) => {
        console.log(response)
        this.notificationService.success("Editado com sucesso!");
        this.router.navigate(['animais/list']);

      }, reponseErro => {
        this.formulario.get('proprietario').setValue(this.proprietarioAtual)
      }
      )
    }
  }
  cancelar(): void {
    this.router.navigate(['/animais/list'])
  }
}
