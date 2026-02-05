import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import "./facturacion.css";

function Facturacion() {
  const navigate = useNavigate();

  return (
    <>
      {/* 1. Navbar con retorno al Menú Principal */}
      <Navbar showBack={true} backTo="/menu" />

      <div className="facturacion-container">
        <h2 className="facturacion-title">Módulo de Facturación</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          Gestione las ventas legales de Construhogar
        </p>

        <div className="facturacion-actions">
          
          {/* 2. BOTÓN: CONSULTAR FACTURA 
              Ruta: /facturacion/consultar-factura (Sincronizada con App.jsx) */}
          <button 
            className="btn-accion-factura"
            onClick={() => navigate("/facturacion/consultar-factura")}
          >
            <span className="icon">🔍</span>
            Consultar Factura Existente
          </button>

          {/* 3. BOTÓN: CREAR FACTURA 
              Ruta: /facturacion/facturar (Sincronizada con App.jsx) */}
          <button 
            className="btn-accion-factura btn-primario"
            onClick={() => navigate("/facturacion/facturar")}
          >
            <span className="icon">📄</span>
            Crear Nueva Factura
          </button>

        </div>
      </div>
    </>
  );
}

export default Facturacion;