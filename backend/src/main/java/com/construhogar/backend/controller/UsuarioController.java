package com.construhogar.backend.controller;

import com.construhogar.backend.model.Empleado;
import com.construhogar.backend.service.UsuarioService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173") // Ajusta al puerto de tu Vite/React
public class UsuarioController {

    private final UsuarioService usuarioService;

    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }

    @PostMapping("/login")
    public Empleado login(@RequestBody Map<String, String> credentials) {
        String correo = credentials.get("correo");
        String password = credentials.get("password");
        
        // Retorna el empleado si todo está bien
        return usuarioService.autenticar(correo, password);
    }
}