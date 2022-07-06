package br.com.softvet.veterinaria.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.softvet.veterinaria.model.entity.Veterinario;

public interface VeterinarioRepository extends JpaRepository<Veterinario, Integer>{

}
