package br.com.softvet.veterinaria.model.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.softvet.veterinaria.model.entity.Animal;
import br.com.softvet.veterinaria.model.entity.Consulta;
import br.com.softvet.veterinaria.model.entity.Veterinario;

public interface ConsultasRepository extends JpaRepository<Consulta, Long> {
List<Consulta> findByVeterinario(Veterinario veterinario);
List<Consulta> findByAnimal(Animal animal);

}
