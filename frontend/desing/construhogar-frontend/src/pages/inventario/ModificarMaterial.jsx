import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { materialService } from "../../services/materialService";
import "./modificarMaterial.css";

function ModificarMaterial() {
  const navigate = useNavigate();
  const [idBuscar, setIdBuscar] = useState("");
  const [material, setMaterial] = useState({
    idProducto: "",
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

  // Función para cargar los datos actuales del material desde el Backend
  const cargarMaterial = async () => {
    if (!idBuscar) {
      setError("❌ Ingrese un ID para buscar.");
      return;
    }
    setError("");
    setCargando(true);
    try {
      const data = await materialService.buscarPorId(idBuscar); 
      // Mapeo de la respuesta del Backend (Producto + Proveedor) al estado local
      setMaterial({
        idProducto: data.idProducto,
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        categoria: data.categoria,
        marca: data.marca,
        tipoDocumento: data.proveedor?.tipoDocumento || "",
        documentoProveedor: data.proveedor?.numeroDocumentoProv || ""
      });
    } catch {
      // Se elimina el parámetro 'err' para evitar el warning de variable no usada
      setError("❌ No se encontró el material con ese ID.");
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterial((prev) => ({ ...prev, [name]: value }));
  };

  // Función para enviar los datos modificados al Backend vía PUT
  const modificar = async () => {
    if (!material.idProducto) {
      setError("❌ Primero debe cargar un material.");
      return;
    }

    setCargando(true);
    try {
      // Estructura de objeto compatible con la Entidad Producto de Java
      const objetoUpdate = {
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

      await materialService.actualizarMaterial(material.idProducto, objetoUpdate);
      alert("✅ Material actualizado correctamente");
      navigate("/inventario");
    } catch {
      // Captura de error silenciosa para el linter, pero informativa para el usuario
      setError("❌ Error al actualizar. Verifique que el proveedor exista.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Navbar showBack={true} backTo="/inventario" />

      <div className="material-container">
        <h2>Modificar Material</h2>

        {error && <p className="error-msg">{error}</p>}

        {/* Sección de búsqueda inicial */}
        <div className="search-section">
          <label>ID Material a buscar</label>
          <div className="search-row">
            <input
              type="number"
              value={idBuscar}
              onChange={(e) => setIdBuscar(e.target.value)}
              placeholder="Ej: 5"
            />
            <button className="btn-buscar" onClick={cargarMaterial}>Buscar</button>
          </div>
        </div>

        <hr />

        {/* Campos de edición */}
        <label>Nombre</label>
        <input type="text" name="nombre" value={material.nombre} onChange={handleChange} />

        <label>Marca</label>
        <input type="text" name="marca" value={material.marca} onChange={handleChange} />

        <label>Precio</label>
        <input type="number" name="precio" value={material.precio} onChange={handleChange} />

        {/* Fila doble para datos del proveedor */}
        <div className="form-row">
          <div className="form-group">
            <label>Tipo Doc. Proveedor</label>
            <select name="tipoDocumento" value={material.tipoDocumento} onChange={handleChange}>
              <option value="">Seleccione...</option>
              <option value="NIT">NIT</option>
              <option value="CC">CC</option>
            </select>
          </div>
          <div className="form-group">
            <label>Doc. Proveedor</label>
            <input type="text" name="documentoProveedor" value={material.documentoProveedor} onChange={handleChange} />
          </div>
        </div>

        <label>Categoría</label>
        <input type="text" name="categoria" value={material.categoria} onChange={handleChange} />

        <label>Descripción</label>
        <textarea name="descripcion" value={material.descripcion} onChange={handleChange} />

        <button className="btn-confirmar" onClick={modificar} disabled={cargando}>
          {cargando ? "Procesando..." : "Confirmar modificación"}
        </button>
      </div>
    </>
  );
}

export default ModificarMaterial;