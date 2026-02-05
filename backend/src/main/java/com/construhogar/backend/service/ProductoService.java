package com.construhogar.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;

import com.construhogar.backend.model.Producto;
import com.construhogar.backend.model.Proveedor;
import com.construhogar.backend.repository.ProductoRepository;
import com.construhogar.backend.repository.ProveedorRepository;

@Service
public class ProductoService {

    private final ProductoRepository productoRepository;
    private final ProveedorRepository proveedorRepository; // Inyectamos el repo de proveedores

    public ProductoService(ProductoRepository productoRepository, ProveedorRepository proveedorRepository) {
        this.productoRepository = productoRepository;
        this.proveedorRepository = proveedorRepository;
    }

    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }

    public Producto obtenerPorId(Integer id) {
        return productoRepository.findById(id).orElse(null);
    }

    /**
     * Guarda el producto asegurando que el proveedor asignado
     * sea un registro real y existente en la base de datos.
     */
    public Producto guardar(Producto producto) {
        if (producto.getProveedor() != null) {
            String tipo = producto.getProveedor().getTipoDocumento();
            String numero = producto.getProveedor().getNumeroDocumentoProv();

            // Buscamos el proveedor real por sus credenciales de documento
            Proveedor proveedorExistente = proveedorRepository
                .findByTipoDocumentoAndNumeroDocumentoProv(tipo, numero)
                .orElseThrow(() -> new RuntimeException("El proveedor con documento " + numero + " no existe."));

            // Seteamos el proveedor encontrado al producto
            producto.setProveedor(proveedorExistente);
        }
        
        return productoRepository.save(producto);
    }

    public void eliminar(Integer id) {
        productoRepository.deleteById(id);
    }
}