package com.construhogar.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.construhogar.backend.model.DetallePedido;
import com.construhogar.backend.service.DetallePedidoService;

@RestController
@RequestMapping("/api/detalle-pedidos")
@CrossOrigin(origins = "*")
public class DetallePedidoController {

    private final DetallePedidoService detallePedidoService;

    public DetallePedidoController(DetallePedidoService detallePedidoService) {
        this.detallePedidoService = detallePedidoService;
    }

    // GET - listar todos los detalles
    @GetMapping
    public List<DetallePedido> listar() {
        return detallePedidoService.obtenerTodos();
    }

    // GET - obtener detalle por ID
    @GetMapping("/{id}")
    public DetallePedido obtenerPorId(@PathVariable Integer id) {
        return detallePedidoService.obtenerPorId(id);
    }

    // POST - crear detalle de pedido
    @PostMapping
    public DetallePedido crear(@RequestBody DetallePedido detallePedido) {
        return detallePedidoService.guardar(detallePedido);
    }

    // PUT - actualizar detalle
    @PutMapping("/{id}")
    public DetallePedido actualizar(
            @PathVariable Integer id,
            @RequestBody DetallePedido detallePedido) {

        detallePedido.setIdDetallePedido(id);
        return detallePedidoService.guardar(detallePedido);
    }

    // DELETE - eliminar detalle
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        detallePedidoService.eliminar(id);
    }
}
