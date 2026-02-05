package com.construhogar.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.construhogar.backend.model.Factura;
import com.construhogar.backend.model.Pedido;
import com.construhogar.backend.repository.FacturaRepository;

@Service
public class FacturaService {

    private final FacturaRepository facturaRepository;
    private final PedidoService pedidoService;
    private final InventarioService inventarioService;

    public FacturaService(
            FacturaRepository facturaRepository,
            PedidoService pedidoService,
            InventarioService inventarioService) {
        this.facturaRepository = facturaRepository;
        this.pedidoService = pedidoService;
        this.inventarioService = inventarioService;
    }

    public List<Factura> obtenerTodos() {
        return facturaRepository.findAll();
    }

    public Factura obtenerPorId(Integer id) {
        // 🚀 Cambiado para usar la consulta con FETCH
        return facturaRepository.findByIdConDetalles(id)
                .orElseThrow(() -> new RuntimeException("Factura no encontrada o datos incompletos"));
    }

    public void eliminar(Integer id) {
        facturaRepository.deleteById(id);
    }

    @Transactional
    public Factura facturarPedido(Integer idPedido, String medioPago) {
        Pedido pedido = pedidoService.obtenerPorId(idPedido);

        if (!"CONFIRMADO".equals(pedido.getEstado())) {
            throw new RuntimeException("El pedido debe estar CONFIRMADO para facturar.");
        }

        pedido.getDetalles().forEach(detalle -> {
            inventarioService.reducirStock(
                    detalle.getProducto().getIdProducto(),
                    detalle.getCantidad()
            );
        });

        pedido.setEstado("FACTURADO");

        Factura factura = new Factura();
        factura.setPedido(pedido);
        factura.setTotal(pedido.getTotal());
        factura.setMedioPago(medioPago);

        return facturaRepository.save(factura);
    }
}