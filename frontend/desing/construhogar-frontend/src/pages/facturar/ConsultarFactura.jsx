import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { obtenerFacturaPorId } from "../../services/facturaService"; // Traemos el refuerzo
import "./consultarFactura.css";

function ConsultarFactura() {
  const [idFactura, setIdFactura] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false); // Estado para que no le den mil clicks
  const navigate = useNavigate();

  const consultar = async () => {
    // 1. Validación básica de entrada
    if (!idFactura) {
      setError("Debe ingresar el ID de la factura para buscarla");
      return;
    }

    setError("");
    setCargando(true);

    try {
      /**
       * 🔥 VERIFICACIÓN REAL CON EL BACKEND
       * Llamamos al service para ver si el documento existe en Construhogar
       */
      await obtenerFacturaPorId(idFactura);

      // 2. Si llegamos aquí, es porque la factura EXISTE (Status 200)
      navigate(`/facturacion/detalle/${idFactura}`);

    } catch (err) {
      // 3. MANEJO DE ERROR: Si el backend lanza el orElseThrow
      console.error("Error en la consulta:", err);
      
      // Si el error es un 404 o 500 (Factura no encontrada)
      setError(`La factura #${idFactura} no existe en nuestro sistema.`);
      
    } finally {
      setCargando(false);
    }
  };

  // Función para que funcione al hundir "Enter" en el teclado
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      consultar();
    }
  };

  return (
    <>
      <Navbar showBack={true} backTo="/facturacion" />

      <div className="form-container">
        <h2 className="consultar-title">Buscador de Facturas</h2>
        <p className="consultar-subtitle">Ingrese el número de folio para ver el detalle legal</p>

        <div className="input-search-group">
          <input
            type="number"
            placeholder="Ej: 105"
            value={idFactura}
            onChange={(e) => setIdFactura(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={cargando}
            className="search-input"
          />
        </div>

        <button 
          className={`btn-consultar ${cargando ? 'disabled' : ''}`}
          onClick={consultar}
          disabled={cargando}
        >
          {cargando ? "Verificando..." : "Consultar Ahora"}
        </button>

        {error && (
          <div className="error-box">
            <p className="error-msg">⚠️ {error}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ConsultarFactura;