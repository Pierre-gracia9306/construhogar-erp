import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
// 🔥 CORRECCIÓN 1: Importamos sin llaves {} porque usamos 'export default' en el servicio
import clienteService from "../../services/clienteService"; 
import "./consultarCliente.css";

function ConsultarCliente() {
  const [tipoDoc, setTipoDoc] = useState("");
  const [documento, setDocumento] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const buscarCliente = async () => {
    setError("");

    if (!tipoDoc || !documento) {
      setError("Debe seleccionar tipo de documento y número, mi vale.");
      return;
    }

    setCargando(true);

    try {
      /**
       * 🔥 CORRECCIÓN 2: 
       * Según tu clienteService.js, la función recibe UN solo parámetro (documento).
       * Si tu Backend en Java espera tipo y número, asegúrate de que el 
       * servicio los mande ambos. Por ahora, lo ajustamos al nombre correcto:
       */
      const clienteEncontrado = await clienteService.consultarPorDocumento(documento);

      if (clienteEncontrado) {
        // Navegamos a la siguiente etapa del pedido
        navigate(`/pedidos/cliente/${documento}`, { replace: true });
      } else {
        setError("❌ El cliente no aparece en el sistema.");
      }
    } catch (err) {
      console.error("Error en la búsqueda:", err);
      // Si el servidor tira 404 o error de conexión
      setError("❌ El cliente no existe o hubo un problema con el servidor.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Navbar showBack={true} showMenuPrincipal={true} backTo="/pedidos" />

      <div className="cliente-container">
        <h2 className="cliente-title">Consultar Cliente</h2>

        <div className="cliente-form">
          <label>Tipo de documento:</label>
          <select value={tipoDoc} onChange={(e) => setTipoDoc(e.target.value)}>
            <option value="">Seleccione</option>
            <option value="CC">CC</option>
            <option value="TI">TI</option>
            <option value="CE">CE</option>
            <option value="NIT">NIT</option>
          </select>

          <label>Número de documento:</label>
          <input
            type="text"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)}
            placeholder="Ingrese el número"
            style={{ color: '#1a202c' }} 
          />

          <button 
            className="consultar-btn" 
            onClick={buscarCliente}
            disabled={cargando}
          >
            {cargando ? "Buscando..." : "Consultar"}
          </button>
        </div>

        {error && <p className="error-msg">{error}</p>}
      </div>
    </>
  );
}

export default ConsultarCliente;