import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../interfaces/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: Usuario;

  formulario: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

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

    if (!this.formulario.valid) {
      this.formulario.patchValue({
        loginErro: true
      })
      console.log("Login e/ou senha incorreto(a)!")
      console.log(this.formulario.value)
    }
    else {
      this.formulario.patchValue({
        loginErro: false
      })
      console.log(this.formulario.value)
    }

  }
}
