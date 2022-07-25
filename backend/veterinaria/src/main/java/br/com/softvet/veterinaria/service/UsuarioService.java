package br.com.softvet.veterinaria.service;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import br.com.softvet.veterinaria.model.entity.Usuario;
import br.com.softvet.veterinaria.model.repository.UsuarioRepository;

@Service
public class UsuarioService implements UserDetailsService{

	@Autowired
	private UsuarioRepository repository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	Usuario usuario = repository.findByNomeDeUsuario(username)
			.orElseThrow(()-> new UsernameNotFoundException("Login não foi encontrado!"));
	return User
			.builder()
			.username(usuario.getNomeDeUsuario())
			.password(usuario.getSenha())
			.roles(usuario.getPermissao())
			.build();
	}
	

}
