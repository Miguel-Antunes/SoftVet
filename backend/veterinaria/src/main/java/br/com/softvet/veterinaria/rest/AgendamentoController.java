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

import br.com.softvet.veterinaria.model.entity.Agendamento;
import br.com.softvet.veterinaria.model.repository.AgendamentoRepository;

@RestController
@RequestMapping("/api/agendamentos")
public class AgendamentoController {
	 
	@Autowired
	private AgendamentoRepository repository;

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Agendamento cadastrar(@RequestBody @Valid Agendamento agendamento){
		return repository.save(agendamento);
		
	}
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Agendamento> recuperarTodos(){
		return repository.findAll();		
	}
	
	@GetMapping("{id}")
	@ResponseStatus(HttpStatus.OK)
	public Agendamento recuperarPorId(@PathVariable Long id) {
		return repository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}
	@PutMapping("{id}")
	@ResponseStatus(HttpStatus.OK)
	public Agendamento atualizar (@PathVariable Long id, @RequestBody @Valid Agendamento agendamentoAtualizado) {
		repository.findById(id).map(agendamento -> {
			agendamento.setDescricao(agendamentoAtualizado.getDescricao());
			agendamento.setPrioridade(agendamentoAtualizado.getPrioridade());
			agendamento.setAnimal(agendamentoAtualizado.getAnimal());
			agendamento.setVeterinario(agendamentoAtualizado.getVeterinario());
			agendamento.setDataRealizacao(agendamentoAtualizado.getDataRealizacao());
			return repository.save(agendamento);
		}).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
		return repository.findById(id).get();
		
		
		
	}
	@DeleteMapping("{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deletar(@PathVariable Long id) {
		repository.findById(id).map(agendamento ->{
			repository.delete(agendamento);
			return Void.TYPE;
		}).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}
	
}
