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

import br.com.softvet.veterinaria.model.entity.Medicamento;
import br.com.softvet.veterinaria.model.repository.MedicamentoRepository;

@RestController
@RequestMapping("/api/medicamentos")
@CrossOrigin("http://localhost:4200")
public class MedicamentoController {
	
	@Autowired
	private MedicamentoRepository repository;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Medicamento cadastrar(@RequestBody @Valid Medicamento medicamento) {
		return repository.save(medicamento);
		
	}
	@GetMapping
	public List<Medicamento> recuperarTodos() {
		return repository.findAll();
		
	}
	@GetMapping("{id}")
	public Medicamento recuperarPorId(@PathVariable Long id) {
		return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
		
	}
	
	@DeleteMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deletar (@PathVariable Long id) {
		repository.findById(id)
		.map( animal -> {
			repository.delete(animal);
			return Void.TYPE;
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}
	
	@PutMapping("{id}")
	@ResponseStatus(HttpStatus.OK)
	public void update(@PathVariable Long id, @RequestBody @Valid Medicamento medicamentoAtualizado) {
		repository.findById(id)
		.map(medicamento -> {
			medicamento.setDescricao(medicamentoAtualizado.getDescricao());
			medicamento.setFabricante(medicamentoAtualizado.getFabricante());
			medicamento.setQuantidade(medicamentoAtualizado.getQuantidade());
			medicamento.setUnidade(medicamentoAtualizado.getUnidade());
			medicamento.setDataValidade(medicamentoAtualizado.getDataValidade());
			medicamento.setDataFabricacao(medicamentoAtualizado.getDataFabricacao());
			return repository.save(medicamento);
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}

}
