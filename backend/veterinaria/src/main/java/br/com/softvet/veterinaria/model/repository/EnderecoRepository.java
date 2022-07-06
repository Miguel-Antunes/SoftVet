package br.com.softvet.veterinaria.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.softvet.veterinaria.model.entity.Endereco;

public interface EnderecoRepository extends JpaRepository<Endereco, Long> {

}
