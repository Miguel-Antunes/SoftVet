package br.com.softvet.veterinaria.rest;

import java.util.List;

import javax.validation.Valid;

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

import br.com.softvet.veterinaria.model.entity.Veterinario;
import br.com.softvet.veterinaria.model.repository.VeterinarioRepository;

@RestController
@RequestMapping("/api/veterinarios")
public class VeterinarioController {
	
	@Autowired
	private VeterinarioRepository repository;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Veterinario cadastrar(@RequestBody @Valid Veterinario veterinario) {
		return repository.save(veterinario);
	}
	
	@GetMapping
	public List<Veterinario> recuperarTodos(){
		
		return repository.findAll();
		
	}
	
	@GetMapping("{id}")
	public Veterinario recuperarPorId(@PathVariable Integer id) {
		return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Veterinário não Encontrado!"));
	}
	
	@DeleteMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deletar(@PathVariable Integer id) {
		repository
			.findById(id).map( veterinario -> {
				repository.delete(veterinario);
				return Void.TYPE;
			})
			.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Veterinário não Encontrado!"));
		
	}
	
	@PutMapping("{id}")
	@ResponseStatus(HttpStatus.OK)
	public void update(@PathVariable Integer id, @RequestBody Veterinario veterinarioAtualizado) {
		repository
		.findById(id)
		.map(veterinario -> { 
			veterinario.setNome(veterinarioAtualizado.getNome());
			veterinario.setCpf(veterinarioAtualizado.getCpf());
			veterinario.setTelefone(veterinarioAtualizado.getTelefone());
			veterinario.setDataNascimento(veterinarioAtualizado.getDataNascimento());
			veterinario.setEmail(veterinarioAtualizado.getEmail());
			veterinario.setSexo(veterinarioAtualizado.getSexo());
			veterinario.setCep(veterinarioAtualizado.getCep());
			veterinario.setUf(veterinarioAtualizado.getUf());
			veterinario.setCidade(veterinarioAtualizado.getCidade());
			veterinario.setRua(veterinarioAtualizado.getRua());
			veterinario.setNumero(veterinarioAtualizado.getNumero());
			veterinario.setComplemento(veterinarioAtualizado.getComplemento());
			return repository.save(veterinario);
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	
	}

}
