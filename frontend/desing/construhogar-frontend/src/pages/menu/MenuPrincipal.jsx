import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import "./menu.css";

function MenuPrincipal() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar showLogout={true} />
      <div className="menu-page">
        <h1 className="menu-title">Menú Principal</h1>
        <div className="menu-grid">
          <div className="menu-card" onClick={() => navigate("/pedidos")}>
            <h3>Pedidos</h3>
          </div>
          <div className="menu-card" onClick={() => navigate("/inventario")}>
            <h3>Inventario</h3>
          </div>
          <div className="menu-card" onClick={() => navigate("/compras")}>
            <h3>Compras</h3>
          </div>
          {/* 🔥 RUTA CORREGIDA: Apuntando al mapa maestro */}
          <div className="menu-card" onClick={() => navigate("/facturacion")}>
            <h3>Facturación</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default MenuPrincipal;