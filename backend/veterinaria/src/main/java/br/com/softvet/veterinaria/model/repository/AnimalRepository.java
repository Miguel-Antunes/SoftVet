package br.com.softvet.veterinaria.model.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.softvet.veterinaria.model.entity.Animal;
import br.com.softvet.veterinaria.model.entity.Proprietario;




public interface AnimalRepository  extends JpaRepository<Animal, Long>{
	
	List<Animal>findByProprietario(Proprietario proprietario);

}
