package br.com.softvet.veterinaria.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.softvet.veterinaria.model.entity.Cidade;
import br.com.softvet.veterinaria.model.repository.CidadeRepository;

@RestController
@RequestMapping("/api/cidades")
public class CidadeController {
	
	@Autowired
	private CidadeRepository repository;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	private Cidade cadastrar(@RequestBody Cidade cidade) {
		return repository.save(cidade);
	}

}
