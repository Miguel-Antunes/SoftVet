package br.com.softvet.veterinaria.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.softvet.veterinaria.model.entity.Consulta;
import br.com.softvet.veterinaria.model.repository.ConsultasRepository;

@RestController
@RequestMapping("/api/consultas")
public class ConsultaController {
	
	@Autowired
	private ConsultasRepository repository;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Consulta cadastrar(@RequestBody Consulta consulta) {
		return repository.save(consulta);
		
	}

}
