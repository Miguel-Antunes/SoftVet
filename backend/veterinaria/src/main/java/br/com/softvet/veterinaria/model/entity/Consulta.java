package br.com.softvet.veterinaria.model.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.Data;

@Entity
@Data
@Table(name= "consultas")
public class Consulta {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name= "data_realizacao")
	private LocalDate dataRealizacao;
	
	@ManyToOne
	@JoinColumn(name="id_veterinario")
	private Veterinario veterinario;
	
	@ManyToOne
	@JoinColumn(name="id_animal")
	private Animal animal;
	
	@Column
	private BigDecimal valor;
	
	
}
