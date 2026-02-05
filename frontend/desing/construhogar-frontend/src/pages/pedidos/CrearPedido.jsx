import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import clienteService from "../../services/clienteService"; // Correcto: sin llaves
import "./crearPedido.css";

function CrearPedido() {
  const navigate = useNavigate();

  const [tipoDoc, setTipoDoc] = useState("");
  const [documento, setDocumento] = useState("");
  const [estado, setEstado] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validarYContinuar = async () => {
    if (!tipoDoc || !documento || !estado) {
      setError("Todos los campos son obligatorios, jefe.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      /**
       * 🔥 CORRECCIÓN:
       * Cambiamos 'obtenerPorDocumento' por 'consultarPorDocumento'
       */
      const clienteEncontrado = await clienteService.consultarPorDocumento(documento);

      if (clienteEncontrado) {
        navigate("/pedidos/confirmar", { 
          state: { 
            cliente: clienteEncontrado, 
            estadoInicial: estado 
          },
          replace: true 
        });
      } else {
        setError("El cliente no está registrado. Por favor, créelo primero.");
      }
    } catch (err) {
      console.error("Error al validar cliente:", err);
      setError("❌ El cliente no existe o el servidor está de rumba.");
    } finally {
      setLoading(false);
    }
  };

  // ... El resto del return se mantiene igual
  return (
    <>
      <Navbar showBack={true} showMenuPrincipal={true} />
      <div className="crear-pedido-container">
        <h2 className="crear-title">Crear Pedido</h2>
        <div className="crear-form">
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
            placeholder="Ej: 12345678"
            onChange={(e) => setDocumento(e.target.value)}
          />

          <label>Estado del pedido:</label>
          <select value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="">Seleccione</option>
            <option value="CONFIRMADO">Confirmado</option>
            <option value="PENDIENTE">Pendiente</option>
          </select>

          <button className="crear-btn" onClick={validarYContinuar} disabled={loading}>
            {loading ? "Validando..." : "Continuar"}
          </button>
        </div>
        {error && <p className="error-msg">{error}</p>}
      </div>
    </>
  );
}

export default CrearPedido;