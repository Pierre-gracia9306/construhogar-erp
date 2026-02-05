import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Chofer para volver al menú
import Navbar from "../../components/layout/Navbar";
import proveedorService from "../../services/proveedorService"; 
import "./proveedor.css";

function CrearProveedor() {
  const navigate = useNavigate();

  // Estado inicial limpio
  const initialForm = {
    nombre: "",
    tipoDocumento: "",
    numeroDocumentoProv: "",
    contacto: "",
    direccion: "",
    email: "",
    telefono: "",
  };

  const [proveedor, setProveedor] = useState(initialForm);
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });

  // Manejador de cambios: captura lo que el usuario escribe
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProveedor((prev) => ({ ...prev, [name]: value }));
  };

  // Función principal: El "maestro de obra" que envía los datos
  const crearProveedor = async () => {
    
    // 1. BLINDAJE: Limpiamos espacios en blanco accidentales (Trim)
    // Esto evita que "123 " se guarde mal en la base de datos
    const proveedorLimpio = {
      ...proveedor,
      nombre: proveedor.nombre.trim(),
      tipoDocumento: proveedor.tipoDocumento.trim(),
      numeroDocumentoProv: proveedor.numeroDocumentoProv.trim(),
      contacto: proveedor.contacto.trim(),
      direccion: proveedor.direccion.trim(),
      email: proveedor.email.trim(),
      telefono: proveedor.telefono.trim(),
    };

    // 2. VALIDACIÓN: Verificamos campos obligatorios
    if (!proveedorLimpio.nombre || !proveedorLimpio.numeroDocumentoProv || !proveedorLimpio.tipoDocumento) {
      setMensaje({ 
        texto: "Nombre, tipo y número de documento son obligatorios, mi vale.", 
        tipo: "error" 
      });
      return;
    }

    try {
      // 3. ENVÍO: Mandamos el objeto limpio al Backend
      await proveedorService.crearProveedor(proveedorLimpio);
      
      // 4. ÉXITO: Feedback visual para el usuario
      setMensaje({ texto: "✅ ¡Proveedor creado con éxito!", tipo: "success" });
      
      // Limpiamos los campos inmediatamente
      setProveedor(initialForm); 
      
      /**
       * 🚀 SALTO AUTOMÁTICO:
       * Damos 2 segundos para que el usuario lea el éxito y 
       * arrancamos pal' menú de compras.
       */
      setTimeout(() => {
        navigate("/compras");
      }, 2000);
      
    } catch (error) {
      console.error("Error al crear proveedor:", error);
      // Si falla, es probable que sea conexión o el nombre de campo en Java
      setMensaje({ 
        texto: "Se nos embolató la creación. Revisa que el NIT no sea duplicado.", 
        tipo: "error" 
      });
    }
  };

  return (
    <>
      {/* Navbar con opción de regreso manual */}
      <Navbar showBack={true} backTo="/compras" />

      <div className="form-container">
        <h2>Crear Proveedor</h2>

        <label>Nombre / Razón social</label>
        <input 
          name="nombre" 
          value={proveedor.nombre} 
          placeholder="Ej: Ferretería El Platanito" 
          onChange={handleChange} 
        />

        <label>Tipo de Documento</label>
        <select 
          name="tipoDocumento" 
          value={proveedor.tipoDocumento} 
          onChange={handleChange}
        >
          <option value="">Seleccione tipo...</option>
          <option value="NIT">NIT (Empresas)</option>
          <option value="CC">Cédula de Ciudadanía</option>
          <option value="CE">Cédula de Extranjería</option>
        </select>

        <label>Número de Documento</label>
        <input 
          name="numeroDocumentoProv" 
          value={proveedor.numeroDocumentoProv} 
          placeholder="Número sin puntos ni guiones" 
          onChange={handleChange} 
        />
        
        <label>Contacto</label>
        <input 
          name="contacto" 
          value={proveedor.contacto} 
          placeholder="Nombre de la persona encargada" 
          onChange={handleChange} 
        />
        
        <label>Dirección</label>
        <input 
          name="direccion" 
          value={proveedor.direccion} 
          placeholder="Dirección del local" 
          onChange={handleChange} 
        />
        
        <label>Correo electrónico</label>
        <input 
          name="email" 
          value={proveedor.email} 
          placeholder="correo@ejemplo.com" 
          onChange={handleChange} 
        />
        
        <label>Teléfono</label>
        <input 
          name="telefono" 
          value={proveedor.telefono} 
          placeholder="Celular o fijo" 
          onChange={handleChange} 
        />

        {/* Botón de acción principal */}
        <button onClick={crearProveedor}>Crear proveedor</button>

        {/* Notificaciones flotantes */}
        {mensaje.texto && (
          <div className={mensaje.tipo === "success" ? "success-msg" : "error-msg"}>
            {mensaje.texto}
          </div>
        )}
      </div>
    </>
  );
}

export default CrearProveedor;