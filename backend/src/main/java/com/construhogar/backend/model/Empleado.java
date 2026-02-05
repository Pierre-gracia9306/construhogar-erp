package com.construhogar.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "empleado")
public class Empleado {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_empleado")
    private Integer idEmpleado;

    @Column(length = 80, nullable = false)
    private String nombre;

    @Column(name = "tipo_documento_emp", length = 45)
    private String tipoDocumentoEmp;

    @Column(name = "numero_documento_emp", length = 20)
    private String numeroDocumentoEmp;

    @Column(name = "correo_emp", length = 80, unique = true)
    private String correoEmp;

    @Column(name = "direccion_emp", length = 100)
    private String direccionEmp;

    @Column(length = 50)
    private String cargo;

    @Column(precision = 10, scale = 2)
    private BigDecimal salario;

    public Empleado() {}

    public Integer getIdEmpleado() {
        return idEmpleado;
    }

    public void setIdEmpleado(Integer idEmpleado) {
        this.idEmpleado = idEmpleado;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTipoDocumentoEmp() {
        return tipoDocumentoEmp;
    }

    public void setTipoDocumentoEmp(String tipoDocumentoEmp) {
        this.tipoDocumentoEmp = tipoDocumentoEmp;
    }

    public String getNumeroDocumentoEmp() {
        return numeroDocumentoEmp;
    }

    public void setNumeroDocumentoEmp(String numeroDocumentoEmp) {
        this.numeroDocumentoEmp = numeroDocumentoEmp;
    }

    public String getCorreoEmp() {
        return correoEmp;
    }

    public void setCorreoEmp(String correoEmp) {
        this.correoEmp = correoEmp;
    }

    public String getDireccionEmp() {
        return direccionEmp;
    }

    public void setDireccionEmp(String direccionEmp) {
        this.direccionEmp = direccionEmp;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public BigDecimal getSalario() {
        return salario;
    }

    public void setSalario(BigDecimal salario) {
        this.salario = salario;
    }
}
