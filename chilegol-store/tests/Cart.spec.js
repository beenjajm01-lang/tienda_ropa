// Pruebas 4, 5 y 6: el carrito aumenta cantidades, elimina productos y calcula el total.

import { screen, fireEvent } from '@testing-library/react';
import Carrito from '../src/pages/Carrito';
import { renderizar } from './helpers/renderizar';
import { crearCarritoMock } from './mocks/datos';

describe('Cart (carrito de compras)', () => {
  beforeEach(() => {
    // El carrito se guarda en localStorage: lo limpio para que cada prueba parta igual
    localStorage.clear();
    renderizar(<Carrito />, { ruta: '/carrito', carrito: crearCarritoMock() });
  });

  it('4. aumenta la cantidad de un producto', () => {
    expect(screen.getByTestId('cantidad-1-M').textContent).toBe('1');

    fireEvent.click(screen.getByRole('button', { name: 'Aumentar cantidad de Camiseta Mock Oferta' }));

    expect(screen.getByTestId('cantidad-1-M').textContent).toBe('2');
  });

  it('5. elimina un producto del carrito', () => {
    expect(screen.getByText('Camiseta Mock Local')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Eliminar Camiseta Mock Local del carrito' }));

    expect(screen.queryByText('Camiseta Mock Local')).toBeNull();
    expect(screen.getByText('Camiseta Mock Oferta')).toBeTruthy();
  });

  it('6. calcula bien el total de la compra (usa el precio de oferta)', () => {
    // 1 x $40.000 (oferta) + 2 x $52.990 = $145.980
    expect(screen.getByTestId('total-carrito').textContent).toBe('$145.980');
  });
});
