// Componente principal de la aplicación.
// 1. Envuelve todo con los contextos (sesión, tienda y carrito)
// 2. Define las rutas: qué página se muestra en cada URL (React Router)

import { Outlet, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { TiendaProvider } from './context/TiendaContext';
import { CartProvider } from './context/CartContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AvisoCarrito from './components/AvisoCarrito';
import RutaAdmin from './components/RutaAdmin';
import ScrollAlInicio from './components/ScrollAlInicio';

import Home from './pages/Home';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import Categorias from './pages/Categorias';
import Ofertas from './pages/Ofertas';
import Carrito from './pages/Carrito';
import Checkout from './pages/Checkout';
import CompraExitosa from './pages/CompraExitosa';
import CompraFallida from './pages/CompraFallida';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import Blogs from './pages/Blogs';
import DetalleBlog from './pages/DetalleBlog';
import NoEncontrado from './pages/NoEncontrado';

import Admin from './pages/Admin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProductos from './pages/admin/AdminProductos';
import AdminCategorias from './pages/admin/AdminCategorias';
import AdminOrdenes from './pages/admin/AdminOrdenes';
import AdminUsuarios from './pages/admin/AdminUsuarios';
import AdminReportes from './pages/admin/AdminReportes';
import AdminPerfil from './pages/admin/AdminPerfil';

// Estructura que comparten todas las páginas de la tienda: barra arriba y footer abajo
function LayoutTienda() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <AvisoCarrito />
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <TiendaProvider>
        <CartProvider>
          <ScrollAlInicio />
          <Routes>
            <Route element={<LayoutTienda />}>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/productos/:id" element={<DetalleProducto />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/ofertas" element={<Ofertas />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/compra-exitosa" element={<CompraExitosa />} />
              <Route path="/compra-fallida" element={<CompraFallida />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<DetalleBlog />} />
              <Route path="*" element={<NoEncontrado />} />
            </Route>

            {/* Panel administrativo: solo para usuarios con rol "admin" */}
            <Route
              path="/admin"
              element={
                <RutaAdmin>
                  <Admin />
                </RutaAdmin>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="productos" element={<AdminProductos />} />
              <Route path="categorias" element={<AdminCategorias />} />
              <Route path="ordenes" element={<AdminOrdenes />} />
              <Route path="usuarios" element={<AdminUsuarios />} />
              <Route path="reportes" element={<AdminReportes />} />
              <Route path="perfil" element={<AdminPerfil />} />
            </Route>
          </Routes>
        </CartProvider>
      </TiendaProvider>
    </AuthProvider>
  );
}

export default App;
