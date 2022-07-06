package br.com.softvet.veterinaria.model.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

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
	
	@Column(nullable = false, length = 150)
	private String nome;

	@Column(name= "data_nascimento")
	private LocalDate dataNascimento;
	
	@Column(nullable = false, length = 15)
	private String sexo;
	
	@Column(nullable = false, length = 75)
	private String especie;
	
	@Column(nullable = false, length = 75)
	private String raca;
	
	@Column(nullable = false, length = 75)
	private String cor;
	
	@Column(nullable = false)
	private double altura;
	
	@Column(nullable= false)
	private double peso;
	
	@Column(name= "tipo_sangue", nullable = false)
	private String tipoSangue;
	
	@ManyToOne
	@JoinColumn(name = "id_animal")
	private Proprietario proprietario;
	
	
}
