import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';

import { AuthService } from 'src/app/shared/services/auth.service';
import { Usuario } from 'src/app/usuarios/interfaces/Usuario';
import { UsuarioService } from 'src/app/usuarios/service/usuario.service';
import { PrimeiroAcessoService } from '../../services/primeiro-acesso.service';

@Component({
  selector: 'app-primeiro-acesso',
  templateUrl: './primeiro-acesso.component.html',
  styleUrls: ['./primeiro-acesso.component.css']
})
export class PrimeiroAcessoComponent implements OnInit {

  usuarioExiste: boolean = false;
  registrando: boolean = true;
  nomeDeUsuario: string;
  clone: Usuario = new Usuario();

  formulario: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private primeiroAcessoSerice: PrimeiroAcessoService,
    private router: Router,
    private authService: AuthService,
    private poNotification: PoNotificationService

  ) { }

  ngOnInit(): void {
    this.configurarFormulario();
  }

  configurarFormulario(): void {
    this.formulario = this.formBuilder.group({
      usuario: [null],
      senha: [null, [Validators.required, Validators.maxLength(20)]],
      senha2: [null, [Validators.required, Validators.maxLength(20)]]

    })
  }
  onSubmit(): void {


    if (this.registrando) {

      this.authService.
        tentarLogar(
          "Miguel",
          "2011550203Mgl")
        .subscribe(response => {
          const access_token = JSON.stringify(response);
          localStorage.setItem('access_token', access_token)

        }, responseErro => {

        }
        )
      setTimeout(() => {
        this.usuarioService.encontrarPorNomeDeUsuario(this.formulario.get("usuario").value).subscribe(response => {

          if (response.primeiroAcesso == "true") {

            this.usuarioExiste = true;
            this.formulario.get("usuario").disable()

            this.clone.id = response.id;
            this.clone.nomeDeUsuario = response.nomeDeUsuario;
            this.clone.permissao = response.permissao;
            this.clone.idAdmin = response.idAdmin;
            this.registrando = false;
          } else {
            this.poNotification.setDefaultDuration(2000);
            this.poNotification.warning("Senha já alterada!")
          }
        },
          responseErro => {
            this.poNotification.setDefaultDuration(2000);
            this.poNotification.warning("Usuário não cadastrado")
          })
      }, 1000);


    }

    // setTimeout(() => {
    //   localStorage.removeItem("acess_token");
    //   this.router.navigate(['login'])
    //   this.poNotification.setDefaultDuration(2000);
    //   this.poNotification.warning("Tempo Esgotado!")

    // }, 1000 * 30);

    if (!this.registrando) {

      if (this.formulario.get("senha").value != this.formulario.get("senha2").value) {
        this.poNotification.setDefaultDuration(2000);
        this.poNotification.warning("Senhas não são iguais!")
      }
      else {
        if (!this.formulario.valid) {
          for (const campo in this.formulario.value) {
            this.formulario.get(campo).markAsDirty();
          }
          this.poNotification.setDefaultDuration(2000);
          this.poNotification.warning("Preencha todos os campos")

        }
        else {
          this.clone.senha = this.formulario.get("senha").value;
          this.clone.primeiroAcesso = "false";


          this.primeiroAcessoSerice.registrarSenha(this.clone.id, this.clone).subscribe(response => {
            this.poNotification.setDefaultDuration(2000);
            this.poNotification.success("Senha registrada com sucesso! ")

            setTimeout(() => {
              localStorage.removeItem("access_token")
              this.router.navigate(['/login'])
            }, 2000);



          }, responseErro => {
            console.log(responseErro);
          })
        }

      }

    }
  }

  cancelar() {
    this.router.navigate(['login']);
    localStorage.removeItem("access_token");
  }
}