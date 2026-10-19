import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getProductos } from './data/products';
import { getSesion, cerrarSesion, refrescarSesion } from './data/users';
import MainLayout from './components/templates/MainLayout';
import AdminLayout from './components/templates/AdminLayout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminUsers from './pages/AdminUsers';

export default function App() {
  const [productos, setProductos] = useState(getProductos);
  // Usuario conectado (null si no hay sesión)
  const [usuario, setUsuario] = useState(getSesion);
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('cgs_carrito');
    return guardado ? JSON.parse(guardado) : [];
  });

  useEffect(() => {
    localStorage.setItem('cgs_carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (prod) => {
    setCarrito((prev) => {
      const existe = prev.find((item) => item.id === prod.id);
      if (existe) {
        return prev.map((item) =>
          item.id === prod.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }
      return [...prev, { ...prod, cantidad: 1 }];
    });
  };

  const cambiarCantidad = (id, cant) => {
    if (cant <= 0) {
      eliminarDelCarrito(id);
      return;
    }
    setCarrito((prev) => prev.map((item) => item.id === id ? { ...item, cantidad: cant } : item));
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => {
    setCarrito([]);
  };

  const totalItems = carrito.reduce((acc, p) => acc + p.cantidad, 0);


  const salir = () => {
    cerrarSesion();
    setUsuario(null);
  };

  // El panel avisa cuando cambian los productos
  const recargarProductos = () => setProductos(getProductos());

  // El panel avisa si se editó el usuario conectado
  const recargarSesion = () => setUsuario(refrescarSesion());

  return (
    <BrowserRouter>
      <Routes>
        {/* Tienda: páginas con barra superior */}
        <Route element={<MainLayout totalItems={totalItems} usuario={usuario} onLogout={salir} />}>
          <Route path="/" element={<Home productos={productos} onAgregar={agregarAlCarrito} />} />
          <Route path="/productos" element={<Products productos={productos} onAgregar={agregarAlCarrito} />} />
          <Route path="/products/:id" element={<ProductDetail productos={productos} onAgregar={agregarAlCarrito} />} />
          <Route path="/categorias" element={<Categories productos={productos} onAgregar={agregarAlCarrito} />} />
          <Route path="/nosotros" element={<About />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/carrito" element={
            <Cart
              carrito={carrito}
              onCambiarCantidad={cambiarCantidad}
              onEliminar={eliminarDelCarrito}
              onVaciar={vaciarCarrito}
            />
          } />
          <Route path="/checkout" element={<Checkout carrito={carrito} onVaciarCarrito={vaciarCarrito} />} />
          <Route path="/pago-exitoso" element={<PaymentSuccess />} />
          <Route path="/login" element={<Login onLogin={setUsuario} />} />
          <Route path="/registro" element={<Register />} />
        </Route>

        {/* Panel de administración */}
        <Route
          path="/admin"
          element={
            <AdminLayout
              usuario={usuario}
              onLogout={salir}
              onProductosCambiados={recargarProductos}
              onSesionCambiada={recargarSesion}
            />
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="productos" element={<AdminProducts />} />
          <Route path="usuarios" element={<AdminUsers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

