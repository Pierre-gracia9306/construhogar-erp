package com.construhogar.backend.service;

import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.construhogar.backend.model.Inventario;
import com.construhogar.backend.model.Producto;
import com.construhogar.backend.repository.InventarioRepository;
import com.construhogar.backend.repository.ProductoRepository; // Importante para buscar el material

@Service
public class InventarioService {

    private final InventarioRepository inventarioRepository;
    private final ProductoRepository productoRepository; // Inyectamos el repositorio de productos

    public InventarioService(InventarioRepository inventarioRepository, ProductoRepository productoRepository) {
        this.inventarioRepository = inventarioRepository;
        this.productoRepository = productoRepository;
    }

    // ======================
    // CRUD BÁSICO
    // ======================

    public List<Inventario> obtenerTodos() {
        return inventarioRepository.findAll();
    }

    public Inventario obtenerPorId(Integer id) {
        return inventarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Inventario no encontrado"));
    }

    public Inventario guardar(Inventario inventario) {
        return inventarioRepository.save(inventario);
    }

    public void eliminar(Integer id) {
        inventarioRepository.deleteById(id);
    }

    // ======================
    // LÓGICA DE NEGOCIO
    // ======================

    /**
     * Este método es el que usará el Frontend para las entradas.
     * Busca el producto por su ID y luego aumenta el stock.
     */
    @Transactional
    public void registrarEntrada(Integer idProducto, Integer cantidad) {
        // 1. Verificamos que el producto exista en la base de datos
        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new RuntimeException("El producto con ID " + idProducto + " no existe."));
        
        // 2. Llamamos a la lógica de aumento de stock
        this.aumentarStock(producto, cantidad);
    }

    /**
     * 🔥 NUEVO MÉTODO: Registrar salida de material (Ajuste manual)
     * Busca el producto y reduce el stock validando existencias.
     */
    @Transactional
    public void registrarSalida(Integer idProducto, Integer cantidad) {
        // Verificamos que el producto exista
        if (!productoRepository.existsById(idProducto)) {
            throw new RuntimeException("El producto con ID " + idProducto + " no existe.");
        }
        // Ejecutamos la reducción de stock
        this.reducirStock(idProducto, cantidad);
    }

    // 🔼 COMPRA → aumenta stock (Lógica interna)
    @Transactional
    public void aumentarStock(Producto producto, Integer cantidad) {

        Inventario inventario = inventarioRepository
                .findByProducto(producto)
                .orElseGet(() -> {
                    // Si el producto no tiene registro en inventario, lo creamos desde cero
                    Inventario nuevo = new Inventario();
                    nuevo.setProducto(producto);
                    nuevo.setStockActual(0);
                    return nuevo;
                });

        // Sumamos la nueva cantidad al stock que ya existía
        inventario.setStockActual(
                inventario.getStockActual() + cantidad
        );

        inventarioRepository.save(inventario);
    }

    // 🔽 VENTA / AJUSTE → reduce stock
    @Transactional
    public void reducirStock(Integer idProducto, Integer cantidad) {

        Inventario inventario = inventarioRepository
                .findByProducto_IdProducto(idProducto)
                .orElseThrow(() -> new RuntimeException("Producto sin inventario"));

        if (inventario.getStockActual() < cantidad) {
            throw new RuntimeException("Stock insuficiente en bodega");
        }

        inventario.setStockActual(
                inventario.getStockActual() - cantidad
        );

        inventarioRepository.save(inventario);
    }
}