import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
// 🔥 CORRECCIÓN: Importación sin llaves {} para que reconozca el export default
import clienteService from "../../services/clienteService"; 
import "./crearCliente.css";

function CrearCliente() {
  const navigate = useNavigate();

  const [cliente, setCliente] = useState({
    tipoDoc: "",
    documento: "",
    nombre: "",
    telefono: "",
    direccion: "",
    correo: "",
  });

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  const handleChange = (field, value) => {
    setCliente((prev) => ({ ...prev, [field]: value }));
  };

  const crearCliente = async () => {
    const campos = Object.values(cliente);
    const tieneVacios = campos.some((c) => c.trim() === "");

    if (tieneVacios) {
      setToast({
        show: true,
        message: "Todos los campos son obligatorios, mi vale",
        type: "error",
      });
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 1500);
      return;
    }

    try {
      // Mapeo exacto para tu Entity de Java
      const datosParaBackend = {
        nombre: cliente.nombre,
        tipoDocumento: cliente.tipoDoc,
        numeroDocumento: cliente.documento,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
        correo: cliente.correo
      };

      await clienteService.crear(datosParaBackend);

      setToast({
        show: true,
        message: "Cliente creado correctamente ✔",
        type: "success",
      });

      setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
        navigate("/pedidos", { replace: true });
      }, 1500);

    } catch (err) {
      console.error("Error al crear cliente:", err);
      setToast({
        show: true,
        message: "Error: El documento ya existe o el servidor está caído",
        type: "error",
      });
      setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
    }
  };

  return (
    <>
      <Navbar showBack={true} backTo="/pedidos" />

      <div className="crear-container">
        <h2 className="crear-title">Crear Nuevo Cliente</h2>

        <div className="crear-form">
          <label>Tipo de documento:</label>
          <select
            value={cliente.tipoDoc}
            onChange={(e) => handleChange("tipoDoc", e.target.value)}
          >
            <option value="">Seleccione</option>
            <option value="CC">CC</option>
            <option value="TI">TI</option>
            <option value="CE">CE</option>
            <option value="NIT">NIT</option>
          </select>

          <label>Número de documento:</label>
          <input
            type="text"
            value={cliente.documento}
            onChange={(e) => handleChange("documento", e.target.value)}
            placeholder="Ej: 12345678"
          />

          <label>Nombre Completo:</label>
          <input
            type="text"
            value={cliente.nombre}
            onChange={(e) => handleChange("nombre", e.target.value)}
          />

          <label>Teléfono:</label>
          <input
            type="text"
            value={cliente.telefono}
            onChange={(e) => handleChange("telefono", e.target.value)}
          />

          <label>Dirección:</label>
          <input
            type="text"
            value={cliente.direccion}
            onChange={(e) => handleChange("direccion", e.target.value)}
          />

          <label>Correo Electrónico:</label>
          <input
            type="email"
            value={cliente.correo}
            onChange={(e) => handleChange("correo", e.target.value)}
          />

          <button className="crear-btn" onClick={crearCliente}>
            Registrar Cliente
          </button>
        </div>
      </div>

      {toast.show && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </>
  );
}

export default CrearCliente;