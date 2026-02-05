import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Navbar from "../../components/layout/Navbar";
import "../../styles/forms.css";

function Login() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!usuario || !password) {
      alert("Por favor ingrese usuario y contraseña, mi vale");
      return;
    }

    setCargando(true);

    try {
      const response = await fetch("http://localhost:8080/api/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: usuario,
          password: password,
        }),
      });

      if (response.ok) {
        const empleado = await response.json();
        
        // 🔥 CORRECCIÓN CLAVE: 
        // Cambiamos "usuarioLogueado" por "usuario" para que coincida con ConfirmarPedido.jsx
        sessionStorage.setItem("usuario", JSON.stringify(empleado));

        navigate("/menu");
      } else {
        alert("❌ Correo o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      alert("❌ Error de conexión con el servidor. ¿Prendió el Backend?");
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2 className="title">Iniciar Sesión</h2>
        <Input
          label="Correo Electrónico"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          placeholder="ejemplo@construhogar.com"
          disabled={cargando}
        />
        <Input
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ingrese su contraseña"
          disabled={cargando}
        />
        <Button 
          text={cargando ? "Verificando..." : "Iniciar Sesión"} 
          onClick={handleLogin} 
          disabled={cargando}
        />
      </div>
    </>
  );
}

export default Login;