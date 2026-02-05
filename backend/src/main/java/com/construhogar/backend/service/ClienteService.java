package com.construhogar.backend.service;

import java.util.List;
import java.util.Optional; // Importante para el método de búsqueda
import org.springframework.stereotype.Service;

import com.construhogar.backend.model.Cliente;
import com.construhogar.backend.repository.ClienteRepository;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public List<Cliente> obtenerTodos() {
        return clienteRepository.findAll();
    }

    public Cliente obtenerPorId(Integer id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Cliente no encontrado"));
    }

    /**
     * 🔥 MÉTODO ADICIONADO:
     * Este conecta el Controller con el Repository para buscar por Cédula/NIT
     */
    public Optional<Cliente> obtenerPorDocumento(String documento) {
        return clienteRepository.findByNumeroDocumento(documento);
    }

    public Cliente guardar(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public void eliminar(Integer id) {
        clienteRepository.deleteById(id);
    }
}