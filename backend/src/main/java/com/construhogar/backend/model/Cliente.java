package com.construhogar.backend.model;

import jakarta.persistence.*;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "cliente")
public class Cliente {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idCliente;

    @Column(nullable = false, length = 80)
    private String nombre;

    @Column(name = "tipo_documento", length = 80)
    private String tipoDocumento;

    @Column(name = "numero_documento", length = 20)
    private String numeroDocumento;

    @Column(length = 15)
    private String telefono;

    @Column(length = 100)
    private String direccion;

    private String correo;

    @OneToMany(mappedBy = "cliente")
    @JsonBackReference
    private List<Pedido> pedidos;

    public Cliente() {}

    // Getters y Setters de todos los campos...
    public Integer getIdCliente() { return idCliente; }
    public void setIdCliente(Integer idCliente) { this.idCliente = idCliente; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { 
    	//Validacion 1: No puede ser null
    	if (nombre == null) {
    		throw new IllegalArgumentException("El nombre no puede ser null");
    	}
    	//Validacion 2: No puede estar vacion
    	if (nombre.trim().isEmpty()) {
    		throw new IllegalArgumentException("El nombre no puede estar vacio");
    	}
    	//Validacion 3: Minimo 3 caracteres
    	if (nombre.trim().length()<3) {
    		throw new IllegalArgumentException("El nombre debe tener minimo 3 caracteres");
    	}
    	//Validacion 4: Maximo 80 caracteres (respetando @Column (length = 80))
    	if (nombre.length()>80) {
    		throw new IllegalArgumentException("El nombre no puede exceder los 80 caracteres");
    	}
    	//Validacion 5: solo letras, espacios, tildes y ñ (no numero y simbolos)
    	if (!nombre.matches("[a-zA-ZáéíóúÁÉÍÓÚñÑ\\s]+")) {
    		throw new IllegalArgumentException("El nombre solo permite letras, espacios, tildes y ñ (no numero y simbolos)");
    	}
    	//Si paso todas las validaciones, asignar
    	this.nombre =nombre.trim();
    
    }

    public String getTipoDocumento() { return tipoDocumento; }
    public void setTipoDocumento(String tipoDocumento) { this.tipoDocumento = tipoDocumento; }

    public String getNumeroDocumento() { return numeroDocumento; }
    public void setNumeroDocumento(String numeroDocumento) { 
    	//Validacion 1: No puede ser null
    	if (numeroDocumento == null) {
    		throw new IllegalArgumentException("El numero de documento no puede ser null");
    	}
    	//Validacion 2: No puede estar vacion
    	if (numeroDocumento.trim().isEmpty()) {
    		throw new IllegalArgumentException("El numero de documento no puede estar vacio");
    	}
    	//Validacion 3: Minimo 6 caracteres
    	if (numeroDocumento.trim().length()<6) {
    		throw new IllegalArgumentException("El numero de documento debe tener minimo 6 caracteres");
    	}
    	//Validacion 4: Maximo 20 caracteres (respetando @Column (length = 20))
    	if (numeroDocumento.length()>20) {
    		throw new IllegalArgumentException("El numero de documento debe tener maximo 20 caracteres");
    	}
    	// Validación 5: Solo numeros
    	if (!numeroDocumento.matches("\\d+")) {
    		throw new IllegalArgumentException("El numero de documento solo permite numeros");
    	}
    	// Asignar si pasó todas las validaciones
    	
    	this.numeroDocumento = numeroDocumento.trim(); }

    public String getTelefono() { return telefono; }
    public void setTelefono(String telefono) { 
    	// Si es null, está OK (campo opcional)
    	if (telefono == null || telefono.trim().isEmpty()) {
    		this.telefono = null;
    		return;
    	}
    	// Si NO es null, validar longitud
    	if (telefono.length()<7|| telefono.length()>15) {
    		throw new IllegalArgumentException("El telefono debe ser mín 7, máx 15 caracteres");
    	}
    	// Validar formato: solo números, espacios, guiones, paréntesis, +
    	if (!telefono.matches("[\\d\\s\\-()\\+]+")) {
    		throw new IllegalArgumentException("El telefono solo puede contener "
    				+ "lo siguientes tipos de caracteres números, espacios, guiones, paréntesis, + ");
    	}
    	
    	// Asignar
    	this.telefono = telefono; }

    public String getDireccion() { return direccion; }
    public void setDireccion(String direccion) { this.direccion = direccion; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public List<Pedido> getPedidos() { return pedidos; }
    public void setPedidos(List<Pedido> pedidos) { this.pedidos = pedidos; }
    

}