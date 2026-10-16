// Prueba 7: el login muestra un error cuando el correo no tiene formato válido.

import { screen, fireEvent } from '@testing-library/react';
import Login from '../src/pages/Login';
import { renderizar } from './helpers/renderizar';

describe('Login', () => {
  it('7. muestra error si el correo no es válido', () => {
    renderizar(<Login />, { ruta: '/login' });

    fireEvent.change(screen.getByLabelText('Correo'), { target: { value: 'correo-sin-arroba' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '123456' } });
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }));

    expect(screen.getByText('Ingresa un correo válido, por ejemplo nombre@correo.cl')).toBeTruthy();
    // La contraseña sí cumple (6 caracteres), así que su error no aparece
    expect(screen.queryByText('La contraseña debe tener al menos 6 caracteres')).toBeNull();
  });
});
