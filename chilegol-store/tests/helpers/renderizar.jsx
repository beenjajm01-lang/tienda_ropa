// Ayuda para las pruebas: dibuja un componente dentro de los mismos "envoltorios"
// que usa la tienda (router, sesión, datos y carrito), pero con datos de prueba (mocks).

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../src/context/AuthContext';
import { TiendaProvider } from '../../src/context/TiendaContext';
import { CartProvider } from '../../src/context/CartContext';
import { mockProductos, mockCategorias } from '../mocks/datos';

export function renderizar(
  componente,
  { ruta = '/', usuario = null, productos = mockProductos, categorias = mockCategorias, carrito = [] } = {}
) {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <AuthProvider usuarioInicial={usuario}>
        <TiendaProvider productosIniciales={productos} categoriasIniciales={categorias} ordenesIniciales={[]}>
          <CartProvider itemsIniciales={carrito}>{componente}</CartProvider>
        </TiendaProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}
