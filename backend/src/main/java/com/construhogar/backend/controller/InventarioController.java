package com.construhogar.backend.controller;

import java.util.List;
import java.util.Map;
import org.springframework.web.bind.annotation.*;

import com.construhogar.backend.model.Inventario;
import com.construhogar.backend.service.InventarioService;
import com.construhogar.backend.repository.InventarioRepository;

@RestController
@RequestMapping("/api/inventarios")
@CrossOrigin(origins = "*")
public class InventarioController {

    private final InventarioService inventarioService;
    private final InventarioRepository inventarioRepository;

    public InventarioController(InventarioService inventarioService, InventarioRepository inventarioRepository) {
        this.inventarioService = inventarioService;
        this.inventarioRepository = inventarioRepository;
    }

    // GET - Listar todo el inventario de la ferretería
    @GetMapping
    public List<Inventario> listar() {
        return inventarioService.obtenerTodos();
    }

    // GET - Obtener un registro por el ID de la tabla inventario
    @GetMapping("/{id}")
    public Inventario obtenerPorId(@PathVariable Integer id) {
        return inventarioService.obtenerPorId(id);
    }

    // GET - Buscar stock detallado enviando el ID del material/producto
    @GetMapping("/producto/{idProducto}")
    public Inventario obtenerPorIdProducto(@PathVariable Integer idProducto) {
        return inventarioRepository.findByProducto_IdProducto(idProducto)
                .orElseThrow(() -> new RuntimeException("No se encontró inventario para el producto con ID: " + idProducto));
    }

    /**
     * POST - Endpoint para registrar entradas de material (compras).
     */
    @PostMapping("/entrada")
    public void entradaMaterial(@RequestBody Map<String, Object> payload) {
        Integer idProducto = Integer.parseInt(payload.get("idProducto").toString());
        Integer cantidad = Integer.parseInt(payload.get("cantidad").toString());
        inventarioService.registrarEntrada(idProducto, cantidad);
    }

    /**
     * 🔥 NUEVO ENDPOINT: Registrar salidas de material (Ajustes manuales).
     * Recibe un JSON con idProducto y cantidad para restar del stock.
     */
    @PostMapping("/salida")
    public void salidaMaterial(@RequestBody Map<String, Object> payload) {
        Integer idProducto = Integer.parseInt(payload.get("idProducto").toString());
        Integer cantidad = Integer.parseInt(payload.get("cantidad").toString());
        
        // Ejecutamos la reducción manual de stock
        inventarioService.registrarSalida(idProducto, cantidad);
    }

    // POST - Crear un registro de inventario desde cero (CRUD básico)
    @PostMapping
    public Inventario crear(@RequestBody Inventario inventario) {
        return inventarioService.guardar(inventario);
    }

    // PUT - Actualizar un registro de inventario existente
    @PutMapping("/{id}")
    public Inventario actualizar(
            @PathVariable Integer id,
            @RequestBody Inventario inventario) {
        inventario.setIdInventario(id);
        return inventarioService.guardar(inventario);
    }

    // DELETE - Borrar un registro del inventario
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        inventarioService.eliminar(id);
    }
}