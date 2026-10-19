// Prueba 8: el login (react-hook-form) muestra error si el correo no es válido.

import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../pages/Login';

describe('Login', () => {
  it('8. muestra error si el correo no es válido y no inicia sesión', async () => {
    const onLogin = jasmine.createSpy('onLogin');
    render(
      <MemoryRouter>
        <Login onLogin={onLogin} />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Correo'), { target: { value: 'hincha@hotmail.com' } });
    fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: '1234' } });
    fireEvent.click(screen.getByRole('button', { name: 'Iniciar sesión' }));

    // react-hook-form valida de forma asíncrona: findByText espera a que aparezca el error
    const error = await screen.findByText('Usa un correo terminado en @duoc.cl, @profesor.duoc.cl y @gmail.com.');
    expect(error).toBeTruthy();
    expect(screen.getByLabelText('Correo').getAttribute('aria-invalid')).toBe('true');
    expect(onLogin).not.toHaveBeenCalled();
  });
});
