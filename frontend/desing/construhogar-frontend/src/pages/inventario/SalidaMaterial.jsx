import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Hook para navegar entre páginas
import Navbar from "../../components/layout/Navbar";
import { inventarioService } from "../../services/inventarioService";
import "./movimientoMaterial.css";

function SalidaMaterial() {
  const navigate = useNavigate();
  
  // Estados locales para el formulario
  const [idMaterial, setIdMaterial] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  // Función para procesar el ajuste de salida
  const salida = async () => {
    // Validación: Campos obligatorios
    if (!idMaterial || !cantidad) {
      setError("❌ Todos los campos son obligatorios");
      return;
    }

    // Validación: Cantidad lógica
    if (parseInt(cantidad) <= 0) {
      setError("❌ La cantidad a sacar debe ser mayor a cero");
      return;
    }

    setError("");
    setCargando(true);

    try {
      // Llamada al servicio de salida manual
      await inventarioService.registrarSalida(idMaterial, cantidad);
      
      alert("✅ Ajuste de salida realizado con éxito");
      
      // Limpieza de formulario y regreso al inventario
      setIdMaterial("");
      setCantidad("");
      navigate("/inventario");
      
    } catch (err) {
      // Capturamos el mensaje de error del backend (ej: "Stock insuficiente")
      const mensajeError = err.response?.data?.message || "Error al procesar la salida. Verifique ID y Stock.";
      setError(`❌ ${mensajeError}`);
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Navbar showBack={true} backTo="/inventario" />

      <div className="material-container">
        <h2>Salida de Material (Ajuste)</h2>

        {/* Campo para identificar el platanito (material) */}
        <label className="input-label">ID del Material</label>
        <input
          type="number"
          placeholder="Ingrese ID del material"
          value={idMaterial}
          onChange={(e) => setIdMaterial(e.target.value)}
        />

        {/* Campo para la cantidad que sale por error humano o merma */}
        <label className="input-label">Cantidad a Retirar</label>
        <input
          type="number"
          placeholder="Cantidad a ajustar"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />

        {/* Botón de acción con bloqueo preventivo mientras carga */}
        <button 
          onClick={salida} 
          disabled={cargando}
          style={{ backgroundColor: "#dc3545" }} // Color rojo para indicar salida/alerta
        >
          {cargando ? "Procesando ajuste..." : "Confirmar Salida"}
        </button>

        {/* Sección de mensajes de error */}
        {error && <p className="error-msg">{error}</p>}
      </div>
    </>
  );
}

export default SalidaMaterial;