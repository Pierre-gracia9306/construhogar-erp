import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { pedidoService } from "../../services/pedidoService";
import "./resumenPedido.css";

function ResumenPedido() {
  const navigate = useNavigate();
  const { idPedido } = useParams();

  // 1. ESTADOS PARA LA DATA
  const [pedido, setPedido] = useState(null);
  const [error, setError] = useState("");

  // 2. CARGA DE DATOS DESDE EL BACKEND
  useEffect(() => {
    const obtenerResumen = async () => {
      try {
        const data = await pedidoService.obtenerPorId(idPedido);
        setPedido(data);
      } catch (err) {
        console.error("Error al obtener resumen:", err);
        setError("No se pudo cargar la información del pedido.");
      }
    };
    obtenerResumen();
  }, [idPedido]);

  const imprimir = () => {
    window.print();
  };

  // 3. PANTALLA DE CARGA O ERROR
  if (error) return <div className="resumen-container"><p>{error}</p></div>;
  if (!pedido) return <div className="resumen-container"><p>Generando resumen...</p></div>;

  // 4. CÁLCULOS TRIBUTARIOS (Basados en el total del pedido)
  const tasaIVA = 0.19;
  const subtotalCalculado = pedido.total / (1 + tasaIVA);
  const valorIVA = pedido.total - subtotalCalculado;

  return (
    <>
      <Navbar />

      <div className="resumen-container">
        {/* LEYENDA TÉCNICA/LEGAL */}
        <p className="nota-legal" style={{ textAlign: 'center', fontSize: '12px', color: '#666' }}>
          ESTE DOCUMENTO ES UN COMPROBANTE DE PEDIDO - NO ES FACTURA DE VENTA
        </p>

        {/* ENCABEZADO RESERVADO */}
        <div className="factura-header">
          <h1>CONSTRUHOGAR</h1>
          <p className="header-sub">NIT: XXXXXXXX-X</p>
          <p className="header-sub">Dirección: XXXXXXXXXXXX | Tel: XXXXXXXX</p>
          <hr />
          <h2>Resumen del Pedido</h2>
        </div>

        {/* INFO PEDIDO Y CLIENTE */}
        <div className="pedido-info">
          <div className="info-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <p><strong>Nro. Pedido:</strong> #{pedido.idPedido}</p>
              <p><strong>Fecha:</strong> {new Date(pedido.fecha).toLocaleString()}</p>
              <p><strong>Estado:</strong> {pedido.estado}</p>
            </div>
            <div>
              <p><strong>Cliente:</strong> {pedido.cliente?.nombre}</p>
              <p><strong>Documento:</strong> {pedido.cliente?.tipoDocumento} {pedido.cliente?.numeroDocumento}</p>
              {/* ID + NOMBRE DEL EMPLEADO para evitar duplicidad */}
              <p><strong>Atendido por:</strong> [{pedido.empleado?.idEmpleado}] {pedido.empleado?.nombre}</p>
            </div>
          </div>
        </div>

        {/* TABLA PRODUCTOS */}
        <table className="tabla-factura">
          <thead>
            <tr>
              <th>Código</th>
              <th>Descripción</th>
              <th>Cant.</th>
              <th>Precio Unit.</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {pedido.detalles?.map((item) => (
              <tr key={item.idDetalle || item.producto.idProducto}>
                <td>{item.producto.idProducto}</td>
                <td>{item.producto.nombre}</td>
                <td>{item.cantidad}</td>
                <td>${item.precioUnitario.toLocaleString()}</td>
                <td>${(item.cantidad * item.precioUnitario).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* TOTALES */}
        <div className="totales">
          <p><strong>Subtotal:</strong> ${subtotalCalculado.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          <p><strong>IVA (19%):</strong> ${valorIVA.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
          <p className="total-final"><strong>Total a Pagar:</strong> ${pedido.total.toLocaleString()}</p>
        </div>

        {/* ACCIONES (Ocultas en impresión por CSS) */}
        <div className="acciones">
          <button
            className="btn-cerrar"
            onClick={() => navigate("/pedidos/consultar-pedido", { replace: true })}
          >
            Cerrar
          </button>

          <button
            className="btn-editar"
            onClick={() => navigate(`/pedidos/confirmar/${idPedido}`, { replace: true })}
          >
            Editar Pedido
          </button>

          <button className="btn-imprimir" onClick={imprimir}>
            Imprimir Comprobante
          </button>
        </div>
      </div>
    </>
  );
}

export default ResumenPedido;