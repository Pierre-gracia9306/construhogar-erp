package com.construhogar.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties; // 🔥 Cambio de anotación

@Entity
@Table(name = "pedido")
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idPedido;

    @Column(nullable = false)
    private LocalDate fecha;

    @Column(nullable = false)
    private String estado;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal total;

    // 🔗 RELACIÓN CON CLIENTE
    @ManyToOne(optional = false)
    @JoinColumn(name = "id_cliente", nullable = false)
    private Cliente cliente;

    // 🔥 RELACIÓN CON EMPLEADO (Obligatoria)
    @ManyToOne(optional = false)
    @JoinColumn(name = "id_empleado", nullable = false)
    private Empleado empleado;

    // 🚀 FETCH EAGER + IGNORE PROPERTIES: La combinación ganadora para que lleguen los detalles
    @OneToMany(
        mappedBy = "pedido",
        cascade = CascadeType.ALL,
        orphanRemoval = true,
        fetch = FetchType.EAGER 
    )
    @JsonIgnoreProperties("pedido") // 🔥 Evita bucles pero PERMITE ver la lista de detalles
    private List<DetallePedido> detalles;

    public Pedido() {}

    @PrePersist
    private void prePersist() {
        this.fecha = LocalDate.now();
        if (this.estado == null) this.estado = "CREADO";
        if (this.total == null) this.total = BigDecimal.ZERO;
    }

    // --- GETTERS Y SETTERS ---

    public Integer getIdPedido() { return idPedido; }
    public void setIdPedido(Integer idPedido) { this.idPedido = idPedido; }

    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }

    public Cliente getCliente() { return cliente; }
    public void setCliente(Cliente cliente) { this.cliente = cliente; }

    public Empleado getEmpleado() { return empleado; }
    public void setEmpleado(Empleado empleado) { this.empleado = empleado; }

    public List<DetallePedido> getDetalles() { return detalles; }
    public void setDetalles(List<DetallePedido> detalles) { this.detalles = detalles; }
}