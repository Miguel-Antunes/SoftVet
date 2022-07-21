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

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "medicamento")
public class Medicamento {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, length= 50)
	@NotEmpty(message = "{campo.descricao.medicamento.obrigatorio}")
	private String descricao;
	
	@Column( length= 50)
	@NotEmpty(message = "{campo.fabricante.medicamento.obrigatorio}")
	private String fabricante;
	
	@Column(nullable = false, length = 30)
	@NotEmpty(message = "{campo.unidade.medicamento.obrigatorio}")
	private String unidade;
	
	@Column(nullable = false, length =10)
	@NotNull(message = "{campo.quantidade.medicamento.obrigatorio}")
	private Double quantidade;
	
	@Column(name= "data_entrada", updatable = false)
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate dataEntrada;
	
	@Column(name= "data_fabricacao")
	@JsonFormat(pattern = "yyyy-MM-dd")
	private LocalDate dataFabricacao;
	
	@Column(name= "data_validade")
	@JsonFormat(pattern = "yyyy-MM-dd")
	@NotNull(message = "{campo.validade.medicamento}")
	private LocalDate dataValidade;
	
	@PrePersist 
	public void prePersist() {
		setDataEntrada(LocalDate.now());
	}

}
