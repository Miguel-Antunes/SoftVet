import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoDynamicViewField, PoNotificationService, PoPageAction } from '@po-ui/ng-components';
import { map } from 'rxjs';
import { ConsultasService } from 'src/app/consultas/services/consultas.service';
import { CepPipe } from 'src/app/shared/pipes/cep.pipe';
import { CpfCnpjPipe } from 'src/app/shared/pipes/cpfCnpj.pipe';
import { DataPipe } from 'src/app/shared/pipes/data.pipe';
import { PhonePipe } from 'src/app/shared/pipes/phone.pipe';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Veterinario } from '../../interfaces/veterinario';
import { VeterinariosService } from '../../services/veterinarios.service';

@Component({
  selector: 'app-veterinarios-view',
  providers: [CpfCnpjPipe, DataPipe, PhonePipe, CepPipe],
  templateUrl: './veterinarios-view.component.html',
  styleUrls: ['./veterinarios-view.component.css']
})
export class VeterinariosViewComponent implements OnInit {

  campo: Array<PoDynamicViewField> = [
    { property: 'nome', label: 'Nome', divider: 'Dados Pessoais', gridColumns: 4, order: 1 },
    { property: 'dataNascimento', label: 'Nascimento', gridColumns: 4 },
    { property: 'sexo', label: 'Sexo', gridColumns: 4 },
    { property: 'cpf', label: 'CPF', gridColumns: 4, order: 2 },
    { property: 'telefone', label: 'Celular', gridColumns: 4, order: 3 },
    { property: 'dataCadastro', label: 'Data de Admissão', gridColumns: 4, divider: 'Dados Profissionais' },
    { property: 'totalConsulta', label: 'Consultas Realizadas', gridColumns: 4 },
    { property: 'situacao', label: 'Situação', gridColumns: 4 },
    { property: 'cidade', label: 'Cidade', divider: 'Endereço', gridColumns: 4 },
    { property: 'uf', label: 'UF', gridColumns: 4 },
    { property: 'cep', label: 'CEP', gridColumns: 4 },
    { property: 'rua', label: 'Rua', gridColumns: 4 },
    { property: 'numero', label: 'Numero', gridColumns: 4 },
    { property: 'complemento', label: 'Complemento', gridColumns: 4 }
  ];
  veterinario: Veterinario;
  aux: any;
  idVeterinario: number;
  nomeVeterinario: string;
  ativo: boolean = true;
  roleAdmin: boolean = false;


  constructor(
    private veterinarioService: VeterinariosService,
    private consultaService: ConsultasService,
    private cpfCnpj: CpfCnpjPipe,
    private dataPipe: DataPipe,
    private phonePipe: PhonePipe,
    private cepPipe: CepPipe,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: PoNotificationService,
    private auth: AuthService
  ) { }


  editar(): void {
    this.router.navigate(['/veterinarios/edit/' + this.veterinario.id])
  }

  ngOnInit(): void {
    this.roleAdmin = this.auth.obterRoleAdmin();
    this.pegarIdVeterinario();
    this.buscarVeterinario();
  }

  buscarVeterinario(): void {
    this.veterinarioService.recuperarPorId(this.idVeterinario).pipe(map(response => {
      console.log(response)
      this.nomeVeterinario = response.nome;
      if (response.situacao == "Inativo") {
        this.ativo = false;
      }
      response.dataCadastro = this.dataPipe.transform(response.dataCadastro)
      response.dataNascimento = this.dataPipe.transform(response.dataNascimento)
      response.cep = this.cepPipe.transform(response.cep)
      response.cpf = this.cpfCnpj.transform(response.cpf)
      response.telefone = this.phonePipe.transform(response.telefone)
      if (response.sexo) {
        response.sexo = response.sexo.toString().toUpperCase()
      }
      return response
    })).subscribe((response) => {
      this.aux = response;
      this.recuperarConsultasPorVeterinario();
    })


  }
  recuperarConsultasPorVeterinario(): void {
    this.consultaService.recuperarConsulataPorVeterinario(this.idVeterinario).subscribe(response => {
      this.veterinario = {
        ...this.aux,
        totalConsulta: response.length
      }
    }


    )
  }
  pegarIdVeterinario(): void {
    this.idVeterinario = this.route.snapshot.params['id'];
  }

  desligar(): void {
    if (confirm("Deseja encerrar as atividades do veterinário " + this.nomeVeterinario + "?")) {
      this.veterinarioService.editarSituacao(this.idVeterinario, "Inativo").subscribe(response => {
        this.notificationService.setDefaultDuration(2000)
        this.notificationService.warning("Atividades do veterinário encerradas!")
        this.router.navigate(['/veterinarios/list'])
      })
    }

  }

  retomarAtividades(): void {
    if (confirm("Deseja retomar as atividades do veterinário " + this.nomeVeterinario + "?")) {
      this.veterinarioService.editarSituacao(this.idVeterinario, "Ativo").subscribe(response => {
        this.notificationService.setDefaultDuration(2000)
        this.notificationService.success("Atividades do veterinário retomadas!")
        this.router.navigate(['/veterinarios/list'])
      })
    }

  }

}