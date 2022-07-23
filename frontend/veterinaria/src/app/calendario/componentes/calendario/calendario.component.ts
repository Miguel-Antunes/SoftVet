import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
} from 'date-fns';
import { map, reduce, Subject, take } from 'rxjs';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { PoModalComponent } from '@po-ui/ng-components';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Agendamento } from 'src/app/agendamentos/interfaces/Agendamento';
import { AgendamentosService } from 'src/app/agendamentos/services/agendamentos.service';




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
  selector: 'app-calendario',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  formularioEvento: FormGroup;

  agendamentos: any;

  @Input()
  animais: any[];

  @Input()
  veterinarios: any[];

  @Output()
  conteudoFormulario: EventEmitter<any> = new EventEmitter();

  @ViewChild('modalContent', { static: true }) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  @ViewChild("modal", { static: true }) modal: PoModalComponent

  opcoes: any = [
    { label: " Baixa", value: "baixa" },
    { label: " Moderada", value: "moderada" },
    { label: "Alta", value: "alta" }

  ]

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  actions: CalendarEventAction[] = [

    {
      label: '<span class="ml-1"> <i class="fas fa-fw fa-pencil-alt"></i> </span>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        //this.handleEvent('Edited', event);

        this.agendamentoService.recuperarPorId(<number>event.id).subscribe((response) => {
          this.formularioEvento.patchValue({
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
    },
    {
      label: '<span class="ml-1"> <i class="fas fa-fw fa-trash-alt"></i></span> ',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {

        if (confirm("Deseja excluir o agendamento " + event.title + "?")) {
          this.agendamentoService.deletar(<number>event.id).subscribe((response) => {
            console.log(response);
          })
          location.reload();

        }

        // this.agendamentoService.deletar(<number>event.id).subscribe((response) => {
        //   console.log(response);
        // })
        // location.reload();

      },
    },
    {
      label: '<span class="ml-1"> <i class="fas fa-fw fa-search"></i> </span>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {

        this.agendamentoService.recuperarPorId(<number>event.id).subscribe((response) => {
          this.formularioEvento.patchValue({
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

  constructor(
    private formBuilder: FormBuilder,
    private agendamentoService: AgendamentosService
  ) { }

  ngOnInit(): void {
    this.configurarFormulario();
    this.recuperarAgendamentos();
    // setTimeout(() => {
    //   this.events = [{
    //     start: subDays(startOfDay(new Date()), 1),
    //     end: addDays(new Date(), 1),
    //     title: 'A 3 day event',
    //     color: colors.red,
    //     actions: this.actions,
    //     allDay: true,
    //     resizable: {
    //       beforeStart: true,
    //       afterEnd: true,
    //     },
    //     draggable: true,
    //   }];
    //   this.refresh.next();
    // }, 2000);

  }


  configurarFormulario(): void {
    this.formularioEvento = this.formBuilder.group({
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
    this.modalData = { event, action };
    // this.modal.open(this.modalContent, { size: 'lg' });
  }

  // addEvent(): void {
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: 'New event',
  //       start: startOfDay(new Date()),
  //       end: endOfDay(new Date()),
  //       color: colors.red,
  //       draggable: true,
  //       resizable: {
  //         beforeStart: true,
  //         afterEnd: true,
  //       },
  //     },
  //   ];
  // }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  recuperarAgendamentos() {
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
                actions: this.actions,
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

  cadastrar(): void {
    this.conteudoFormulario.emit(this.formularioEvento);

  }

  teste() {
    console.log(this.agendamentos)
  }

}


