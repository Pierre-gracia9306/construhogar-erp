package com.construhogar.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.construhogar.backend.model.Producto;
import com.construhogar.backend.service.ProductoService;

@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    private final ProductoService productoService;

    public ProductoController(ProductoService productoService) {
        this.productoService = productoService;
    }

    // GET - listar todos los productos
    @GetMapping
    public List<Producto> listar() {
        return productoService.obtenerTodos();
    }

    // GET - obtener producto por id
    @GetMapping("/{id}")
    public Producto obtenerPorId(@PathVariable Integer id) {
        return productoService.obtenerPorId(id);
    }

    // POST - crear producto
    @PostMapping
    public Producto crear(@RequestBody Producto producto) {
        return productoService.guardar(producto);
    }

    // PUT - actualizar producto
    @PutMapping("/{id}")
    public Producto actualizar(@PathVariable Integer id, @RequestBody Producto producto) {
        producto.setIdProducto(id);
        return productoService.guardar(producto);
    }

    // DELETE - eliminar producto
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        productoService.eliminar(id);
    }
}

