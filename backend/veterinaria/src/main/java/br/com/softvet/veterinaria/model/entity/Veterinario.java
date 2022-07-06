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
	
	@Column(nullable = false)
	private String sexo;
	
	@Column(name= "data_nascimento")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate dataNascimento;
	
	@Column(nullable = false)
	private Long telefone;
	
	
	@Column(name= "data_cadastro", updatable = false)
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate dataCadastro;
	
	@OneToOne
	@JoinColumn(name= "id_endereco")
	private Endereco endereco;
	
	@PrePersist 
	public void prePersist() {
		setDataCadastro(LocalDate.now());
	}
	

}

