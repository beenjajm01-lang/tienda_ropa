// Pruebas 5, 6 y 7: el carrito pide aumentar la cantidad, quita productos y calcula el total.
// Las funciones del carrito se reemplazan por spies (mocks) para ver con qué datos se llaman.

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Cart from '../../pages/Cart';
import { crearCarritoMock } from '../mocks/datos';

describe('Cart (carrito de compras)', () => {
  let carrito;
  let onCambiarCantidad;
  let onEliminar;
  let contenedor;

  beforeEach(() => {
    carrito = crearCarritoMock();
    onCambiarCantidad = jasmine.createSpy('onCambiarCantidad');
    onEliminar = jasmine.createSpy('onEliminar');
    contenedor = render(
      <MemoryRouter>
        <Cart carrito={carrito} onCambiarCantidad={onCambiarCantidad} onEliminar={onEliminar} onVaciar={() => {}} />
      </MemoryRouter>
    ).container;
  });

  it('5. el botón "+" pide aumentar la cantidad del producto en 1', () => {
    // El primer producto tiene cantidad 2
    fireEvent.click(screen.getAllByRole('button', { name: '+' })[0]);

    expect(onCambiarCantidad).toHaveBeenCalledOnceWith(1, 3);
  });

  it('6. el botón "Quitar" elimina el producto correcto', () => {
    fireEvent.click(screen.getAllByRole('button', { name: 'Quitar' })[1]);

    expect(onEliminar).toHaveBeenCalledOnceWith(2);
    expect(onCambiarCantidad).not.toHaveBeenCalled();
  });

  it('7. calcula bien el total de la compra', () => {
    // 2 x $49.990 + 1 x $39.990 = $139.970
    const total = contenedor.querySelector('.resumen__total');
    expect(total.textContent).toContain('$139.970');
    expect(screen.getByText('$99.980')).toBeTruthy(); // subtotal del primer producto
  });
});
