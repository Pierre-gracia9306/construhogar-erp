import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import { inventarioService } from "../../services/inventarioService";
import "./consultarMaterial.css";

function ConsultarMaterial() {
  const [idMaterial, setIdMaterial] = useState("");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const consultar = async () => {
    if (!idMaterial) {
      setError("❌ Debe ingresar el ID del material");
      setResultado(null);
      return;
    }

    setError("");
    setResultado(null);
    setCargando(true);

    try {
      const data = await inventarioService.consultarPorProducto(idMaterial);
      setResultado(data);
    } catch (err) {
      console.error(err);
      setError("❌ No se encontró el material o no tiene registro de inventario.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Navbar showBack={true} backTo="/inventario" />

      <div className="material-container">
        <h2>Consultar Material</h2>

        {/* Buscador corregido: Etiquetas arriba de los campos */}
        <div className="search-box">
          <label className="input-label">ID del Producto / Material</label>
          <input
            type="number"
            placeholder="Ejemplo: 101"
            value={idMaterial}
            onChange={(e) => setIdMaterial(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && consultar()}
          />
          <button className="btn-consultar" onClick={consultar} disabled={cargando}>
            {cargando ? "Buscando..." : "Consultar Disponibilidad"}
          </button>
        </div>

        {error && <p className="error-msg">{error}</p>}

        {resultado && (
          <div className="resultado-card">
            <div className="card-header">
              <h3>{resultado.producto.nombre}</h3>
              <span className="badge-id">ID: {resultado.producto.idProducto}</span>
            </div>

            <div className="card-body">
              <div className="info-row">
                <span><strong>Marca:</strong> {resultado.producto.marca || "N/A"}</span>
                <span><strong>Categoría:</strong> {resultado.producto.categoria}</span>
              </div>

              <div className="stock-section" style={{ backgroundColor: resultado.stockActual <= 5 ? '#fff5f5' : '#f0fdf4' }}>
                <p className="stock-label" style={{ color: resultado.stockActual <= 5 ? '#c53030' : '#166534' }}>
                  Stock Actual
                </p>
                <p className={`stock-value ${resultado.stockActual <= 5 ? 'low-stock' : ''}`}>
                  {resultado.stockActual} unidades
                </p>
                <p className="ubicacion-text">📍 Ubicación: {resultado.ubicacion || "No asignada"}</p>
              </div>

              <div className="price-section">
                <p><strong>Precio Sugerido:</strong> ${resultado.producto.precio?.toLocaleString()}</p>
                <p><strong>Proveedor:</strong> {resultado.producto.proveedor?.nombre || "No asignado"}</p>
              </div>
              
              <div className="descripcion-text">
                <strong>Descripción:</strong> {resultado.producto.descripcion || "Sin descripción disponible."}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ConsultarMaterial;