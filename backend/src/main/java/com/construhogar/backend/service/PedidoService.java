package com.construhogar.backend.service;

import java.math.BigDecimal;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.construhogar.backend.model.Pedido;
import com.construhogar.backend.model.DetallePedido;
import com.construhogar.backend.model.Inventario;
import com.construhogar.backend.repository.PedidoRepository;
import com.construhogar.backend.repository.InventarioRepository;

@Service
public class PedidoService {

    private final PedidoRepository pedidoRepository;
    private final InventarioRepository inventarioRepository;

    public PedidoService(PedidoRepository pedidoRepository, InventarioRepository inventarioRepository) {
        this.pedidoRepository = pedidoRepository;
        this.inventarioRepository = inventarioRepository;
    }

    public List<Pedido> obtenerTodos() {
        return pedidoRepository.findAll();
    }

    public Pedido obtenerPorId(Integer id) {
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
    }

    // ============================================================
    // GUARDAR (FACTURAR) - Descuenta stock del inventario
    // ============================================================
    @Transactional
    public Pedido guardar(Pedido pedido) {
        if (pedido.getDetalles() != null) {
            for (DetallePedido detalle : pedido.getDetalles()) {
                Integer idProd = detalle.getProducto().getIdProducto();

                // Buscamos el registro en la tabla INVENTARIO usando el ID del producto
                Inventario inventario = inventarioRepository.findByProducto_IdProducto(idProd)
                    .orElseThrow(() -> new RuntimeException("No hay registro de inventario para el material ID: " + idProd));

                // 1. Validamos stock disponible (Usando getStockActual)
                int cantidadDisponible = inventario.getStockActual();
                int cantidadSolicitada = detalle.getCantidad();

                if (cantidadDisponible < cantidadSolicitada) {
                    throw new RuntimeException("⚠️ Stock insuficiente para " + detalle.getProducto().getNombre() + 
                                               ". Disponible: " + cantidadDisponible);
                }

                // 2. DESCONTAMOS DEL INVENTARIO (Usando setStockActual)
                inventario.setStockActual(cantidadDisponible - cantidadSolicitada);
                inventarioRepository.save(inventario);

                // 3. Vinculamos el detalle con el pedido
                detalle.setPedido(pedido);
            }
        }
        return pedidoRepository.save(pedido);
    }

    public void eliminar(Integer id) {
        pedidoRepository.deleteById(id);
    }

    // ============================================================
    // ACTUALIZAR (EDICIÓN)
    // ============================================================
    @Transactional
    public Pedido actualizar(Integer id, Pedido pedidoRequest) {
        Pedido existente = obtenerPorId(id);

        // Actualizamos datos maestros
        existente.setEstado(pedidoRequest.getEstado());
        existente.setTotal(pedidoRequest.getTotal());
        existente.setCliente(pedidoRequest.getCliente());
        existente.setEmpleado(pedidoRequest.getEmpleado());

        // Limpieza de detalles para evitar duplicados o errores de integridad
        existente.getDetalles().clear();
        pedidoRepository.saveAndFlush(existente); 

        // Insertamos los detalles nuevos que vienen de la vista
        if (pedidoRequest.getDetalles() != null) {
            pedidoRequest.getDetalles().forEach(nuevoDetalle -> {
                nuevoDetalle.setPedido(existente);
                existente.getDetalles().add(nuevoDetalle);
            });
        }

        return pedidoRepository.save(existente);
    }

    @Transactional
    public void recalcularTotal(Integer idPedido) {
        Pedido pedido = obtenerPorId(idPedido);
        BigDecimal total = pedidoRepository.sumarSubtotalPorPedido(idPedido);
        pedido.setTotal(total);
        pedidoRepository.save(pedido);
    }
}