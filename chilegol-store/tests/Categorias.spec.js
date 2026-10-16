// Prueba 9: la página de categorías muestra solo los productos de la categoría elegida.

import { screen, fireEvent } from '@testing-library/react';
import Categorias from '../src/pages/Categorias';
import { renderizar } from './helpers/renderizar';

describe('Categorías', () => {
  it('9. filtra correctamente los productos por categoría', () => {
    localStorage.clear();
    renderizar(<Categorias />, { ruta: '/categorias' });

    // Al entrar se ven todas (3 productos mock)
    expect(screen.getAllByRole('article').length).toBe(3);

    // Elijo la categoría "Mock FC", que tiene 2 productos
    fireEvent.click(screen.getByRole('button', { name: /Mock FC/ }));

    const tarjetas = screen.getAllByRole('article');
    expect(tarjetas.length).toBe(2);
    tarjetas.forEach((tarjeta) => expect(tarjeta.textContent).toContain('Mock FC'));
    expect(screen.queryByText('Camiseta Mock Visita')).toBeNull();
  });
});
