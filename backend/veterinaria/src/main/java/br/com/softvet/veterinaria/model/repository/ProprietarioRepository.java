package br.com.softvet.veterinaria.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.softvet.veterinaria.model.entity.Proprietario;

public interface ProprietarioRepository extends JpaRepository<Proprietario, Integer> {

}
