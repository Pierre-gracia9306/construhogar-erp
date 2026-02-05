import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import "./compras.css";

function Compras() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar showBack={true} backTo="/menu" />

      <div className="compras-container">
        <h2 className="compras-title">Módulo de Compras</h2>

        <div className="compras-actions">
          <button onClick={() => navigate("/compras/crear-proveedor")}>
            Crear nuevo proveedor
          </button>

          <button onClick={() => navigate("/compras/consultar-proveedor")}>
            Consultar / Modificar proveedor
          </button>

          {/* CORRECCIÓN AQUÍ: Cambiamos /formulario-comprar por /comprar */}
          <button onClick={() => navigate("/compras/comprar")}>
            Registrar Compra de Material
          </button>
        </div>
      </div>
    </>
  );
}

export default Compras;