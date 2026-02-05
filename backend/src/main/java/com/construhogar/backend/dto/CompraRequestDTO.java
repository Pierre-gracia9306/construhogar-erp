package com.construhogar.backend.dto;

import java.math.BigDecimal;

/**
 * Esta clase es el "formulario" que recibirá los datos de React.
 * Ahora incluye el idEmpleado para garantizar la trazabilidad.
 */
public class CompraRequestDTO {
    
    private Integer idProveedor;
    private Integer idProducto;
    private Integer idEmpleado; // <-- Nuevo campo para el responsable
    private Integer cantidad;
    private BigDecimal precioUnitario;

    public CompraRequestDTO() {}

    // Getters y Setters
    public Integer getIdProveedor() { return idProveedor; }
    public void setIdProveedor(Integer idProveedor) { this.idProveedor = idProveedor; }

    public Integer getIdProducto() { return idProducto; }
    public void setIdProducto(Integer idProducto) { this.idProducto = idProducto; }

    public Integer getIdEmpleado() { return idEmpleado; }
    public void setIdEmpleado(Integer idEmpleado) { this.idEmpleado = idEmpleado; }

    public Integer getCantidad() { return cantidad; }
    public void setCantidad(Integer cantidad) { this.cantidad = cantidad; }

    public BigDecimal getPrecioUnitario() { return precioUnitario; }
    public void setPrecioUnitario(BigDecimal precioUnitario) { this.precioUnitario = precioUnitario; }
}