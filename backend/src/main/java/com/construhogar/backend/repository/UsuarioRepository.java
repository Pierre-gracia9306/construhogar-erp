package com.construhogar.backend.repository;

import com.construhogar.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
    // Método clave para el login: buscar por correo
    Optional<Usuario> findByCorreo(String correo);
}