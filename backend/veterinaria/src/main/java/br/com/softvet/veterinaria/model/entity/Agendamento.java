package br.com.softvet.veterinaria.model.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "agendamento")
public class Agendamento {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, length = 40)
	@NotEmpty(message = "{campo.descricao.agendamento.obrigatorio}")
	private String descricao;
	
	@OneToOne
	@JoinColumn(name = "id_veterinario")
	private Veterinario veterinario;
	
	@OneToOne
	@JoinColumn(name= "id_animal")
	private Animal animal;
	
	@Column(name = "data_agendada")
	private LocalDate dataAgendada;
	
	@Column(nullable = false , length = 10)
	@NotEmpty(message = "{campo.prioridade.agendamento.obrigatorio}")
	private String prioridade;
	
	@Column(name = "data_realizacao")
	@NotNull(message = "{campo.data.realizacao.agendamento.obrigatorio}")
	private LocalDate dataRealizacao;
	
	@PrePersist
	public void prePersist() {
		setDataAgendada(LocalDate.now());
	
	}

}
