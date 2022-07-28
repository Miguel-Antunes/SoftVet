package br.com.softvet.veterinaria.rest;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

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
	
	@GetMapping("{id}")
	@ResponseStatus(HttpStatus.FOUND)
	public Consulta encontrarPorId(@PathVariable Long id){
		return repository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}
	
	@GetMapping
	@ResponseStatus(HttpStatus.FOUND)
	public List<Consulta> encontrarTodos(){
		return repository.findAll();
		
	}
	@GetMapping("/veterinario/{id}")
	@ResponseStatus(HttpStatus.OK)
	public List<Consulta> recuperarConsultasPorVeterinario(@PathVariable Long id){
		return repository.findByIdVeterinario(id);
	}
	@GetMapping("/animal/{id}")
	@ResponseStatus(HttpStatus.OK)
	public List<Consulta> recuperarConsultasPorAnimal(@PathVariable Long id){
		return repository.findByIdAnimal(id);
	}
	
	
	
	
	
}
