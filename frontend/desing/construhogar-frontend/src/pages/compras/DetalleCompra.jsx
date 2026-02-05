import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { FormularioComprasService } from "../../services/formularioComprasService";
import "./detalleCompra.css";

function DetalleCompra() {
  const navigate = useNavigate();
  const [datos, setDatos] = useState(null);
  const [empleado, setEmpleado] = useState(null);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    // 1. Recuperamos los datos de la compra del localStorage (guardados en el paso anterior)
    const guardados = localStorage.getItem("datosCompraTemporal");
    // 2. Recuperamos el empleado del sessionStorage (el que se logueó)
    const logueado = sessionStorage.getItem("usuarioLogueado");

    if (guardados && logueado) {
      setDatos(JSON.parse(guardados));
      setEmpleado(JSON.parse(logueado));
    } else {
      // Si el usuario borra el caché o se sale, lo mandamos al inicio
      if (!logueado) navigate("/login");
      else navigate("/compras/comprar"); 
    }
  }, [navigate]);

  const confirmar = async () => {
    setCargando(true);
    try {
      /**
       * 🚨 ¡ALERTA TÉCNICA! 
       * Verifica que en tu Backend (CompraController), el @RequestBody 
       * coincida exactamente con estos nombres. Si en Java el campo se llama 
       * "id_proveedor" (con guión), aquí fallará.
       */
      const dataParaEnviar = {
        idProveedor: datos.idProveedor,
        idProducto: datos.idProducto,
        idEmpleado: empleado.idEmpleado, 
        cantidad: parseInt(datos.cantidad),
        precioUnitario: parseFloat(datos.precioUnitario) // Aseguramos que sea número
      };

      // 3. Enviamos la petición al servidor
      await FormularioComprasService.crearCompra(dataParaEnviar);
      
      alert(`✅ ¡Compra exitosa! Se han ingresado ${datos.cantidad} unidades al inventario.`);
      
      // Limpiamos la mesa de trabajo
      localStorage.removeItem("datosCompraTemporal");
      navigate("/compras");

    } catch (err) {
      /**
       * Si el servidor responde 500, intentamos leer el mensaje de error 
       * que viene de Java (ej: Error de llave foránea o campo nulo)
       */
      const mensajeError = err.response?.data?.message || "Error interno en el servidor (500)";
      console.error("Detalle del error en el Backend:", err.response?.data);
      alert(`❌ Error al procesar: ${mensajeError}`);
      
    } finally {
      setCargando(false);
    }
  };

  if (!datos || !empleado) return <div className="loading">Cargando resumen de la obra...</div>;

  const totalOperacion = datos.cantidad * datos.precioUnitario;

  return (
    <>
      <Navbar showBack={true} backTo="/compras/comprar" />

      <div className="detalle-container">
        <h2>Confirmación de Ingreso de Material</h2>
        
        <div className="detalle-card">
          <div className="detalle-section">
            <h3>📦 Información del Material</h3>
            <p><strong>Producto:</strong> {datos.nombreProducto || `ID: ${datos.idProducto}`}</p>
            <p><strong>Proveedor:</strong> {datos.nombreProveedor || `ID: ${datos.idProveedor}`}</p>
          </div>

          <div className="detalle-section">
            <h3>💰 Valores de la Compra</h3>
            <p><strong>Cantidad:</strong> {datos.cantidad} unidades</p>
            <p><strong>Precio Unitario:</strong> ${datos.precioUnitario.toLocaleString()}</p>
            <hr />
            <p className="total-highlight"><strong>TOTAL OPERACIÓN:</strong> ${totalOperacion.toLocaleString()}</p>
          </div>

          <div className="detalle-footer">
            <p><strong>Registrado por:</strong> {empleado.nombre}</p>
            <p><strong>Cargo:</strong> {empleado.cargo}</p>
          </div>
        </div>

        <div className="detalle-actions">
          <button 
            className="btn-confirmar" 
            onClick={confirmar} 
            disabled={cargando}
          >
            {cargando ? "🔨 Procesando en BD..." : "Confirmar e Incrementar Stock"}
          </button>
          
          <button 
            className="btn-cancelar" 
            onClick={() => navigate("/compras")} 
            disabled={cargando}
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}

export default DetalleCompra;