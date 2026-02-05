package com.construhogar.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.construhogar.backend.model.Cliente;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Integer> {
    
    // Método para buscar por número de documento (Cédula/NIT)
    Optional<Cliente> findByNumeroDocumento(String numeroDocumento);
}