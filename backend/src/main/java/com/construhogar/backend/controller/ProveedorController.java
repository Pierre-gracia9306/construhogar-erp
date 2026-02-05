package com.construhogar.backend.controller;

import java.util.List;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.construhogar.backend.model.Proveedor;
import com.construhogar.backend.service.ProveedorService;

@RestController
@RequestMapping("/api/proveedores")
@CrossOrigin(origins = "*")
public class ProveedorController {

    private final ProveedorService proveedorService;

    public ProveedorController(ProveedorService proveedorService) {
        this.proveedorService = proveedorService;
    }

    // Buscar por documento para la consulta en el Frontend
    @GetMapping("/buscar")
    public ResponseEntity<?> buscarPorDocumento(
            @RequestParam String tipo, 
            @RequestParam String numero) {
        
        Proveedor proveedor = proveedorService.buscarPorDocumento(tipo, numero);
        
        if (proveedor == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body("Proveedor no encontrado.");
        }
        
        return ResponseEntity.ok(proveedor);
    }

    @GetMapping
    public List<Proveedor> listar() {
        return proveedorService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public Proveedor obtenerPorId(@PathVariable Integer id) {
        return proveedorService.obtenerPorId(id);
    }

    @PostMapping
    public Proveedor crear(@RequestBody Proveedor proveedor) {
        return proveedorService.guardar(proveedor);
    }

    // MÉTODO ACTUALIZAR CORREGIDO PARA PERSISTENCIA TOTAL
    @PutMapping("/{id}")
    public ResponseEntity<Proveedor> actualizar(@PathVariable Integer id, @RequestBody Proveedor datosNuevos) {
        try {
            // 1. Buscamos el registro real en la BD
            Proveedor proveedorExistente = proveedorService.obtenerPorId(id);

            // 2. Seteamos manualmente cada campo para asegurar la actualización
            proveedorExistente.setNombre(datosNuevos.getNombre());
            proveedorExistente.setTipoDocumento(datosNuevos.getTipoDocumento());
            proveedorExistente.setNumeroDocumentoProv(datosNuevos.getNumeroDocumentoProv());
            proveedorExistente.setContacto(datosNuevos.getContacto());
            proveedorExistente.setDireccion(datosNuevos.getDireccion());
            proveedorExistente.setEmail(datosNuevos.getEmail());
            proveedorExistente.setTelefono(datosNuevos.getTelefono());

            // 3. Guardamos el objeto que ya está gestionado por JPA
            Proveedor actualizado = proveedorService.guardar(proveedorExistente);
            
            return ResponseEntity.ok(actualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        proveedorService.eliminar(id);
    }
}