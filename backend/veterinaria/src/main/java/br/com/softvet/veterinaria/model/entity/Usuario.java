package br.com.softvet.veterinaria.model.entity;




import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Usuario{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(unique = true, nullable = false)
	private String nomeDeUsuario;
	
	@Column(nullable = false)
	private String senha;
	
	@Column(nullable = false)
	private String permissao;
	
	@Column()
	private Long idAdmin;
	
	@Column()
	private String primeiroAcesso;

	}
	


