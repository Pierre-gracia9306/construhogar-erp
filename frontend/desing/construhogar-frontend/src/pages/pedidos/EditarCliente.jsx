import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
// 🔥 CORRECCIÓN 1: Importamos sin llaves {} porque es export default
import clienteService from "../../services/clienteService"; 
import "./editarCliente.css";

function EditarCliente() {
  const { documento } = useParams();
  const navigate = useNavigate();

  const [cliente, setCliente] = useState({
    idCliente: null,
    tipoDocumento: "", 
    numeroDocumento: documento,
    nombre: "",
    telefono: "",
    direccion: "",
    correo: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarCliente = async () => {
      try {
        // 🔥 CORRECCIÓN 2: Usamos el nombre unificado 'consultarPorDocumento'
        const data = await clienteService.consultarPorDocumento(documento);
        if (data) {
          setCliente({
            idCliente: data.idCliente,
            tipoDocumento: data.tipoDocumento,
            numeroDocumento: data.numeroDocumento,
            nombre: data.nombre,
            telefono: data.telefono,
            direccion: data.direccion,
            correo: data.correo,
          });
        }
      } catch (err) {
        console.error("Error cargando cliente:", err);
        setError("No se pudo cargar la información del cliente, mi vale.");
      }
    };

    cargarCliente();
  }, [documento]);

  const actualizarDatos = async () => {
    setError("");

    if (!cliente.nombre || !cliente.telefono) {
      setError("Nombre y teléfono son obligatorios para la obra");
      return;
    }

    try {
      // 🚀 Actualizamos usando el idCliente técnico que nos devolvió el Backend
      await clienteService.actualizar(cliente.idCliente, {
        nombre: cliente.nombre,
        tipoDocumento: cliente.tipoDocumento,
        numeroDocumento: cliente.numeroDocumento,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
        correo: cliente.correo
      });

      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
        navigate("/pedidos/consultar-cliente", { replace: true });
      }, 1500);

    } catch (err) {
      console.error("Error al actualizar:", err);
      setError("❌ No se pudo actualizar. Revise la conexión con el servidor.");
    }
  };

  return (
    <>
      <Navbar
        showBack={true}
        showMenuPrincipal={true}
        backTo="/pedidos/consultar-cliente"
      />

      <div className="cliente-info-container">
        <h2 className="cliente-title">Información del Cliente</h2>

        <div className="cliente-info">
          <label>Documento (No editable):</label>
          <input type="text" value={cliente.numeroDocumento || ""} disabled />

          <label>Nombre:</label>
          <input
            type="text"
            value={cliente.nombre}
            onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })}
          />

          <label>Teléfono:</label>
          <input
            type="text"
            value={cliente.telefono}
            onChange={(e) => setCliente({ ...cliente, telefono: e.target.value })}
          />

          <label>Dirección:</label>
          <input
            type="text"
            value={cliente.direccion}
            onChange={(e) => setCliente({ ...cliente, direccion: e.target.value })}
          />

          <label>Correo:</label>
          <input
            type="email"
            value={cliente.correo}
            onChange={(e) => setCliente({ ...cliente, correo: e.target.value })}
          />

          <button className="guardar-btn" onClick={actualizarDatos}>
            Actualizar Datos
          </button>

          {error && <p className="error-msg">{error}</p>}
        </div>
      </div>

      {showToast && (
        <div className="toast success">
          ✔ ¡Listo! Información actualizada correctamente
        </div>
      )}
    </>
  );
}

export default EditarCliente;