// Pruebas 2 y 3: ProductCard muestra sus props y avisa cuando se presiona "Agregar al carrito".

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../src/components/ProductCard';
import { mockProductos } from './mocks/datos';

describe('ProductCard', () => {
  it('2. muestra el nombre y el precio correctos (props)', () => {
    const producto = mockProductos[1]; // Camiseta Mock Local, $52.990, sin oferta

    render(
      <MemoryRouter>
        <ProductCard producto={producto} onAgregar={() => {}} />
      </MemoryRouter>
    );

    expect(screen.getByText('Camiseta Mock Local')).toBeTruthy();
    expect(screen.getByText('$52.990')).toBeTruthy();
  });

  it('3. al hacer clic en "Agregar al carrito" ejecuta la función del botón', () => {
    // Un "spy" de Jasmine es una función falsa que recuerda si la llamaron y con qué datos
    const onAgregar = jasmine.createSpy('onAgregar');
    const producto = mockProductos[0];

    render(
      <MemoryRouter>
        <ProductCard producto={producto} onAgregar={onAgregar} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }));

    expect(onAgregar).toHaveBeenCalledTimes(1);
    expect(onAgregar).toHaveBeenCalledWith(producto);
  });
});
