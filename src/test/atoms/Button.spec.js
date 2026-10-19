// Prueba 1: el átomo Button ejecuta su función al hacer clic, y no la ejecuta si está deshabilitado.

import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../../components/atoms/Button';

describe('Button (átomo)', () => {
  it('1. ejecuta onClick al hacer clic y no lo ejecuta si está deshabilitado', () => {
    // Un "spy" de Jasmine es una función falsa que recuerda cuántas veces la llamaron
    const alHacerClic = jasmine.createSpy('alHacerClic');

    const { rerender } = render(<Button onClick={alHacerClic}>Comprar</Button>);
    const boton = screen.getByRole('button', { name: 'Comprar' });
    expect(boton.className).toContain('boton--principal');

    fireEvent.click(boton);
    expect(alHacerClic).toHaveBeenCalledTimes(1);

    rerender(<Button onClick={alHacerClic} disabled>Comprar</Button>);
    fireEvent.click(screen.getByRole('button', { name: 'Comprar' }));
    expect(alHacerClic).toHaveBeenCalledTimes(1);
  });
});
