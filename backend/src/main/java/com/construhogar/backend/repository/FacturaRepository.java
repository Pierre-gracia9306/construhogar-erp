package com.construhogar.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.construhogar.backend.model.Factura;
import java.util.Optional;

@Repository
public interface FacturaRepository extends JpaRepository<Factura, Integer> {

    @Query("SELECT f FROM Factura f " +
           "LEFT JOIN FETCH f.pedido p " +
           "LEFT JOIN FETCH p.detalles d " +
           "LEFT JOIN FETCH d.producto " +
           "WHERE f.idFactura = :id")
    Optional<Factura> findByIdConDetalles(@Param("id") Integer id);
}