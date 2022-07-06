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

import br.com.softvet.veterinaria.model.entity.Proprietario;
import br.com.softvet.veterinaria.model.repository.ProprietarioRepository;

@RestController
@RequestMapping("/api/proprietarios")
public class ProprietarioController {

	@Autowired
	private ProprietarioRepository repository;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Proprietario cadastrar(@RequestBody Proprietario proprietario) {
		return repository.save(proprietario);
	}

	@GetMapping("{id}")
	public Proprietario FindById(@PathVariable Integer id) {
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
//			proprietario.setEndereco(proprietarioAtualizado.getEndereco());
			proprietario.setEmail(proprietarioAtualizado.getEmail());
			proprietario.setSexo(proprietarioAtualizado.getSexo());
			proprietario.setEstadoCivil(proprietarioAtualizado.getEstadoCivil());
			return repository.save(proprietario);
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

	}

}
