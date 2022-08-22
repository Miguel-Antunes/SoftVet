import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receita-view',
  templateUrl: './receita-view.component.html',
  styleUrls: ['./receita-view.component.css']
})
export class ReceitaViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  voltar(): void {

  }
  imprimir(): void {
    window.print();
  }
}
