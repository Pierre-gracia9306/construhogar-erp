package com.construhogar.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.construhogar.backend.model.DetallePedido;
import com.construhogar.backend.repository.DetallePedidoRepository;

@Service
public class DetallePedidoService {

    private final DetallePedidoRepository detalleRepo;
    private final PedidoService pedidoService;

    public DetallePedidoService(
            DetallePedidoRepository detalleRepo,
            PedidoService pedidoService) {
        this.detalleRepo = detalleRepo;
        this.pedidoService = pedidoService;
    }

    // 🔹 CRUD
    public List<DetallePedido> obtenerTodos() {
        return detalleRepo.findAll();
    }

    public DetallePedido obtenerPorId(Integer id) {
        return detalleRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Detalle no encontrado"));
    }

    // 🔥 NEGOCIO
    @Transactional
    public DetallePedido guardar(DetallePedido detalle) {
        DetallePedido saved = detalleRepo.save(detalle);
        pedidoService.recalcularTotal(detalle.getPedido().getIdPedido());
        return saved;
    }

    @Transactional
    public void eliminar(Integer id) {
        DetallePedido detalle = obtenerPorId(id);
        Integer idPedido = detalle.getPedido().getIdPedido();
        detalleRepo.delete(detalle);
        pedidoService.recalcularTotal(idPedido);
    }
}


