// Prueba 1: ProductList dibuja una tarjeta por cada producto que recibe.

import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductList from '../src/components/ProductList';
import { mockProductos } from './mocks/datos';

describe('ProductList', () => {
  it('1. muestra todos los productos que recibe', () => {
    render(
      <MemoryRouter>
        <ProductList productos={mockProductos} onAgregar={() => {}} />
      </MemoryRouter>
    );

    // Cada ProductCard es un <article>, así que debe haber 3
    const tarjetas = screen.getAllByRole('article');
    expect(tarjetas.length).toBe(mockProductos.length);

    // Y cada nombre del mock aparece en pantalla
    mockProductos.forEach((producto) => {
      expect(screen.getByText(producto.nombre)).toBeTruthy();
    });
  });
});
