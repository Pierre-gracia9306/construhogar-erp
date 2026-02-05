import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { pedidoService } from "../../services/pedidoService";
import "./consultarPedido.css";

function ConsultarPedido() {
  const [pedidoId, setPedidoId] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const buscarPedido = async (e) => {
    // Evitamos que si se usa un form, se recargue la página
    if (e) e.preventDefault();

    // 1. VALIDACIÓN BÁSICA (Solo números como pidió el jefe)
    if (!pedidoId.trim()) {
      setError("Debe ingresar el número de pedido, patrón.");
      return;
    }

    // Expresión regular para asegurar que solo entren números
    if (!/^\d+$/.test(pedidoId)) {
      setError("El número de pedido solo contiene dígitos.");
      return;
    }

    setError("");
    setCargando(true);

    try {
      // 2. VALIDACIÓN REAL CONTRA EL BACKEND
      // Intentamos obtener el pedido antes de navegar
      const pedidoExistente = await pedidoService.obtenerPorId(pedidoId);

      if (pedidoExistente) {
        // 3. NAVEGACIÓN SEGURA
        // Si llegamos aquí es porque el pedido existe y tenemos permiso
        navigate(`/pedidos/resumen/${pedidoId}`);
      }
    } catch (err) {
      // Manejo de errores según la respuesta del servidor (ej: 404 Not Found)
      if (err.response && err.response.status === 404) {
        setError(`El pedido #${pedidoId} no existe en Construhogar.`);
      } else {
        setError("Error de conexión con el servidor. Intente más tarde.");
      }
      console.error("Error en consulta:", err);
    } finally {
      setCargando(false);
    }
  };

  // Función para detectar la tecla "Enter" y facilitar el trabajo al empleado
  const manejarTecla = (e) => {
    if (e.key === 'Enter') {
      buscarPedido();
    }
  };

  return (
    <>
      <Navbar showBack={true} backTo="/pedidos" />

      <div className="pedido-container">
        <h2 className="pedido-title">Consultar Pedido</h2>

        <div className="pedido-form">
          <label>Número del pedido:</label>
          <input
            type="text"
            value={pedidoId}
            onChange={(e) => setPedidoId(e.target.value)}
            onKeyDown={manejarTecla}
            placeholder="Ej: 102345"
            disabled={cargando}
          />

          <button 
            className="consultar-btn" 
            onClick={buscarPedido}
            disabled={cargando}
          >
            {cargando ? "Buscando..." : "Consultar Pedido"}
          </button>
        </div>

        {error && <p className="error-msg">{error}</p>}
      </div>
    </>
  );
}

export default ConsultarPedido;