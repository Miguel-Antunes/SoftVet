import { Component, AfterViewInit } from '@angular/core';
import * as jQuery from 'jquery';
import { BuscaCepService } from './busca-cep.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'veterinaria';

  ngAfterViewInit(): void {
   
    (function ($) {
      "use strict";

      var path = window.location.href;
      $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function () {
        if (this.getAttribute("href") === path) {
          $(this).addClass("active");
        }
      });


      $("#sidebarToggle").on("click", function (e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
      });
    })(jQuery);
  }
  constructor(private cepService : BuscaCepService){

  }
  consultaCep(cep, form){
    return this.cepService
    .buscar(cep).
    subscribe((dados) => {
      this.populaForm(dados, form);

    }
    )
  }
  populaForm(dados, form){
    form.setValue({
      cep: dados.cep,
      uf: dados.uf,
      cidade: dados.cidade,
      rua: dados.logradouro
    })
  }

}
