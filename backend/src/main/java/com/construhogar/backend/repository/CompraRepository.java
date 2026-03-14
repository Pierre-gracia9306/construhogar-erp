package com.construhogar.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.construhogar.backend.model.Compra;

@Repository
public interface CompraRepository extends JpaRepository<Compra, Integer> {
	// NUEVO METODO: Buscar compras por proveedor
	List<Compra> findByProveedor_IdProveedor(Integer idProveedor);
}
