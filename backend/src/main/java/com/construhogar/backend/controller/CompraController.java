package com.construhogar.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.construhogar.backend.model.Compra;
import com.construhogar.backend.dto.CompraRequestDTO;
import com.construhogar.backend.service.CompraService;

@RestController
@RequestMapping("/api/compras")
@CrossOrigin(origins = "*")
public class CompraController {

    private final CompraService compraService;

    public CompraController(CompraService compraService) {
        this.compraService = compraService;
    }
    
    @GetMapping("/proveedor/{idProveedor}")
    public List<Compra> obtenerPorProveedor(@PathVariable Integer idProveedor){
    	return compraService.obtenerPorProveedor(idProveedor);
    }

    @GetMapping
    public List<Compra> listar() {
        return compraService.obtenerTodas();
    }

    @GetMapping("/{id}")
    public Compra obtenerPorId(@PathVariable Integer id) {
        return compraService.obtenerPorId(id);
    }

    /**
     * Ajustamos este método para que reciba el DTO (el formulario de React)
     * y use la lógica de negocio que actualiza el inventario.
     */
    @PostMapping
    public Compra crear(@RequestBody CompraRequestDTO compraDto) {
        return compraService.procesarCompraDesdeFrontend(compraDto);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        compraService.eliminar(id);
    }
}