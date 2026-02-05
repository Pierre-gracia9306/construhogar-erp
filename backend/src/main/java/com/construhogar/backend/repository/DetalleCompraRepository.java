package com.construhogar.backend.repository;

import java.math.BigDecimal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.construhogar.backend.model.DetalleCompra;

@Repository
public interface DetalleCompraRepository extends JpaRepository<DetalleCompra, Integer> {

    @Query("""
        SELECT COALESCE(SUM(d.subtotal), 0)
        FROM DetalleCompra d
        WHERE d.compra.idCompra = :idCompra
    """)
    BigDecimal sumarSubtotalPorCompra(@Param("idCompra") Integer idCompra);
}
