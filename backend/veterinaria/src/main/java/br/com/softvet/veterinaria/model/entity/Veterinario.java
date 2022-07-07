package br.com.softvet.veterinaria.model.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.PrePersist;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@Table(name="veterinario")
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Veterinario {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(nullable = false, length = 150)
	private String nome;
	
	@Column(nullable = false, length = 11)
	private String cpf;
	
	@Column(nullable = false, length = 11)
	private Long telefone;
	
	@Column(name= "data_nascimento", nullable = false)
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate dataNascimento;
	
	@Column(length = 100 )
	private String email;
	
	@Column(nullable = true)
	private String sexo;
	
	@Column(name= "data_cadastro", updatable = false)
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate dataCadastro;
	
	@Column(length = 8)
	private Long cep;
	
	@Column(length = 2, nullable = false)
	private String uf;
	
	@Column(length = 80, nullable = false)
	private String cidade;
	
	@Column(length = 100, nullable = false)
	private String rua;
	
	@Column(length = 5, nullable = false)
	private int numero;
	
	@Column(length = 50)
	private String complemento;
	
	@PrePersist 
	public void prePersist() {
		setDataCadastro(LocalDate.now());
	}
	

}

