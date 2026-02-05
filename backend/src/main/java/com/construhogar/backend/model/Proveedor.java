package com.construhogar.backend.model;

import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "proveedor")
public class Proveedor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_proveedor")
    private Integer idProveedor;

    @Column(length = 100, nullable = false)
    private String nombre;

    @Column(name = "tipo_documento", length = 45)
    private String tipoDocumento;

    @Column(name = "numero_documento_prov", length = 45)
    private String numeroDocumentoProv;

    @Column(length = 80)
    private String contacto;

    @Column(length = 120)
    private String direccion;

    @Column(length = 100)
    private String email;

    @Column(length = 20)
    private String telefono;

    // 🔗 Relación con Producto (Se mantiene igual)
    @OneToMany(mappedBy = "proveedor", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Producto> productos;

    // 🔹 Constructor vacío
    public Proveedor() {
    }

    // 🔹 Getters y Setters Actualizados

    public Integer getIdProveedor() {
        return idProveedor;
    }

    public void setIdProveedor(Integer idProveedor) {
        this.idProveedor = idProveedor;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTipoDocumento() {
        return tipoDocumento;
    }

    public void setTipoDocumento(String tipoDocumento) {
        this.tipoDocumento = tipoDocumento;
    }

    public String getNumeroDocumentoProv() {
        return numeroDocumentoProv;
    }

    public void setNumeroDocumentoProv(String numeroDocumentoProv) {
        this.numeroDocumentoProv = numeroDocumentoProv;
    }

    public String getContacto() {
        return contacto;
    }

    public void setContacto(String contacto) {
        this.contacto = contacto;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public List<Producto> getProductos() {
        return productos;
    }

    public void setProductos(List<Producto> productos) {
        this.productos = productos;
    }
}