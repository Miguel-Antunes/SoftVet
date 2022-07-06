package br.com.softvet.veterinaria.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.com.softvet.veterinaria.model.entity.Estado;
import br.com.softvet.veterinaria.model.repository.EstadoRepository;

@RestController
@RequestMapping("/api/estados")
public class EstadoController {
	
	@Autowired
	private EstadoRepository repository;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Estado cadastrar(@RequestBody Estado estado) {
		return repository.save(estado);
		
	}
	
	@GetMapping("{id}")
	public Estado FindById(@PathVariable Integer id) {
		return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}
	
	@DeleteMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deletar(@PathVariable Integer id) {
		repository
			.findById(id).map( estado -> {
				repository.delete(estado);
				return Void.TYPE;
			})
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
		
	}
	
	@PutMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void update(@PathVariable Integer id, @RequestBody Estado estadoAtualizado) {
		repository
		.findById(id)
		.map(estado -> { 
			estado.setUf(estadoAtualizado.getUf());
			estado.setDescricao(estadoAtualizado.getDescricao());
			return repository.save(estado);
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	
	}
	

}
