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

import br.com.softvet.veterinaria.model.entity.Animal;

import br.com.softvet.veterinaria.model.repository.AnimalRepository;
import br.com.softvet.veterinaria.model.repository.ProprietarioRepository;

@RestController
@RequestMapping("/api/animais")
public class AnimalController {
	
	@Autowired
	private AnimalRepository repository;
	
	@Autowired
	private ProprietarioRepository proprietarioRepository;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Animal cadastrar(@RequestBody @Valid Animal animal) {
		return repository.save(animal);
	}
	
	@GetMapping
	public List<Animal> recuperarTodos() {
		return repository.findAll();
		
	}
	
	@GetMapping("{id}")
	public Animal recuperarPorId(@PathVariable Long id) {
		return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}
	
	@GetMapping("/proprietario/{id}")
	public List<Animal> recuperarAnimalPorProprietario(@PathVariable Long id){
		return repository.findByProprietario(proprietarioRepository.findById(id).get());
		
	}

	
	@PutMapping("{id}")
	@ResponseStatus(HttpStatus.OK)
	public void update(@PathVariable Long id, @RequestBody Animal animalAtualizado) {
		repository
		.findById(id)
		.map(animal -> { 
			animal.setProprietario(animalAtualizado.getProprietario());
			animal.setNome(animalAtualizado.getNome());
			animal.setIdade(animalAtualizado.getIdade());
			animal.setSexo(animalAtualizado.getSexo());
			animal.setEspecie(animalAtualizado.getEspecie());
			animal.setRaca(animalAtualizado.getRaca());
			animal.setCor(animalAtualizado.getCor());
			animal.setAltura(animalAtualizado.getAltura());
			animal.setPeso(animalAtualizado.getPeso());
			animal.setTipoSangue(animalAtualizado.getTipoSangue());
			return repository.save(animal);
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	
	}

}
