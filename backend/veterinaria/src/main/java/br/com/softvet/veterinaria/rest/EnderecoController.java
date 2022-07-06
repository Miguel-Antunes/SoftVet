package br.com.softvet.veterinaria.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.softvet.veterinaria.model.entity.Endereco;
import br.com.softvet.veterinaria.model.repository.EnderecoRepository;

@RestController
@RequestMapping("/api/enderecos")
public class EnderecoController {
	
	@Autowired
	private EnderecoRepository repository;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Endereco cadastrar(@RequestBody Endereco endereco) {
		return repository.save(endereco);
	}

}
