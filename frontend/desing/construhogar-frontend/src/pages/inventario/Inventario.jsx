import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import "./inventario.css";

function Inventario() {
  // El hook useNavigate nos permite movernos entre las diferentes vistas de la app
  const navigate = useNavigate();

  return (
    <>
      {/* Navbar con botón de regreso al menú principal de la aplicación */}
      <Navbar showBack={true} backTo="/menu" />

      <div className="inventario-container">
        <h2 className="inventario-title">Gestión de Inventario</h2>

        <div className="inventario-actions">
          
          {/* Acción para ver el stock actual de un platanito (material) específico */}
          <button onClick={() => navigate("/inventario/consultar-material")}>
            Consultar material
          </button>

          {/* Acción para registrar compras o carga de stock (Suma) */}
          <button onClick={() => navigate("/inventario/ingresar-material")}>
            Entrada material
          </button>

          {/* Acción para registrar ajustes manuales o mermas (Resta) */}
          <button onClick={() => navigate("/inventario/salida-material")}>
            Salida material
          </button>

          {/* Acción para dar de alta un nuevo producto en el catálogo */}
          <button onClick={() => navigate("/inventario/crear-material")}>
            Crear material
          </button>

          {/* Acción para actualizar datos informativos de un producto existente */}
          <button onClick={() => navigate("/inventario/modificar-material")}>
            Editar material
          </button>

        </div>
      </div>
    </>
  );
}

export default Inventario;