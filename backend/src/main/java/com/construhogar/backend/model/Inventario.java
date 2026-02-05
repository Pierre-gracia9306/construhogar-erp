package com.construhogar.backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "inventario",
       uniqueConstraints = @UniqueConstraint(columnNames = "id_producto"))
public class Inventario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_inventario")
    private Integer idInventario;

    @OneToOne
    @JoinColumn(name = "id_producto", nullable = false)
    private Producto producto;

    @Column(name = "stock_actual", nullable = false)
    private Integer stockActual;

    @Column(length = 50)
    private String ubicacion;

    public Inventario() {}

    @PrePersist
    @PreUpdate
    private void validarStock() {
        if (stockActual == null || stockActual < 0) {
            throw new RuntimeException("El stock no puede ser negativo");
        }
    }

    public Integer getIdInventario() {
        return idInventario;
    }

    public void setIdInventario(Integer idInventario) {
        this.idInventario = idInventario;
    }

    public Producto getProducto() {
        return producto;
    }

    public void setProducto(Producto producto) {
        this.producto = producto;
    }

    public Integer getStockActual() {
        return stockActual;
    }

    public void setStockActual(Integer stockActual) {
        this.stockActual = stockActual;
    }

    public String getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(String ubicacion) {
        this.ubicacion = ubicacion;
    }
}


