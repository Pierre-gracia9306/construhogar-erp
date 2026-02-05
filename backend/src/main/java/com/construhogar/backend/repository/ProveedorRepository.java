package com.construhogar.backend.repository;

import com.construhogar.backend.model.Proveedor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional; // Asegúrate de agregar esta

@Repository
public interface ProveedorRepository extends JpaRepository<Proveedor, Integer> {
    // Este método es el que hace la magia de la búsqueda combinada
    Optional<Proveedor> findByTipoDocumentoAndNumeroDocumentoProv(String tipoDocumento, String numeroDocumentoProv);
}