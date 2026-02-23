package com.construhogar.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.construhogar.backend.model.Pedido;
import com.construhogar.backend.service.PedidoService;

@RestController
@RequestMapping("/api/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {

    private final PedidoService pedidoService;

    public PedidoController(PedidoService pedidoService) {
        this.pedidoService = pedidoService;
    }

    // GET - listar todos los pedidos
    @GetMapping
    public List<Pedido> listar() {
        return pedidoService.obtenerTodos();
    }

    // GET - obtener pedido por id
    @GetMapping("/{id}")
    public Pedido obtenerPorId(@PathVariable Integer id) {
        return pedidoService.obtenerPorId(id);
    }
    
    // GET - Obtener pedidos por "estado"
    @GetMapping("/estado/{estado}")
    public List<Pedido> buscarPorEstado(@PathVariable String estado) {
    	return pedidoService.buscarPorEstado(estado);
    }

    // POST - crear pedido
    @PostMapping
    public Pedido crear(@RequestBody Pedido pedido) {
        return pedidoService.guardar(pedido);
    }

    // PUT - actualizar pedido
    @PutMapping("/{id}")
    public Pedido actualizar(@PathVariable Integer id, @RequestBody Pedido pedido) {
        return pedidoService.actualizar(id, pedido);
    }

    // DELETE - eliminar pedido
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        pedidoService.eliminar(id);
    }
    
}



