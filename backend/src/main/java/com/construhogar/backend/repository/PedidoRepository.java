package com.construhogar.backend.repository;

import java.math.BigDecimal;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import com.construhogar.backend.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Integer> {

    @Query("""
        SELECT COALESCE(SUM(d.subtotal), 0)
        FROM DetallePedido d
        WHERE d.pedido.idPedido = :idPedido
    """)
    BigDecimal sumarSubtotalPorPedido(@Param("idPedido") Integer idPedido);
}
