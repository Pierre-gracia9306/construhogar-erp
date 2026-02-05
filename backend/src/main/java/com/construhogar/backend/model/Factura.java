package com.construhogar.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "factura")
public class Factura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idFactura;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal total;

    @Column(nullable = false, length = 20)
    private String estado;

    @Column(nullable = false, length = 50)
    private String medioPago;

    @OneToOne(optional = false)
    @JoinColumn(name = "id_pedido", nullable = false, unique = true)
    // 🔥 EL ARREGLO: Quitamos "detalles" de la lista de ignorados
    @JsonIgnoreProperties({"factura"}) 
    private Pedido pedido;

    public Factura() {}

    @PrePersist
    private void prePersist() {
        this.fecha = LocalDate.now();
        this.estado = "EMITIDA";

        if (pedido != null && pedido.getTotal() != null) {
            this.total = pedido.getTotal();
        } else {
            this.total = BigDecimal.ZERO;
        }
    }

    public Integer getIdFactura() { return idFactura; }
    public LocalDate getFecha() { return fecha; }
    public BigDecimal getTotal() { return total; }
    public String getEstado() { return estado; }
    public Pedido getPedido() { return pedido; }
    public String getMedioPago() { return medioPago; }

    public void setTotal(BigDecimal total) { this.total = total; }
    public void setEstado(String estado) { this.estado = estado; }
    public void setPedido(Pedido pedido) { this.pedido = pedido; }
    public void setMedioPago(String medioPago) { this.medioPago = medioPago; }
}