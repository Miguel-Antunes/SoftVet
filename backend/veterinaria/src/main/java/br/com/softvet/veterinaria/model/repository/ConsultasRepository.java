package br.com.softvet.veterinaria.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.softvet.veterinaria.model.entity.Consulta;

public interface ConsultasRepository extends JpaRepository<Consulta, Long> {

}
