import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoNotificationService } from '@po-ui/ng-components';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UsuarioService } from '../../service/usuario.service';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css']
})
export class UsuariosFormComponent implements OnInit {
  formulario: FormGroup;
  idAdministrador: number;

  permissao: any[] = [{
    label: "Administrador",
    value: "ADMIN"
  },
  {
    label: "Usuário",
    value: "USER"
  }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private service: UsuarioService,
    private auth: AuthService,
    private poNotification: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.configurarFormulario();
  }

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      nomeDeUsuario: [null, [Validators.required, Validators.maxLength(20)]],
      senha: [123, Validators.maxLength(20)],
      permissao: [null, Validators.required],
      idAdmin: [null],
      primeiroAcesso: [true]
    })
  }
  onSubmit() {
    for (const campo in this.formulario.value) {
      this.formulario.get(campo).markAsDirty();
    }
    if (!this.formulario.valid) {
      this.poNotification.setDefaultDuration(2000);
      this.poNotification.warning("Preencha os campos Obrigatórios!")

    } else {
      const usuario = this.auth.obterNomeUsuarioAutenticado()


      this.service.encontrarPorNomeDeUsuario(usuario).subscribe(response => {
        this.idAdministrador = response.id;
        console.log(this.idAdministrador)
        this.formulario.get("idAdmin").patchValue(this.idAdministrador)
      })
      setTimeout(() => {
        this.service.cadastrar(this.formulario.value).subscribe((response) => {
          this.poNotification.setDefaultDuration(2000);
          this.poNotification.success("Usuário Cadastrado com sucesso!")
          console.log(response)
        })
      }, 2000);



    }
  }
  cancelar() {
    location.reload();
  }
}
