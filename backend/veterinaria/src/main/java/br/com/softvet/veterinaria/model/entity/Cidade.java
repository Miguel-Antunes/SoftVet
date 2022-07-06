package br.com.softvet.veterinaria.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;


import lombok.Data;

@Entity
@Data
public class Cidade {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(nullable = false, length = 75)
	private String descricao;
	
	@ManyToOne
	@JoinColumn(name= "id_estado")
	private Estado estado;

}
