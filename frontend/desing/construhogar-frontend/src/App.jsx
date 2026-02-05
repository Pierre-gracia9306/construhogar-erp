import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import MenuPrincipal from "./pages/menu/MenuPrincipal";

/* =========================
   PEDIDOS
   ========================= */
import Pedidos from "./pages/pedidos/Pedidos";
import ConsultarCliente from "./pages/pedidos/ConsultarCliente";
import EditarCliente from "./pages/pedidos/EditarCliente";
import CrearCliente from "./pages/pedidos/CrearCliente";
import ConsultarPedido from "./pages/pedidos/ConsultarPedido";
import CrearPedido from "./pages/pedidos/CrearPedido";
import ConfirmarPedido from "./pages/pedidos/ConfirmarPedido";
import ResumenPedido from "./pages/pedidos/ResumenPedido";

/* =========================
   INVENTARIO
   ========================= */
import Inventario from "./pages/inventario/Inventario";
import ConsultarMaterial from "./pages/inventario/ConsultarMaterial";
import IngresarMaterial from "./pages/inventario/IngresarMaterial";
import SalidaMaterial from "./pages/inventario/SalidaMaterial";
import CrearMaterial from "./pages/inventario/CrearMaterial";
import ModificarMaterial from "./pages/inventario/ModificarMaterial";

/* =========================
   COMPRAS
   ========================= */
import Compras from "./pages/compras/Compras";
import CrearProveedor from "./pages/compras/CrearProveedor";
import ConsultarProveedor from "./pages/compras/ConsultarProveedor";
import ModificarProveedor from "./pages/compras/ModificarProveedor";
import Comprar from "./pages/compras/FormularioCompras"; 
import DetalleCompra from "./pages/compras/DetalleCompra";

/* =========================
   FACTURACIÓN
   ========================= */
import FacturarMenu from "./pages/facturar/Facturacion";
import ConsultarFactura from "./pages/facturar/ConsultarFactura";
import Facturar from "./pages/facturar/Facturar";
import DetalleFactura from "./pages/facturar/DetalleFactura";

function App() {
  return (
    <Routes>
      {/* ACCESO */}
      <Route path="/" element={<Login />} />
      <Route path="/menu" element={<MenuPrincipal />} />

      {/* =========================
          PEDIDOS
         ========================= */}
      <Route path="/pedidos" element={<Pedidos />} />
      <Route path="/pedidos/consultar-cliente" element={<ConsultarCliente />} />
      <Route path="/pedidos/cliente/:documento" element={<EditarCliente />} />
      <Route path="/pedidos/crear-cliente" element={<CrearCliente />} />
      <Route path="/pedidos/consultar-pedido" element={<ConsultarPedido />} />
      <Route path="/pedidos/crear-pedido" element={<CrearPedido />} />
      <Route path="/pedidos/confirmar" element={<ConfirmarPedido />} />
      <Route path="/pedidos/confirmar/:idPedido" element={<ConfirmarPedido />} />
      <Route path="/pedidos/resumen/:idPedido" element={<ResumenPedido />} />

      {/* =========================
          INVENTARIO
         ========================= */}
      <Route path="/inventario" element={<Inventario />} />
      <Route path="/inventario/consultar-material" element={<ConsultarMaterial />} />
      <Route path="/inventario/ingresar-material" element={<IngresarMaterial />} />
      <Route path="/inventario/salida-material" element={<SalidaMaterial />} />
      <Route path="/inventario/crear-material" element={<CrearMaterial />} />
      <Route path="/inventario/modificar-material" element={<ModificarMaterial />} />

      {/* =========================
          COMPRAS
         ========================= */}
      <Route path="/compras" element={<Compras />} />
      <Route path="/compras/crear-proveedor" element={<CrearProveedor />} />
      <Route path="/compras/consultar-proveedor" element={<ConsultarProveedor />} />
      <Route path="/compras/modificar-proveedor/:id" element={<ModificarProveedor />} /> 
      <Route path="/compras/comprar" element={<Comprar />} />
      <Route path="/compras/detalle-compra" element={<DetalleCompra />} />

      {/* =========================
          FACTURACIÓN
         ========================= */}
      <Route path="/facturacion" element={<FacturarMenu />} />
      <Route path="/facturacion/consultar-factura" element={<ConsultarFactura />} />
      <Route path="/facturacion/facturar" element={<Facturar />} />
      <Route path="/facturacion/detalle/:idFactura" element={<DetalleFactura />} />

    </Routes>
  );
}

export default App;