// Pruebas 2 y 3: ProductCard muestra lo que recibe por props y avisa cuando se agrega al carrito.

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../../components/molecules/ProductCard';
import { mockProductos } from '../mocks/datos';

function dibujar(producto, onAgregar = () => {}) {
  return render(
    <MemoryRouter>
      <ProductCard product={producto} onAgregar={onAgregar} />
    </MemoryRouter>
  );
}

describe('ProductCard (molécula)', () => {
  it('2. muestra el nombre, el precio y el stock que recibe por props', () => {
    dibujar(mockProductos[0]);

    expect(screen.getByRole('link', { name: 'Camiseta Mock Local' })).toBeTruthy();
    expect(screen.getByText('$49.990')).toBeTruthy();
    expect(screen.getByText('Stock: 10')).toBeTruthy();
  });

  it('3. al hacer clic en "Agregar al carrito" ejecuta onAgregar con el producto', () => {
    const onAgregar = jasmine.createSpy('onAgregar');
    dibujar(mockProductos[0], onAgregar);

    fireEvent.click(screen.getByRole('button', { name: 'Agregar al carrito' }));

    expect(onAgregar).toHaveBeenCalledOnceWith(mockProductos[0]);
  });
});
