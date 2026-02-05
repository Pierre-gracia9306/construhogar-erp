package com.construhogar.backend.service;

import com.construhogar.backend.model.Empleado;
import com.construhogar.backend.model.Usuario;
import com.construhogar.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    public Empleado autenticar(String correo, String password) {
        // 1. Buscamos al usuario por correo
        Optional<Usuario> usuarioOpt = usuarioRepository.findByCorreo(correo);

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            // 2. Verificamos la contraseña (objetivo y serio: comparación directa por ahora)
            if (usuario.getPassword().equals(password)) {
                // 3. Si coincide, devolvemos el Empleado vinculado
                return usuario.getEmpleado();
            }
        }
        
        // Si no existe o la clave falla, lanzamos error
        throw new RuntimeException("Correo o contraseña incorrectos");
    }
}