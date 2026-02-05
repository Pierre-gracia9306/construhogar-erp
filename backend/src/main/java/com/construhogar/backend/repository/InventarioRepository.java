package com.construhogar.backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.construhogar.backend.model.Inventario;
import com.construhogar.backend.model.Producto;

public interface InventarioRepository extends JpaRepository<Inventario, Integer> {

    Optional<Inventario> findByProducto(Producto producto);

    Optional<Inventario> findByProducto_IdProducto(Integer idProducto);
}
