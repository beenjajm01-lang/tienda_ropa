// Prueba 4: el catálogo muestra todos los productos y el buscador filtra mientras se escribe.

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Products from '../../pages/Products';
import { mockProductos } from '../mocks/datos';

describe('Products (catálogo)', () => {
  it('4. muestra todos los productos y el buscador actualiza la lista al escribir', () => {
    render(
      <MemoryRouter>
        <Products productos={mockProductos} onAgregar={() => {}} />
      </MemoryRouter>
    );

    // Cada ProductCard es un <article>
    expect(screen.getAllByRole('article').length).toBe(3);

    // El texto del buscador se guarda en el estado y la lista se vuelve a dibujar
    const buscador = screen.getByPlaceholderText(/Buscar camiseta/);
    fireEvent.change(buscador, { target: { value: 'wanderers' } });

    expect(buscador.value).toBe('wanderers');
    const tarjetas = screen.getAllByRole('article');
    expect(tarjetas.length).toBe(1);
    expect(tarjetas[0].textContent).toContain('Camiseta Mock Visita');
  });
});
