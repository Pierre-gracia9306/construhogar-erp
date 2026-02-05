import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { obtenerFacturaPorId } from "../../services/facturaService";
import "./detalleFactura.css";

/**
 * Componente para visualizar el detalle legal de una factura.
 * Muestra información del cliente, empleado y materiales facturados.
 */
function DetalleFactura() {
  const { idFactura } = useParams();
  const navigate = useNavigate();
  const [factura, setFactura] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarFactura = async () => {
      try {
        const data = await obtenerFacturaPorId(idFactura);
        setFactura(data);
      } catch (err) {
        console.error("Error cargando la factura:", err);
        setError("No se pudo cargar la factura. Verifique que el ID sea correcto.");
      }
    };
    cargarFactura();
  }, [idFactura]);

  const imprimir = () => { window.print(); };

  // Manejo de errores en la carga
  if (error) return (
    <>
      <Navbar showBack={true} backTo="/facturacion" />
      <div className="error-container">
        <p className="error-msg">⚠️ {error}</p>
        <button onClick={() => navigate("/facturacion")}>Volver</button>
      </div>
    </>
  );

  // Pantalla de carga mientras llega el JSON del backend
  if (!factura || !factura.pedido) return <div className="loading">Cargando datos de la factura...</div>;

  return (
    <>
      <Navbar showBack={true} backTo="/facturacion" />

      <div className="detalle-container printable">
        <header className="factura-header">
          <h1>CONSTRUHOGAR S.A.</h1>
          <p>NIT: 900.123.456-1</p>
          <div className="info-principal">
            <h3>Factura de Venta # {factura.idFactura}</h3>
            <p><strong>Fecha:</strong> {factura.fecha}</p>
            <p><strong>Estado:</strong> {factura.estado}</p>
            <p><strong>Medio de Pago:</strong> {factura.medioPago}</p>
          </div>
        </header>

        <section className="info-cliente-empleado">
          <div className="bloque">
            <h4>Cliente</h4>
            <p>{factura.pedido.cliente?.nombre || "Consumidor Final"}</p>
            <p>NIT/CC: {factura.pedido.cliente?.numeroDocumento || "N/A"}</p>
          </div>
          <div className="bloque">
            <h4>Atendido por:</h4>
            <p>{factura.pedido.empleado?.nombre || "Personal de Turno"}</p>
          </div>
        </section>

        <table className="tabla-materiales">
          <thead>
            <tr>
              <th>Material</th>
              <th>Cantidad</th>
              <th>Precio Unit.</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {/* 🚀 Mapeo de detalles: Ahora con nombres sincronizados con el Backend */}
            {factura.pedido.detalles && factura.pedido.detalles.length > 0 ? (
              factura.pedido.detalles.map((item, index) => (
                <tr key={index}>
                  <td>{item.producto?.nombre || "Material sin nombre"}</td>
                  <td>{item.cantidad}</td>
                  <td>${item.precioUnitario?.toLocaleString()}</td>
                  <td>${item.subtotal?.toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  ⚠️ No se encontraron materiales registrados en este pedido.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="total-seccion">
          <h2>TOTAL A PAGAR: ${factura.total?.toLocaleString()}</h2>
        </div>

        <div className="acciones no-print">
          <button className="btn-cerrar" onClick={() => navigate("/facturacion")}>
            Cerrar
          </button>
          <button className="btn-imprimir" onClick={imprimir}>
            🖨️ Imprimir Factura
          </button>
        </div>
      </div>
    </>
  );
}

export default DetalleFactura;