import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: string;
  erro: boolean;


  formulario: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private poNotification: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.configurarFormulario();
  }

  configurarFormulario(): void {
    this.formulario = this.formBuilder.group({
      usuario: [null, [Validators.required, Validators.maxLength(20)]],
      senha: [null, [Validators.required, Validators.maxLength(20)]],
      loginErro: [null]
    })
  }
  onSubmit(): void {


    for (const campo in this.formulario.value) {
      this.formulario.get(campo).markAsDirty();
    }
    if (!this.formulario.valid) {
      this.poNotification.setDefaultDuration(2000);
      this.poNotification.warning('Preencha os campos obrigatórios!');
    } else {

      this.authService.
        tentarLogar(
          this.formulario.get('usuario').value,
          this.formulario.get('senha').value)
        .subscribe(response => {
          const access_token = JSON.stringify(response);
          localStorage.setItem('access_token', access_token)
          console.log(response);
          this.router.navigate(['/home']);
        }, responseErro => {
          this.poNotification.setDefaultDuration(2000);
          this.poNotification.warning("Usuário e/ou senha incorreto(a)")
        }
        )
    }
  }
  primeiroAcesso() {

  }
}
