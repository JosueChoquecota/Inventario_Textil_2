import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import TrabajadoresPage from "../pages/Trabajadores/TrabajadoresPage";
import ProveedoresPage from "../pages/Proveedores/ProveedoresPage";
import InventarioPage from "../pages/Inventario/InventarioPage";
import ComprasPage from "../pages/Compras/ComprasPage";
import DashboardLayout from "../layouts/DashboardLayout";
import CategoriasPage from "../pages/Categoria/CategoriasPage";
import MarcasPage from "../pages/Marca/MarcaPage";
import ClientesPage from "../pages/Clientes/ClientesPage";
import VentasPage from "../pages/Ventas/VentasPage";
import ConfiguracionPage from "../pages/Compras/ConfiguracionCompras/ConfiguracionPage";
import ConfiguracionUserPage from "../pages/Configuracion/ConfiguracionUserPage";
import GestionRolesPage from "../pages/Configuracion/GestionRolesPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import StockPage from "../pages/Stock/StockPage";
import Spinner from "../components/Common/Spinner";

function AppRouter() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Spinner fullScreen size="3rem" />
    );
  }



  return (
    <Routes>
      {/* ✅ Ruta pública: Login */}
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" replace /> : <Login />}
      />

      {/* ✅ Rutas protegidas: Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="Dashboard" element={<DashboardPage />} />
        <Route index element={<InventarioPage />} />
        <Route path="inventario" element={<InventarioPage />} />

        <Route path="inventario">
          <Route index element={<InventarioPage />} />
          <Route path="categorias" element={<CategoriasPage />} />
          <Route path="marcas" element={<MarcasPage />} />
        </Route>

        <Route path="trabajadores" element={<TrabajadoresPage />} />
        <Route path="proveedores" element={<ProveedoresPage />} />

        <Route path="compras">
          <Route index element={<ComprasPage />} />
          <Route path="configuracion" element={<ConfiguracionPage />} />
        </Route>

        <Route path="clientes" element={<ClientesPage />} />
        <Route path="ventas" element={<VentasPage />} />
        <Route path="stock" element={<StockPage />} />
        <Route path="configuracion" element={<ConfiguracionUserPage />} />
        <Route path="roles" element={<GestionRolesPage />} />
      </Route>

      {/* ✅ Ruta por defecto: redirigir según autenticación */}
      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}
export default AppRouter;