package br.com.softvet.veterinaria.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.softvet.veterinaria.model.entity.Consulta;

public interface ConsultasRepository extends JpaRepository<Consulta, Long> {
	List<Consulta> findByIdVeterinario(Long idVeterinario);
	List<Consulta> findByIdAnimal(Long idAnimal);
	


}
