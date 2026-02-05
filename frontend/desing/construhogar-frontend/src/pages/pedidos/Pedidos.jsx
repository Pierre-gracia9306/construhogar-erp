import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import "./pedidos.css";

function Pedidos() {
  const navigate = useNavigate();

  return (
    <>
      {/* 1. Navbar con botón de menú activo para navegación rápida */}
      <Navbar showMenuButton={true} />

      <div className="pedidos-page">
        <h1 className="pedidos-title">Pedidos</h1>

        {/* 2. Grid de navegación: Organiza las opciones en 2 columnas */}
        <div className="pedidos-grid">

          {/* OPCIÓN: BUSCAR CLIENTE 
              Ruta estratégica: Antes de vender, hay que saber a quién */}
          <div
            className="pedidos-card"
            onClick={() => navigate("/pedidos/consultar-cliente")}
          >
            <h3>Consultar Cliente</h3>
          </div>

          {/* OPCIÓN: REGISTRAR CLIENTE NUEVO 
              Para clientes que llegan por primera vez a Construhogar */}
          <div
            className="pedidos-card"
            onClick={() => navigate("/pedidos/crear-cliente")}
          >
            <h3>Crear Cliente</h3>
          </div>

          {/* OPCIÓN: BUSCAR PEDIDO 
              Usa el componente que acabamos de blindar para ver resúmenes */}
          <div className="pedidos-card"
            onClick={() => navigate("/pedidos/consultar-pedido")}
          >
            <h3>Consultar Pedido</h3>
          </div>

          {/* OPCIÓN: FLUJO DE VENTA DIRECTA 
              Entrada rápida al formulario de selección de materiales */}
          <div className="pedidos-card"
            onClick={() => navigate("/pedidos/crear-pedido")}
          >
            <h3>Crear Pedido</h3>
          </div>

        </div>
      </div>
    </>
  );
}

export default Pedidos;