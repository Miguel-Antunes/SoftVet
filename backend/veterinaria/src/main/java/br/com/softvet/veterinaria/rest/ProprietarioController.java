package br.com.softvet.veterinaria.rest;

import java.util.List;

import javax.validation.Valid;

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

import br.com.softvet.veterinaria.model.entity.Proprietario;
import br.com.softvet.veterinaria.model.repository.ProprietarioRepository;

@RestController
@RequestMapping("/api/proprietarios")
@CrossOrigin("http://localhost:4200")
public class ProprietarioController {

	@Autowired
	private ProprietarioRepository repository;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Proprietario cadastrar(@RequestBody @Valid Proprietario proprietario) {
		return repository.save(proprietario);
	}
	@GetMapping
	public List<Proprietario> recuperarTodos(){
		return repository.findAll();
	}
	
	@GetMapping("{id}")
	public Proprietario recuperarporId(@PathVariable Integer id) {
		return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}

	@DeleteMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deletar(@PathVariable Integer id) {
		repository.findById(id).map(propreietario -> {
			repository.delete(propreietario);
			return Void.TYPE;
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

	}

	@PutMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void update(@PathVariable Integer id, @RequestBody Proprietario proprietarioAtualizado) {
		repository.findById(id).map(proprietario -> {
			proprietario.setNome(proprietarioAtualizado.getNome());
			proprietario.setCpf(proprietarioAtualizado.getCpf());
			proprietario.setDataNascimento(proprietarioAtualizado.getDataNascimento());
			proprietario.setTelefone(proprietarioAtualizado.getTelefone());
			proprietario.setEmail(proprietarioAtualizado.getEmail());
			proprietario.setSexo(proprietarioAtualizado.getSexo());
			proprietario.setCep(proprietarioAtualizado.getCep());
			proprietario.setUf(proprietarioAtualizado.getUf());
			proprietario.setCidade(proprietarioAtualizado.getCidade());
			proprietario.setRua(proprietarioAtualizado.getRua());
			proprietario.setNumero(proprietarioAtualizado.getNumero());
			proprietario.setComplemento(proprietarioAtualizado.getComplemento());
			return repository.save(proprietario);
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

	}

}
