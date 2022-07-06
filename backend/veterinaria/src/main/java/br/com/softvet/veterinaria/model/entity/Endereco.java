package br.com.softvet.veterinaria.model.entity;

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
@Table(name = "endereco")
public class Endereco {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(length = 8)
	private Integer cep;
	
	@Column(nullable = false ,length = 60)
	private String rua;
	
	@Column(nullable = false ,length = 6)
	private Long numero;
	
	@Column(length = 60)
	private String complemento;

	@ManyToOne
	@JoinColumn(name= "id_cidade")
	private Cidade cidade;
}
