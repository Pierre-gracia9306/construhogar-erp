package com.construhogar.backend.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.construhogar.backend.model.*;
import com.construhogar.backend.repository.*;
import com.construhogar.backend.dto.CompraRequestDTO;
import com.construhogar.backend.exception.EntidadNoEncontradaException;

@Service
public class CompraService {

    // Repositorios necesarios para la operación
    private final CompraRepository compraRepository;
    private final ProductoRepository productoRepository;
    private final ProveedorRepository proveedorRepository;
    private final InventarioRepository inventarioRepository;
    private final EmpleadoRepository empleadoRepository;
    private final DetalleCompraRepository detalleCompraRepository;

    // Constructor para inyección de dependencias
    public CompraService(CompraRepository compraRepository, 
                         ProductoRepository productoRepository,
                         ProveedorRepository proveedorRepository,
                         InventarioRepository inventarioRepository,
                         EmpleadoRepository empleadoRepository,
                         DetalleCompraRepository detalleCompraRepository) {
        this.compraRepository = compraRepository;
        this.productoRepository = productoRepository;
        this.proveedorRepository = proveedorRepository;
        this.inventarioRepository = inventarioRepository;
        this.empleadoRepository = empleadoRepository;
        this.detalleCompraRepository = detalleCompraRepository;
    }

    /**
     * MÉTODO EL CORAZÓN: Procesa la compra desde React.
     * Valida entidades, crea la compra, el detalle y actualiza el stock.
     */
    @Transactional
    public Compra procesarCompraDesdeFrontend(CompraRequestDTO dto) {
        //  Validaciones: Nos aseguramos de que existan Proveedor, Producto y Empleado
        Proveedor proveedor = proveedorRepository.findById(dto.getIdProveedor())
                .orElseThrow(() -> new EntidadNoEncontradaException("Proveedor",  dto.getIdProveedor()));

        Producto producto = productoRepository.findById(dto.getIdProducto())
                .orElseThrow(() -> new EntidadNoEncontradaException("Producto",  dto.getIdProducto()));

        Empleado empleado = empleadoRepository.findById(dto.getIdEmpleado())
                .orElseThrow(() -> new EntidadNoEncontradaException("Empleado",dto.getIdEmpleado() ));
        // Validacion: Cantidad debe ser positiva
        if (dto.getCantidad() <= 0) {
        	throw new IllegalArgumentException ("La cantidad debe ser mayor a 0");
        }
        // Validacion precio:
        if (dto.getPrecioUnitario().compareTo(BigDecimal.ZERO) <= 0) {
        	throw new IllegalArgumentException ("El precio debe ser mayor a 0");
        }
     // Calculamos el total
        BigDecimal totalCalculado = dto.getPrecioUnitario()
            .multiply(BigDecimal.valueOf(dto.getCantidad()));
     // Validación de límite
        if (totalCalculado.compareTo(new BigDecimal("1000000")) > 0) {
            throw new IllegalArgumentException(
                "El total de la compra excede el límite permitido"
            );
        }
        

        // 2. CREAR ENCABEZADO DE COMPRA
        Compra compra = new Compra();
        compra.setProveedor(proveedor);
        compra.setEmpleado(empleado);
        compra.setTotal(totalCalculado);
        
       

        // Guardamos para generar el ID de compra
        Compra compraGuardada = compraRepository.save(compra);

        // 3. CREAR DETALLE DE COMPRA
        DetalleCompra detalle = new DetalleCompra();
        detalle.setCompra(compraGuardada);
        detalle.setProducto(producto);
        detalle.setCantidad(dto.getCantidad());
        detalle.setPrecioUnitario(dto.getPrecioUnitario());
        // El subtotal se autocalcula en el modelo DetalleCompra
        detalleCompraRepository.save(detalle);

        // 4. ACTUALIZAR O CREAR EN INVENTARIO
        // Si el producto no tiene inventario, orElseGet crea uno nuevo
        Inventario inventario = inventarioRepository.findByProducto(producto)
                .orElseGet(() -> {
                    Inventario nuevoInv = new Inventario();
                    nuevoInv.setProducto(producto);
                    nuevoInv.setStockActual(0); 
                    nuevoInv.setUbicacion("Bodega General");
                    return nuevoInv;
                });

        // Sumamos la mercancía que acaba de entrar
        inventario.setStockActual(inventario.getStockActual() + dto.getCantidad());
        inventarioRepository.save(inventario);

        return compraGuardada;
    }

    /**
     * 🛠️ MÉTODO DE RECALCULO: Suma los subtotales de los detalles 
     * y actualiza el total de la compra maestra.
     */
    @Transactional
    public void recalcularTotal(Integer idCompra) {
        // Usamos la query personalizada del repositorio de detalles
        BigDecimal nuevoTotal = detalleCompraRepository.sumarSubtotalPorCompra(idCompra);
        
        if (nuevoTotal == null) {
            nuevoTotal = BigDecimal.ZERO;
        }
        
        Compra compra = obtenerPorId(idCompra);
        compra.setTotal(nuevoTotal);
        compraRepository.save(compra);
    }

    // --- MÉTODOS CRUD ESTÁNDAR ---
    public List<Compra>obtenerPorProveedor(Integer idProveedor){
    	proveedorRepository.findById(idProveedor)
    	.orElseThrow(() -> new EntidadNoEncontradaException("Proveedor", idProveedor));
        return compraRepository.findByProveedor_IdProveedor(idProveedor);
    }
    
    public List<Compra> obtenerTodas() {
        return compraRepository.findAll();
    }

    public Compra obtenerPorId(Integer id) {
        return compraRepository.findById(id)
                .orElseThrow(() -> new EntidadNoEncontradaException("Compra",id));
    }

    public void eliminar(Integer id) {
        compraRepository.deleteById(id);
    }
}