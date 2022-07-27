import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PoNotificationService } from '@po-ui/ng-components';
import { map } from 'rxjs';
import { AnimaisService } from 'src/app/animais/services/animais.service';
import { CalendarioComponent } from 'src/app/calendario/componentes/calendario/calendario.component';
import { VeterinariosService } from 'src/app/veterinarios/services/veterinarios.service';
import { AgendamentosService } from '../../services/agendamentos.service';


@Component({
  selector: 'app-agendamentos-form',
  templateUrl: './agendamentos-form.component.html',
  styleUrls: ['./agendamentos-form.component.css']
})
export class AgendamentosFormComponent implements OnInit {


  animais: any[];
  veterinarios: any[];

  @ViewChild("calendario") calendario: CalendarioComponent;

  @Output()
  fecharModal = new EventEmitter()

  constructor(
    private animalService: AnimaisService,
    private veterinarioService: VeterinariosService,
    private agendamentoService: AgendamentosService,
    private notificationService: PoNotificationService
  ) { }

  ngOnInit(): void {
    this.buscarAnimal();
    this.buscarVeterinario();
  }

  buscarAnimal(): void {
    this.animalService.recuperarTodos().pipe(
      map((animal: any) => {
        return animal.map((item: any) => {
          return {
            label: item.nome,
            value: { "id": item.id }
          }
        })
      }
      )).subscribe(response => {
        this.animais = response;
      });
  }

  buscarVeterinario(): void {
    this.veterinarioService.recuperarTodos().pipe(
      map((veterinario: any) => {
        return veterinario.map((item: any) => {
          return {
            label: item.nome,
            value: { "id": item.id }
          }
        })
      }
      )).subscribe(response => {
        this.veterinarios = response;
      });
  }
  cadastrar(form: any) {

    for (const campo in form.value) {
      form.get(campo).markAsDirty();
    }
    if (!form.valid) {
      this.notificationService.setDefaultDuration(4000);
      this.notificationService.warning('Preencha os campos obrigatórios!');
    } else {
      if (form.get("id").value == null) {
        this.agendamentoService.cadastrar(form.value).subscribe((response) => {
          console.log(response);
          setTimeout(() => {
            location.reload()
          }, 1000
          )
          this.notificationService.success("Cadastrado com sucesso!");

        }
        )
      }
      else {
        this.agendamentoService.editar(form.get("id").value, form.value)
          .subscribe((response) => {

            setTimeout(() => {
              location.reload()
            }, 1000
            )
            this.notificationService.success("Editado com sucesso!");
          })

      }

    }
  }

}
