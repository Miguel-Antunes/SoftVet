package br.com.softvet.veterinaria.model.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name= "proprietario")
public class Proprietario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(nullable = false, length = 150)
	private String nome;
	
	@Column(nullable = false, length = 11)
	private String cpf;
	
	@Column(name= "data_nascimento")
	private LocalDate dataNascimento;
	
	@Column(nullable = false, length = 11)
	private String telefone;
	
	@Column(length = 150)
	private String email;
	
	@Column(nullable = false, length = 15)
	private String sexo;
	
	@Column(name= "estado_civil",nullable = false, length = 15)
	private String estadoCivil;
	

}
