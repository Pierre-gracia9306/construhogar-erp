import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { realizarFacturacion } from "../../services/facturaService"; 
import "./facturar.css";

function Facturar() {
  const navigate = useNavigate();
  
  // Estados para capturar la información de la obra
  const [idPedido, setIdPedido] = useState("");
  const [medioPago, setMedioPago] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false); 

  const facturar = async () => {
    // 1. Validación de seguridad: No se factura si falta información
    if (!idPedido || !medioPago) {
      setError("El ID del pedido y el medio de pago son obligatorios para legalizar la venta");
      return;
    }

    setCargando(true);
    setError("");

    try {
      // 2. LLAMADA AL BACKEND (Opción B: Enviamos el paquete completo)
      // Pasamos idPedido y medioPago como argumentos separados al service
      const facturaGenerada = await realizarFacturacion(idPedido, medioPago);
      
      // 3. ÉXITO: Navegamos al detalle de la factura recién creada
      // Verificamos si el backend lo devuelve como idFactura o id_factura
      const idFinal = facturaGenerada.idFactura || facturaGenerada.id_factura;
      
      navigate(`/facturacion/detalle/${idFinal}`);
      
    } catch (err) {
      // 4. MANEJO DE ERRORES: Aquí capturamos el "Stock Insuficiente"
      console.error("Error en el proceso de facturación:", err);
      
      // Si el backend de Java manda un mensaje de error, lo mostramos; si no, uno genérico
      const mensajeError = err.response?.data?.mensaje || "Error al procesar la factura. Verifique el stock de materiales.";
      setError(mensajeError);
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Navbar showBack={true} backTo="/facturacion" />

      <div className="form-container">
        <h2 className="factura-title">Generar Factura Legal</h2>
        <p className="factura-subtitle">Finalice la venta descontando materiales de inventario</p>

        <div className="input-group">
          <label>Número de Pedido:</label>
          <input
            type="number"
            placeholder="Ej: 502"
            value={idPedido}
            onChange={(e) => setIdPedido(e.target.value)}
            disabled={cargando}
            className="factura-input"
          />
        </div>

        <div className="input-group">
          <label>Medio de Pago:</label>
          <select
            value={medioPago}
            onChange={(e) => setMedioPago(e.target.value)}
            disabled={cargando}
            className="factura-select"
          >
            <option value="">-- Seleccione --</option>
            <option value="EFECTIVO">Efectivo</option>
            <option value="TARJETA">Tarjeta (Débito/Crédito)</option>
            <option value="TRANSFERENCIA">Transferencia Bancaria</option>
          </select>
        </div>

        <button 
          className={`btn-confirmar ${cargando ? 'btn-disabled' : ''}`}
          onClick={facturar} 
          disabled={cargando}
        >
          {cargando ? "Procesando Cobro..." : "Confirmar y Descontar Stock"}
        </button>

        {error && (
          <div className="error-container">
            <p className="error-msg">⚠️ {error}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default Facturar;