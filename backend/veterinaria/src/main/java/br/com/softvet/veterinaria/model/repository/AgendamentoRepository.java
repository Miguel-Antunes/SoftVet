package br.com.softvet.veterinaria.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.softvet.veterinaria.model.entity.Agendamento;

public interface AgendamentoRepository extends JpaRepository<Agendamento, Long> {
	
	

}
