import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoModalComponent, PoNotificationService } from '@po-ui/ng-components';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import {
  isSameDay,
  isSameMonth, startOfDay
} from 'date-fns';



import { map, Subject } from 'rxjs';
import { AgendamentosService } from 'src/app/agendamentos/services/agendamentos.service';
import { AnimaisService } from 'src/app/animais/services/animais.service';
import { VeterinariosService } from 'src/app/veterinarios/services/veterinarios.service';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};
@Component({
  selector: 'app-agendamento-view',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './agendamento-view.component.html',
  styleUrls: ['./agendamento-view.component.css']
})
export class AgendamentoViewComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private agendamentoService: AgendamentosService,
    private animalService: AnimaisService,
    private veterinarioService: VeterinariosService,
    private notificationService: PoNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.configurarFormulario();
    this.popularCalendario();
  }
  formulario: FormGroup;

  @Output() eventEmiter = new EventEmitter();

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();


  @ViewChild("modal", { static: true }) modal: PoModalComponent

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [

    {
      label: '<span class="ml-1"> <i class="fas fa-fw fa-pencil-alt"></i> </span>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.router.navigate(['/agendamentos/edit/' + event.id])

      },
    },
    {
      label: '<span class="ml-1"> <i class="fas fa-fw fa-trash-alt"></i></span> ',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {

        if (confirm("Deseja excluir o agendamento " + event.title + "?")) {
          this.agendamentoService.deletar(<number>event.id).subscribe((response) => {

          })
        }

      },
    },

    {
      label: '<span class="ml-1"> <i class="fas fa-arrow-right"></i> </span>',
      a11yLabel: 'consulta',
      onClick: ({ event }: { event: CalendarEvent }): void => {

        this.agendamentoService.recuperarPorId(<number>event.id).subscribe((response) => {
          this.formulario.patchValue({
            id: response.id,
            descricao: response.descricao,
            animal: response.animal,
            veterinario: response.veterinario,
            prioridade: response.prioridade,
            dataRealizacao: response.dataRealizacao
          })
          this.modal.open();
        })

      },
    }
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[];

  activeDayIsOpen: boolean = false;


  configurarFormulario(): void {
    this.formulario = this.formBuilder.group({
      id: [null],
      descricao: [null, [Validators.required, Validators.maxLength(40)]],
      animal: [null, Validators.required],
      veterinario: [null],
      prioridade: [null, Validators.required],
      dataRealizacao: [null, Validators.required]

    });
  }

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;


    }

  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
    this.activeDayIsOpen = false;
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.agendamentoService.recuperarPorId(<number>event.id).subscribe((response) => {
      this.formulario.patchValue({
        id: response.id,
        descricao: response.descricao,
        animal: response.animal,
        veterinario: response.veterinario,
        prioridade: response.prioridade,
        dataRealizacao: response.dataRealizacao

      })
      this.modal.open();
    })
  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  popularCalendario() {
    return this.agendamentoService.recuperarTodos()
      .pipe(
        map(
          agendamentos => {
            return agendamentos.map(agendamento => {
              return {
                id: agendamento.id,
                title: agendamento.descricao,
                start: startOfDay(new Date(`${agendamento.dataRealizacao} 00:00`)),
                color: agendamento.prioridade == 'baixa' ? colors.blue : agendamento.prioridade == 'moderada' ? colors.yellow : colors.red,
                actions: this.actions
              }
            })
          }
        )
      )
      .subscribe((response) => {
        this.events = response;
        this.refresh.next();
      })
  }

  onSubmit() {
  }
  cancelar(): void {
    this.modal.close()

  }
}
