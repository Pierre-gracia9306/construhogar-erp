package com.construhogar.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.construhogar.backend.model.Proveedor;
import com.construhogar.backend.repository.ProveedorRepository;

@Service
public class ProveedorService {

    private final ProveedorRepository proveedorRepository;

    public ProveedorService(ProveedorRepository proveedorRepository) {
        this.proveedorRepository = proveedorRepository;
    }

    public List<Proveedor> obtenerTodos() {
        return proveedorRepository.findAll();
    }

    public Proveedor obtenerPorId(Integer id) {
        return proveedorRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Proveedor no encontrado"));
    }

    // --- MÉTODO AGREGADO ---
    public Proveedor buscarPorDocumento(String tipo, String numero) {
        return proveedorRepository.findByTipoDocumentoAndNumeroDocumentoProv(tipo, numero)
                .orElse(null);
    }

    public Proveedor guardar(Proveedor proveedor) {
        return proveedorRepository.save(proveedor);
    }

    public void eliminar(Integer id) {
        proveedorRepository.deleteById(id);
    }
}