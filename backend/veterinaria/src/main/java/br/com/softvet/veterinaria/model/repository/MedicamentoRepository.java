package br.com.softvet.veterinaria.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.softvet.veterinaria.model.entity.Medicamento;

public interface MedicamentoRepository extends JpaRepository<Medicamento, Long> {

}
