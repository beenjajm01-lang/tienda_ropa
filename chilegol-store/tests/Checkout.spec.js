// Prueba 10: si el pago falla, el checkout lleva a la página de compra fallida.
// El servicio de pago se reemplaza por un MOCK (un spy de Jasmine que responde "rechazado"),
// así la prueba no depende del tiempo de espera ni de la simulación real.

import { screen, fireEvent } from '@testing-library/react';
import { Route, Routes } from 'react-router-dom';
import Checkout from '../src/pages/Checkout';
import CompraFallida from '../src/pages/CompraFallida';
import { renderizar } from './helpers/renderizar';
import { crearCarritoMock, mockPagoRechazado } from './mocks/datos';

describe('Checkout', () => {
  it('10. muestra la página de compra fallida cuando hay error en el pago', async () => {
    localStorage.clear();
    const pagoMock = jasmine.createSpy('procesarPago').and.returnValue(Promise.resolve(mockPagoRechazado));

    renderizar(
      <Routes>
        <Route path="/checkout" element={<Checkout procesarPago={pagoMock} />} />
        <Route path="/compra-fallida" element={<CompraFallida />} />
      </Routes>,
      { ruta: '/checkout', carrito: crearCarritoMock() }
    );

    // Lleno el formulario como lo haría un cliente sin sesión
    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Ana' } });
    fireEvent.change(screen.getByLabelText('Apellidos'), { target: { value: 'Pérez Soto' } });
    fireEvent.change(screen.getByLabelText('Correo'), { target: { value: 'ana@correo.cl' } });
    fireEvent.change(screen.getByLabelText('Calle y número'), { target: { value: 'Av. Siempre Viva 742' } });
    fireEvent.change(screen.getByLabelText('Región'), { target: { value: 'Metropolitana de Santiago' } });
    fireEvent.change(screen.getByLabelText('Comuna'), { target: { value: 'Santiago' } });

    fireEvent.click(screen.getByRole('button', { name: /Pagar/ }));

    // findByText espera a que aparezca (el pago es una promesa)
    expect(await screen.findByText('No se pudo completar la compra')).toBeTruthy();
    expect(screen.getByText(mockPagoRechazado.motivo)).toBeTruthy();
    expect(pagoMock).toHaveBeenCalledTimes(1);
    // El mock recibió el total correcto del carrito
    expect(pagoMock.calls.mostRecent().args[0].total).toBe(145980);
  });
});
