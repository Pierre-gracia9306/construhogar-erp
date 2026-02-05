package com.construhogar.backend.controller;

import java.util.Map; // Necesario para la "caja" de datos (JSON)
import org.springframework.web.bind.annotation.*;
import com.construhogar.backend.model.Factura;
import com.construhogar.backend.service.FacturaService;
import java.util.List; // Lo dejo solo si va a usar el método listar abajo

@RestController
@RequestMapping("/api/facturas")
@CrossOrigin(origins = "*")
public class FacturaController {

    private final FacturaService facturaService;

    public FacturaController(FacturaService facturaService) {
        this.facturaService = facturaService;
    }

    // 🔍 Obtener todas las facturas
    @GetMapping
    public List<Factura> listar() {
        return facturaService.obtenerTodos();
    }

    // 🔍 Obtener una factura específica por su ID
    @GetMapping("/{id}")
    public Factura obtenerPorId(@PathVariable Integer id) {
        return facturaService.obtenerPorId(id);
    }

    // 🔥 GENERAR FACTURA (Opción B - RequestBody)
    @PostMapping("/facturar")
    public Factura facturar(@RequestBody Map<String, Object> datos) {
        // Sacamos los datos que vienen del platanito (Frontend)
        Integer idPedido = (Integer) datos.get("idPedido");
        String medioPago = (String) datos.get("medioPago");
        
        // El service ahora sí recibe los dos baldes de información
        return facturaService.facturarPedido(idPedido, medioPago);
    }

    // 🗑️ Eliminar factura (si es necesario)
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Integer id) {
        facturaService.eliminar(id);
    }
}