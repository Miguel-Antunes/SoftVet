package br.com.softvet.veterinaria.model.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.softvet.veterinaria.model.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
	Optional<Usuario> findByNomeDeUsuario(String nomeDeUsuario);
}
