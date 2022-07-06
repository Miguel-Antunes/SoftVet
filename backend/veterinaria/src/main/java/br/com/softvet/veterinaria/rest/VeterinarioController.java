package br.com.softvet.veterinaria.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
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

import br.com.softvet.veterinaria.model.entity.Veterinario;
import br.com.softvet.veterinaria.model.repository.VeterinarioRepository;

@RestController
@RequestMapping("/api/veterinarios")
@CrossOrigin("http://localhost:4200")
public class VeterinarioController {
	
	@Autowired
	private VeterinarioRepository repository;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Veterinario cadastrar(@RequestBody Veterinario veterinario) {
		return repository.save(veterinario);
	}
	
	@GetMapping("{id}")
	public Veterinario FindById(@PathVariable Integer id) {
		return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}
	
	@DeleteMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deletar(@PathVariable Integer id) {
		repository
			.findById(id).map( veterinario -> {
				repository.delete(veterinario);
				return Void.TYPE;
			})
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
		
	}
	
	@PutMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void update(@PathVariable Integer id, @RequestBody Veterinario veterinarioAtualizado) {
		repository
		.findById(id)
		.map(veterinario -> { 
			veterinario.setNome(veterinarioAtualizado.getNome());
			veterinario.setCpf(veterinarioAtualizado.getCpf());
			veterinario.setDataNascimento(veterinarioAtualizado.getDataNascimento());
			return repository.save(veterinario);
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	
	}

}
