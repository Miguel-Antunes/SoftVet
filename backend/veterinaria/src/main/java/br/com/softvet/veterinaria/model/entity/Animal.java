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
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name= "animal")
public class Animal {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name = "id_proprietario")
	private Proprietario proprietario;
	
	@Column(nullable = false, length = 150)
	@NotEmpty(message = "{campo.nome.animal.obrigatorio}")
	private String nome;

	@Column()
	private Integer idade;
	
	@Column( length = 15)
	private String sexo;
	
	@Column(nullable = false, length = 75)
	@NotEmpty(message = "{campo.especie.obrigatorio}")
	private String especie;
	
	@Column(nullable = false, length = 75)
	@NotEmpty(message = "{campo.raca.obrigatorio}")
	private String raca;
	
	@Column(nullable = false, length = 75)
	@NotEmpty(message = "{campo.cor.obrigatorio}")
	private String cor;
	
	@Column(nullable = false)
	@NotNull(message = "{campo.altura.obrigatorio}")
	private double altura;
	
	@Column(nullable= false)
	@NotNull(message = "{campo.peso.obrigatorio}")
	private double peso;
	
	@Column(name= "tipo_sangue")
	private String tipoSangue;
	
	@Column(name= "data_cadastro", updatable = false)
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate dataCadastro;
	
	
	@PrePersist 
	public void prePersist() {
		setDataCadastro(LocalDate.now());
	}
	
	
}
