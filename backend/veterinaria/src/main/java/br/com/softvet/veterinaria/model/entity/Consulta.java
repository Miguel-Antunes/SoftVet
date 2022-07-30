package br.com.softvet.veterinaria.model.entity;

import java.time.LocalDate;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.Table;



import lombok.Data;

@Entity
@Data
@Table(name= "consulta")
public class Consulta {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "id_animal")
	private Animal animal;
	
	@ManyToOne
	@JoinColumn(name = "id_veterinario")
	private Veterinario veterinario;
	
	@Column(nullable = false, length = 10)
	private String estadoAnimal;
	
	@Column(nullable = false, length = 10)
	private String ferimento;
	
	@Column(nullable = false, length = 10)
	private String dores;
	
	@Column(nullable = false, length = 10)
	private String febre;
	
	@Column()
	private String queixa;
	
	@Column()
	private String observacao;
    
	@Column()
	private String procedimento;
		
	@Column()
	private String receita;
	@Column	
	private LocalDate dataRealizacao;
	
	@PrePersist
	public void setData() {
	setDataRealizacao(LocalDate.now());
	}
}
