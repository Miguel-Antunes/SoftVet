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
import br.com.softvet.veterinaria.model.repository.AnimalRepository;
import br.com.softvet.veterinaria.model.repository.ConsultasRepository;
import br.com.softvet.veterinaria.model.repository.VeterinarioRepository;

@RestController
@RequestMapping("/api/consultas")
public class ConsultaController {
	
	@Autowired
	private ConsultasRepository consultaRepository;
	
	@Autowired
	private VeterinarioRepository veterinarioRepository;
	
	@Autowired
	private AnimalRepository animalRepository;
	
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Consulta cadastrar(@RequestBody Consulta consulta) {
		return consultaRepository.save(consulta);
		
	}
	
	@GetMapping("{id}")
	@ResponseStatus(HttpStatus.OK)
	public Consulta encontrarPorId(@PathVariable Long id){
		return consultaRepository.findById(id).orElseThrow(()-> new ResponseStatusException(HttpStatus.NOT_FOUND));
	}
	
	@GetMapping
	@ResponseStatus(HttpStatus.OK)
	public List<Consulta> encontrarTodos(){
		return consultaRepository.findAll();
		
	}
	@GetMapping("/veterinario/{id}")
	@ResponseStatus(HttpStatus.OK)
	public List<Consulta> recuperarConsultasPorVeterinario(@PathVariable Long id){
		return consultaRepository.findByVeterinario(veterinarioRepository.findById(id).get());
		
	}
	
	@GetMapping("/animal/{id}")
	@ResponseStatus(HttpStatus.OK)
	public List<Consulta> recuperarConsultaPorAnimal(@PathVariable Long id){
		return consultaRepository.findByAnimal(animalRepository.findById(id).get());
	}
	
	
	
}
