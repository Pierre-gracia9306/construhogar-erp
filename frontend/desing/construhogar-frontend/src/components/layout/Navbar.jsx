import "./navbar.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar({ showBack = false, showLogout = false, showMenuButton = false, backTo = null }) {

  const navigate = useNavigate();

  const goBack = () => {
    if (backTo) {
      navigate(backTo, { replace: true });
    } else {
      navigate(-1);
    }
  };

  const goToMenu = () => {
    navigate("/menu", { replace: true });
  };

  const handleLogout = () => {
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar">

      {/* IZQUIERDA: VOLVER */}
      <div className="navbar-side left">
        {showBack && (
          <button className="nav-btn" onClick={goBack}>
            <FaArrowLeft className="btn-icon" />
            Volver
          </button>
        )}
      </div>

      {/* CENTRO: TITULO CLICKEABLE */}
      <h1 
        className="navbar-title" 
        style={{ cursor: "pointer" }} 
        onClick={goToMenu}
      >
        CONSTRUHOGAR
      </h1>

      {/* DERECHA */}
      <div className="navbar-side right">

        {showMenuButton && (
          <button className="nav-btn" onClick={goToMenu}>
            Menú Principal
          </button>
        )}

        {showLogout && (
          <button className="nav-btn logout" onClick={handleLogout}>
            Cerrar sesión
          </button>
        )}

      </div>

    </nav>
  );
}

export default Navbar;
