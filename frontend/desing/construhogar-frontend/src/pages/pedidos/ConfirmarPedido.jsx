import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { materialService } from "../../services/materialService";
import { pedidoService } from "../../services/pedidoService";
import "./confirmarPedido.css";

function ConfirmarPedido() {
  const { idPedido } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const esEdicion = Boolean(idPedido);
  
  const [cliente, setCliente] = useState(location.state?.cliente || null);
  const [estado, setEstado] = useState(location.state?.estadoInicial || "PENDIENTE");
  const [detalle, setDetalle] = useState([]);
  const [idMaterial, setIdMaterial] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const p = await pedidoService.obtenerPorId(idPedido);
        setEstado(p.estado);
        setCliente(p.cliente);
        
        const detallesFormateados = p.detalles.map(d => ({
          idDetalle: d.idDetalle, 
          idProducto: d.producto.idProducto,
          nombre: d.producto.nombre,
          cantidad: d.cantidad,
          precio: d.precioUnitario,
          subtotal: d.cantidad * d.precioUnitario
        }));
        
        setDetalle(detallesFormateados);
      } catch (err) {
        console.error("Error al cargar datos:", err);
        setError("No se pudo cargar la información del pedido.");
      }
    };

    if (esEdicion) cargarDatos();
  }, [esEdicion, idPedido]);

  const agregarMaterial = async () => {
    setError("");
    if (!idMaterial || !cantidad) {
      setError("Ingrese código y cantidad, mi vale.");
      return;
    }

    try {
      const producto = await materialService.obtenerPorId(idMaterial);
      
      // Validación previa de stock en el Front (opcional pero ayuda)
      if (producto.stock < Number(cantidad)) {
        setError(`Stock insuficiente. Solo hay ${producto.stock} unidades de ${producto.nombre}.`);
        return;
      }

      if (detalle.find(item => item.idProducto === producto.idProducto)) {
        setError("Este material ya está en la lista.");
        return;
      }

      setDetalle([...detalle, {
        idProducto: producto.idProducto,
        nombre: producto.nombre,
        cantidad: Number(cantidad),
        precio: producto.precio,
        subtotal: producto.precio * Number(cantidad)
      }]);
      
      setIdMaterial("");
      setCantidad("");
    } catch (err) {
      console.error("Error al buscar material:", err);
      setError("El material no existe en la base de datos.");
    }
  };

  const eliminarItem = (id) => {
    setDetalle(detalle.filter(item => item.idProducto !== id));
  };

  const totalGeneral = detalle.reduce((acc, item) => acc + item.subtotal, 0);

  const guardarPedido = async () => {
    setError("");
    if (detalle.length === 0) {
      setError("La lista de materiales está vacía.");
      return;
    }

    const usuarioString = sessionStorage.getItem("usuario");
    const empleadoLogueado = usuarioString ? JSON.parse(usuarioString) : null;

    if (!empleadoLogueado) {
      setError("❌ Sesión expirada. Inicie sesión de nuevo.");
      return;
    }

    const pedidoData = {
      ...(esEdicion && { idPedido: parseInt(idPedido) }),
      cliente: { idCliente: cliente.idCliente },
      empleado: { idEmpleado: empleadoLogueado.idEmpleado },
      estado: estado,
      total: totalGeneral,
      detalles: detalle.map(item => ({
        ...(item.idDetalle && { idDetalle: item.idDetalle }),
        producto: { idProducto: item.idProducto },
        cantidad: parseInt(item.cantidad),
        precioUnitario: parseFloat(item.precio)
      }))
    };

    try {
      if (esEdicion) {
        await pedidoService.actualizar(idPedido, pedidoData);
        alert("¡Pedido actualizado con éxito!");
      } else {
        await pedidoService.crear(pedidoData);
        alert("¡Venta realizada con éxito!");
      }
      navigate("/pedidos"); 
    } catch (err) {
      // 🕵️ Aquí es donde atrapamos el error de stock que manda Java
      const backendMsg = err.response?.data?.message || err.response?.data;
      if (err.response?.status === 400 || err.response?.status === 409) {
        setError(`⚠️ Error de Stock: ${backendMsg}`);
      } else {
        setError("❌ Error al procesar la factura. Verifique el stock de materiales o la conexión.");
      }
      console.error("Error en la transacción:", err);
    }
  };

  return (
    <>
      <Navbar showBack={true} showMenuPrincipal={true} backTo="/pedidos/nuevo" />
      <div className="confirmar-container">
        <h2 className="titulo">{esEdicion ? `Editando Pedido #${idPedido}` : "Confirmar Venta"}</h2>
        
        <div className="info-resumen">
          <p><strong>Cliente:</strong> {cliente?.nombre}</p>
          <p><strong>Vendedor:</strong> {JSON.parse(sessionStorage.getItem("usuario"))?.nombre || "No identificado"}</p>
        </div>

        <div className="estado-seccion">
          <label>Estado del Pedido:</label>
          <select value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="PENDIENTE">PENDIENTE</option>
            <option value="CONFIRMADO">CONFIRMADO</option>
            <option value="CANCELADO">CANCELADO</option>
          </select>
        </div>

        <div className="formulario-material">
          <input 
            type="number" 
            placeholder="ID Material" 
            value={idMaterial} 
            onChange={(e) => setIdMaterial(e.target.value)} 
          />
          <input 
            type="number" 
            placeholder="Cant." 
            value={cantidad} 
            onChange={(e) => setCantidad(e.target.value)} 
          />
          <button className="btn-agregar" onClick={agregarMaterial}>Agregar</button>
        </div>

        {error && <div className="error-alerta">{error}</div>}

        <table className="tabla-factura">
          <thead>
            <tr>
              <th>ID</th>
              <th>Descripción</th>
              <th>Cant.</th>
              <th>Subtotal</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {detalle.map((item) => (
              <tr key={item.idProducto}>
                <td>{item.idProducto}</td>
                <td>{item.nombre}</td>
                <td>{item.cantidad}</td>
                <td>${item.subtotal.toLocaleString()}</td>
                <td><button className="btn-del" onClick={() => eliminarItem(item.idProducto)}>Eliminar</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-caja">
          <h3>TOTAL A PAGAR: ${totalGeneral.toLocaleString()}</h3>
        </div>

        <div className="botones-finales">
          <button className="btn-confirmar" onClick={guardarPedido}>
            {esEdicion ? "Actualizar Pedido" : "Generar Factura"}
          </button>
        </div>
      </div>
    </>
  );
}

export default ConfirmarPedido;