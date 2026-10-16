// Prueba 8: el formulario de contacto actualiza su estado cuando el usuario escribe.

import { render, screen, fireEvent } from '@testing-library/react';
import Contacto from '../src/pages/Contacto';

describe('Formulario de contacto', () => {
  it('8. actualiza el estado cuando el usuario escribe', () => {
    render(<Contacto />);

    const mensaje = screen.getByLabelText('Mensaje');
    const contador = screen.getByTestId('contador-mensaje');
    expect(contador.textContent).toBe('0/500');

    fireEvent.change(mensaje, { target: { value: 'Hola ChileGol' } });

    // El valor del textarea viene del estado y el contador se recalcula con cada letra
    expect(mensaje.value).toBe('Hola ChileGol');
    expect(contador.textContent).toBe('13/500');

    fireEvent.change(screen.getByLabelText('Nombre'), { target: { value: 'Ana' } });
    expect(screen.getByLabelText('Nombre').value).toBe('Ana');
  });
});
