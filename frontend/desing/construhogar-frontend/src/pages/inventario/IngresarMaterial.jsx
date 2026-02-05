import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redireccionar tras el éxito
import Navbar from "../../components/layout/Navbar";
import { inventarioService } from "../../services/inventarioService";
import "./movimientoMaterial.css";

function IngresarMaterial() {
  const navigate = useNavigate();
  const [idMaterial, setIdMaterial] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  // Función principal para ejecutar la entrada de stock
  const ingresar = async () => {
    // Validación básica: que no haya campos vacíos
    if (!idMaterial || !cantidad) {
      setError("❌ Todos los campos son obligatorios");
      return;
    }

    // Validación: que la cantidad no sea cero o negativa
    if (parseInt(cantidad) <= 0) {
      setError("❌ La cantidad debe ser mayor a cero");
      return;
    }

    setError("");
    setCargando(true);

    try {
      // Llamada al servicio con los datos capturados
      await inventarioService.registrarEntrada(idMaterial, cantidad);
      
      alert("✅ Stock actualizado con éxito");
      
      // Limpiamos los campos después del éxito
      setIdMaterial("");
      setCantidad("");
      
      // Redirigimos al menú principal de inventario
      navigate("/inventario");
    } catch {
      // Manejo de error si el ID no existe o falla el servidor
      setError("❌ Error: Verifique que el ID del material sea correcto.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Navbar showBack={true} backTo="/inventario" />

      <div className="material-container">
        <h2>Entrada de Material</h2>

        {/* Input para el ID del producto (platanito) */}
        <label className="input-label">ID del Material</label>
        <input
          type="number"
          placeholder="Ej: 10"
          value={idMaterial}
          onChange={(e) => setIdMaterial(e.target.value)}
        />

        {/* Input para la cantidad física que entra a bodega */}
        <label className="input-label">Cantidad a Ingresar</label>
        <input
          type="number"
          placeholder="Ej: 50"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />

        {/* Botón de acción con estado de carga */}
        <button onClick={ingresar} disabled={cargando}>
          {cargando ? "Registrando..." : "Confirmar Ingreso"}
        </button>

        {/* Muestra mensajes de error solo si existen */}
        {error && <p className="error-msg">{error}</p>}
      </div>
    </>
  );
}

export default IngresarMaterial;