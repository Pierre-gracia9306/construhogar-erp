import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import { FormularioComprasService } from "../../services/formularioComprasService"; 
import "./formularioCompras.css";

function FormularioCompras() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    tipoDocumento: "",       
    documentoProveedor: "",   
    idProducto: "",  
    cantidad: "",
  });

  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const continuar = async () => {
    if (!form.tipoDocumento || !form.documentoProveedor || !form.idProducto || !form.cantidad) {
      setError("❌ Por favor, completa todos los campos.");
      return;
    }

    setError(""); 
    setCargando(true);

    try {
      // Llamamos al servicio usando los datos del documento
      const datosRecuperados = await FormularioComprasService.validarDatosCompra(
        form.tipoDocumento, 
        form.documentoProveedor,
        form.idProducto
      );

      // Preparamos los datos para el detalle, incluyendo el idProveedor real que vino de la BD
      const datosParaDetalle = {
        idProveedor: datosRecuperados.proveedor.idProveedor, 
        idProducto: form.idProducto,
        cantidad: form.cantidad,
        precioUnitario: datosRecuperados.producto.precio,
        nombreProducto: datosRecuperados.producto.nombre,
        nombreProveedor: datosRecuperados.proveedor.nombre 
      };

      localStorage.setItem("datosCompraTemporal", JSON.stringify(datosParaDetalle));
      navigate("/compras/detalle-compra");
      
    } catch (err) {
      // ✅ Opción A: Usamos 'err' para depuración y para satisfacer a ESLint
      console.error("Error capturado en el flujo de compra:", err);
      setError("❌ No se encontró el Proveedor (verifique NIT/Cédula) o el Producto.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Navbar showBack={true} backTo="/compras" />

      <div className="form-container">
        <h2>Registrar Compra de Material</h2>
        
        <div className="form-group">
          <label style={{ fontSize: '12px', color: '#666' }}>Tipo de Documento Proveedor</label>
          <select name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange} disabled={cargando}>
            <option value="">Seleccione...</option>
            <option value="NIT">NIT</option>
            <option value="CC">Cédula de Ciudadanía</option>
          </select>

          <label style={{ fontSize: '12px', color: '#666' }}>Número de Documento (NIT/CC)</label>
          <input
            name="documentoProveedor"
            type="text"
            placeholder="Ingrese el documento"
            value={form.documentoProveedor}
            onChange={handleChange}
            disabled={cargando}
          />
          
          <label style={{ fontSize: '12px', color: '#666' }}>ID del Material (Producto)</label>
          <input
            name="idProducto"
            type="number"
            placeholder="Ej: 5"
            value={form.idProducto}
            onChange={handleChange}
            disabled={cargando}
          />

          <label style={{ fontSize: '12px', color: '#666' }}>Cantidad a ingresar</label>
          <input
            name="cantidad"
            type="number"
            placeholder="Cantidad"
            value={form.cantidad}
            onChange={handleChange}
            disabled={cargando}
          />
        </div>

        {error && <p style={{ color: "red", fontWeight: "bold", marginTop: "10px", fontSize: "14px" }}>{error}</p>}

        <button onClick={continuar} disabled={cargando}>
          {cargando ? "Buscando Proveedor..." : "Siguiente paso"}
        </button>
      </div>
    </>
  );
}

export default FormularioCompras;