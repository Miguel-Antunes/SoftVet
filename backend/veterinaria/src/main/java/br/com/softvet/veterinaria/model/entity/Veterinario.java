package br.com.softvet.veterinaria.model.entity;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.br.CPF;

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
	private Long id;
	
	@Column(nullable = false, length = 150)
	@NotEmpty(message = "{campo.nome.obrigatorio}")
	private String nome;
	
	@Column(nullable = false, length = 11)
	@NotNull(message = "{campo.cpf.obrigatorio}")
	@CPF(message = "{campo.cpf.invalido}")
	private String cpf;
	
	@Column(nullable = false, length = 11)
	@NotNull(message = "{campo.telefone.obrigatorio}")
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
	@NotEmpty(message = "{campo.uf.obrigatorio}")
	private String uf;
	
	@Column(length = 80, nullable = false)
	@NotEmpty(message = "{campo.cidade.obrigatorio}")
	private String cidade;
	
	@Column(length = 100, nullable = false)
	@NotEmpty(message = "{campo.rua.obrigatorio}")
	private String rua;
	
	@Column(length = 5, nullable = false)
	@NotNull(message = "{campo.numero.obrigatorio}")
	private int numero;
	
	@Column(length = 50)
	private String complemento;
	
	@PrePersist 
	public void prePersist() {
		setDataCadastro(LocalDate.now());
	}
	

}

