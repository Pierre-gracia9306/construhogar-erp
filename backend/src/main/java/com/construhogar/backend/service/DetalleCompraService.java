package com.construhogar.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.construhogar.backend.model.DetalleCompra;
import com.construhogar.backend.repository.DetalleCompraRepository;

@Service
public class DetalleCompraService {

    private final DetalleCompraRepository detalleRepo;
    private final InventarioService inventarioService;
    private final CompraService compraService;

    public DetalleCompraService(
            DetalleCompraRepository detalleRepo,
            InventarioService inventarioService,
            CompraService compraService) {
        this.detalleRepo = detalleRepo;
        this.inventarioService = inventarioService;
        this.compraService = compraService;
    }

    // ======================
    // CRUD
    // ======================

    public List<DetalleCompra> obtenerTodos() {
        return detalleRepo.findAll();
    }

    public DetalleCompra obtenerPorId(Integer id) {
        return detalleRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Detalle no encontrado"));
    }

    // ======================
    // NEGOCIO
    // ======================

    @Transactional
    public DetalleCompra guardar(DetalleCompra detalle) {

        DetalleCompra saved = detalleRepo.save(detalle);

        inventarioService.aumentarStock(
                detalle.getProducto(),
                detalle.getCantidad()
        );

        compraService.recalcularTotal(
                detalle.getCompra().getIdCompra()
        );

        return saved;
    }

    @Transactional
    public void eliminar(Integer id) {

        DetalleCompra detalle = obtenerPorId(id);

        detalleRepo.delete(detalle);

        compraService.recalcularTotal(
                detalle.getCompra().getIdCompra()
        );
    }
}