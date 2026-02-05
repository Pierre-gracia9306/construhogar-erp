import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { materialService } from "../../services/materialService";
import "./crearMaterial.css";

function CrearMaterial() {
  const navigate = useNavigate();
  const [material, setMaterial] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: "",
    marca: "",
    tipoDocumento: "",
    documentoProveedor: ""
  });

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterial((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const crear = async () => {
    if (!material.nombre || !material.precio || !material.documentoProveedor || !material.tipoDocumento) {
      setError("❌ Por favor, completa los campos obligatorios (Nombre, Precio y Proveedor).");
      return;
    }

    setError("");
    setCargando(true);

    try {
      const objetoProducto = {
        nombre: material.nombre,
        descripcion: material.descripcion,
        precio: parseFloat(material.precio),
        categoria: material.categoria,
        marca: material.marca,
        proveedor: {
          tipoDocumento: material.tipoDocumento,
          numeroDocumentoProv: material.documentoProveedor
        }
      };

      // 🔥 CAPTURAMOS LA RESPUESTA: El backend devuelve el producto con su ID
      const respuesta = await materialService.crearMaterial(objetoProducto);
      
      // Extraemos el ID del objeto que nos devolvió el servidor
      const nuevoId = respuesta.idProducto; 

      // Mostramos la alerta con el consecutivo/ID asignado
      alert(`✅ Material creado con éxito.\n🆔 ID ASIGNADO: ${nuevoId}\n\nGuarde este número para futuras consultas.`);
      
      navigate("/inventario");

    } catch (err) {
      console.error("Error al crear material:", err);
      setError("❌ Error: No se encontró el proveedor o el servidor falló.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Navbar showBack={true} backTo="/inventario" />
      <div className="material-container">
        <h2>Crear Nuevo Material</h2>
        {error && <div className="error-alert">{error}</div>}
        
        <div className="form-grid">
          <div className="form-item">
            <label>Nombre del Material *</label>
            <input
              type="text"
              name="nombre"
              placeholder="Ej: Cemento Gris"
              value={material.nombre}
              onChange={handleChange}
            />
          </div>

          <div className="form-item">
            <label>Marca</label>
            <input
              type="text"
              name="marca"
              placeholder="Ej: Argos"
              value={material.marca}
              onChange={handleChange}
            />
          </div>

          <div className="form-item">
            <label>Precio de Venta *</label>
            <input
              type="number"
              name="precio"
              placeholder="0.00"
              value={material.precio}
              onChange={handleChange}
            />
          </div>

          <div className="form-item">
            <label>Categoría</label>
            <input
              type="text"
              name="categoria"
              placeholder="Ej: Construcción"
              value={material.categoria}
              onChange={handleChange}
            />
          </div>

          <div className="form-item">
            <label>Tipo Documento Proveedor *</label>
            <select name="tipoDocumento" value={material.tipoDocumento} onChange={handleChange}>
              <option value="">Seleccione...</option>
              <option value="NIT">NIT</option>
              <option value="CC">Cédula de Ciudadanía</option>
            </select>
          </div>

          <div className="form-item">
            <label>Documento Proveedor *</label>
            <input
              type="text"
              name="documentoProveedor"
              placeholder="NIT o Cédula"
              value={material.documentoProveedor}
              onChange={handleChange}
            />
          </div>
        </div>

        <label>Descripción</label>
        <textarea
          name="descripcion"
          placeholder="Detalles adicionales del material..."
          value={material.descripcion}
          onChange={handleChange}
        />

        <button 
          className="btn-crear" 
          onClick={crear} 
          disabled={cargando}
        >
          {cargando ? "Procesando..." : "Crear material"}
        </button>
      </div>
    </>
  );
}

export default CrearMaterial;