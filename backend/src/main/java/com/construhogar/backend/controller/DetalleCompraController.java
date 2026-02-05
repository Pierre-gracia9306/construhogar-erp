package com.construhogar.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.construhogar.backend.model.DetalleCompra;
import com.construhogar.backend.service.DetalleCompraService;

@RestController
@RequestMapping("/api/detalle-compras")
@CrossOrigin(origins = "*")
public class DetalleCompraController {

    private final DetalleCompraService detalleCompraService;

    public DetalleCompraController(DetalleCompraService detalleCompraService) {
        this.detalleCompraService = detalleCompraService;
    }

    @GetMapping
    public List<DetalleCompra> listar() {
        return detalleCompraService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public DetalleCompra obtenerPorId(@PathVariable Integer id) {
        return detalleCompraService.obtenerPorId(id);
    }

    @PostMapping
    public DetalleCompra crear(@RequestBody DetalleCompra detalleCompra) {
        return detalleCompraService.guardar(detalleCompra);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        detalleCompraService.eliminar(id);
    }
}
