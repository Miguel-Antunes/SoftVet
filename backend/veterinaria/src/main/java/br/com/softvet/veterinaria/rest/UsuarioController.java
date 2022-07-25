package br.com.softvet.veterinaria.rest;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import br.com.softvet.veterinaria.model.entity.Usuario;
import br.com.softvet.veterinaria.model.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {
	@Autowired
	private final UsuarioRepository repository;
	
	@Autowired
	private PasswordEncoder encoder;
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Usuario cadastrar(@RequestBody @Valid Usuario usuario ) {
		usuario.setSenha(encoder.encode(usuario.getSenha()));
		return repository.save(usuario);
		
	}
	@GetMapping("{username}")
	public Usuario encontrarPorNomeDeUsuario(@PathVariable String username) {
		return repository.findByNomeDeUsuario(username).get();
				
	}
	
	
	@PutMapping("{id}")
	@ResponseStatus(HttpStatus.OK)
	public void editarUsuario(@PathVariable Long id, @RequestBody Usuario usuarioAtualizado) {
		String senha = 	encoder.encode(usuarioAtualizado.getSenha()); 
		repository.findById(id).map(usuario->{
			usuario.setIdAdmin(usuarioAtualizado.getIdAdmin());
			usuario.setNomeDeUsuario(usuarioAtualizado.getNomeDeUsuario());
			usuario.setPermissao(usuarioAtualizado.getPermissao());
			usuario.setPrimeiroAcesso(usuarioAtualizado.getPrimeiroAcesso());
			usuario.setSenha(senha);
			return repository.save(usuario);
		}).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND));
		
	}
	
}
