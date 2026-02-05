import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import proveedorService from "../../services/proveedorService"; // Importamos el servicio
import "./proveedor.css";

function ConsultarProveedor() {
  const navigate = useNavigate();
  const [tipoDoc, setTipoDoc] = useState("");
  const [numeroDoc, setNumeroDoc] = useState("");
  const [proveedor, setProveedor] = useState(null); // Para guardar el resultado
  const [error, setError] = useState("");

  const consultar = async () => {
    setError(""); // Limpiar errores previos
    setProveedor(null); // Limpiar resultado previo

    if (!tipoDoc || !numeroDoc) {
      setError("Debe ingresar tipo y número de documento");
      return;
    }

    try {
      // Llamamos al nuevo endpoint del backend
      const data = await proveedorService.buscarPorDocumento(tipoDoc, numeroDoc);
      setProveedor(data);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("El proveedor no existe en el sistema.");
      } else {
        setError("Ocurrió un error al consultar. Intente más tarde.");
      }
    }
  };

  return (
    <>
      <Navbar showBack={true} backTo="/compras" />

      <div className="form-container">
        <h2>Consultar Proveedor</h2>

        <div className="search-group">
          <select value={tipoDoc} onChange={(e) => setTipoDoc(e.target.value)}>
            <option value="CC">Cédula de Ciudadanía</option>
            <option value="NIT">NIT</option>
            <option value="CE">Cédula de Extranjería</option>
          </select>

          <input 
            placeholder="Número documento" 
            value={numeroDoc}
            onChange={(e) => setNumeroDoc(e.target.value)} 
          />
        </div>

        <button className="btn-primary" onClick={consultar}>Consultar</button>

        {/* --- MOSTRAR RESULTADOS SI EXISTE --- */}
        {proveedor && (
          <div className="result-card">
            <h3>Proveedor Encontrado</h3>
            <p><strong>Nombre:</strong> {proveedor.nombre}</p>
            <p><strong>Contacto:</strong> {proveedor.contacto}</p>
            <p><strong>Email:</strong> {proveedor.email}</p>
            
            <button 
              className="btn-edit" 
              onClick={() => navigate(`/compras/modificar-proveedor/${proveedor.idProveedor}`)}
            >
              Editar Información
            </button>
          </div>
        )}

        {/* --- MOSTRAR ERROR Y OPCIÓN DE CREAR --- */}
        {error && (
          <div className="error-container">
            <p className="error-msg">{error}</p>
            <button 
              className="btn-secondary" 
              onClick={() => navigate("/compras/crear-proveedor")}
            >
              Crear nuevo proveedor
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ConsultarProveedor;