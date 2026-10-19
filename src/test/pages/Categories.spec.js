// Prueba 9: la página de categorías muestra solo los productos de la categoría elegida.

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Categories from '../../pages/Categories';
import { mockProductos } from '../mocks/datos';

describe('Categories', () => {
  it('9. filtra correctamente los productos por categoría', () => {
    render(
      <MemoryRouter>
        <Categories productos={mockProductos} onAgregar={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getAllByRole('article').length).toBe(3);

    fireEvent.click(screen.getByRole('button', { name: 'Shorts' }));
    let tarjetas = screen.getAllByRole('article');
    expect(tarjetas.length).toBe(1);
    expect(tarjetas[0].textContent).toContain('Short Mock');

    fireEvent.click(screen.getByRole('button', { name: 'Camisetas' }));
    tarjetas = screen.getAllByRole('article');
    expect(tarjetas.length).toBe(2);
    tarjetas.forEach((tarjeta) => expect(tarjeta.textContent).toContain('Camisetas'));
  });
});
