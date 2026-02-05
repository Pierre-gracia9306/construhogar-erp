import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import proveedorService from "../../services/proveedorService"; 
import "./proveedor.css";

function ModificarProveedor() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [proveedor, setProveedor] = useState({
    tipoDocumento: "",
    numeroDocumentoProv: "", // ANTES: numeroDocumento
    nombre: "",
    contacto: "",
    direccion: "",
    email: "",
    telefono: ""
  });

  useEffect(() => {
    const cargarProveedor = async () => {
      try {
        const data = await proveedorService.obtenerPorId(id);
        setProveedor(data);
      } catch {
        setError("No se pudo cargar la información del proveedor.");
      }
    };
    cargarProveedor();
  }, [id]);

  const handleChange = (e) => {
    setProveedor({ ...proveedor, [e.target.name]: e.target.value });
  };

  const confirmar = async () => {
    try {
      setError("");
      // Ahora enviamos numeroDocumentoProv, tal cual como lo espera el Backend
      await proveedorService.actualizarProveedor(id, proveedor);
      setSuccess("¡Proveedor actualizado correctamente!");
      setTimeout(() => navigate("/compras/consultar-proveedor"), 2000);
    } catch {
      setError("Error al actualizar. Verifique que el documento no esté duplicado.");
    }
  };

  return (
    <>
      <Navbar showBack={true} backTo="/compras/consultar-proveedor" />

      <div className="form-container">
        <h2>Modificar Proveedor</h2>

        <div className="row">
          <div className="col">
            <label>Tipo de Documento</label>
            <select 
              name="tipoDocumento" 
              value={proveedor.tipoDocumento || ""} 
              onChange={handleChange}
            >
              <option value="">Seleccione...</option>
              <option value="NIT">NIT</option>
              <option value="CC">Cédula de Ciudadanía</option>
              <option value="CE">Cédula de Extranjería</option>
            </select>
          </div>
          
          <div className="col">
            <label>Número de Documento</label>
            <input 
              name="numeroDocumentoProv" // ANTES: numeroDocumento
              value={proveedor.numeroDocumentoProv || ""} 
              onChange={handleChange} 
            />
          </div>
        </div>

        <label>Razón Social / Nombre</label>
        <input name="nombre" value={proveedor.nombre || ""} onChange={handleChange} />

        <label>Persona de Contacto</label>
        <input name="contacto" value={proveedor.contacto || ""} onChange={handleChange} />

        <label>Dirección</label>
        <input name="direccion" value={proveedor.direccion || ""} onChange={handleChange} />

        <label>Teléfono</label>
        <input name="telefono" value={proveedor.telefono || ""} onChange={handleChange} />

        <label>Email</label>
        <input name="email" value={proveedor.email || ""} onChange={handleChange} />

        <button className="btn-edit" onClick={confirmar}>
          Guardar Cambios Totales
        </button>

        {error && <p className="error-msg">{error}</p>}
        {success && <p className="success-msg">{success}</p>}
      </div>
    </>
  );
}

export default ModificarProveedor;