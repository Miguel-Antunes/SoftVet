import { Component, OnInit } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { Veterinario } from '../veterinario';

@Component({
  selector: 'app-veterinarios-list',
  templateUrl: './veterinarios-list.component.html',
  styleUrls: ['./veterinarios-list.component.css']
})
export class VeterinariosListComponent implements OnInit {
  

  readonly columns: PoTableColumn[] = [
    {
      property: 'id',
      label: 'Código',
      type: 'number',
      width: '5%',
    },
    {
      property: 'nome',
      label: 'Nome',
      width: '25%'
    },
    {
      property: 'cpf',
      label: 'CPF',
      width: '15%',
    },
    {
      property: 'telefone',
      label: 'Telefone',
      width: '20%'
      
    },
    {
      property: 'email',
      label: 'E-Mail',
      width: '30%'
    }
  ];
 
  constructor() { }

  ngOnInit(): void {
  }
  mostrarDados(): any{
    


  }
}
