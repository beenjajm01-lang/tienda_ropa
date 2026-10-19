// Prueba 10: desde el panel, el formulario crea un producto y lo guarda en localStorage (CRUD).
// Se usa un mock de la sesión (administrador) y del localStorage (3 productos de prueba).

import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import AdminLayout from '../../components/templates/AdminLayout';
import AdminProducts from '../../pages/AdminProducts';
import { mockProductos, mockSesionAdmin } from '../mocks/datos';

describe('AdminProducts (panel)', () => {
  it('10. crea un producto con el formulario y lo guarda en localStorage', async () => {
    localStorage.setItem('cgs_productos', JSON.stringify(mockProductos));
    const onProductosCambiados = jasmine.createSpy('onProductosCambiados');

    render(
      <MemoryRouter initialEntries={['/admin/productos?nuevo']}>
        <Routes>
          <Route
            path="/admin"
            element={<AdminLayout usuario={mockSesionAdmin} onLogout={() => {}} onProductosCambiados={onProductosCambiados} />}
          >
            <Route path="productos" element={<AdminProducts />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    const formulario = screen.getByRole('form', { name: 'Nuevo producto' });
    const llenar = (etiqueta, valor) => fireEvent.change(within(formulario).getByLabelText(etiqueta), { target: { value: valor } });

    llenar('Código del producto', 'mock-04');
    llenar('Nombre', 'Polerón Mock');
    llenar('Precio', '29990');
    llenar('Categoría', 'Abrigo');
    llenar('Stock', '7');
    fireEvent.click(within(formulario).getByRole('button', { name: 'Guardar producto' }));

    expect(await screen.findByText('Producto creado: Polerón Mock.')).toBeTruthy();

    // Aparece en la tabla con el código en mayúsculas
    const fila = screen.getByRole('cell', { name: 'MOCK-04' }).closest('tr');
    expect(fila.textContent).toContain('Polerón Mock');
    expect(fila.textContent).toContain('$29.990');

    // Quedó guardado en localStorage con el id siguiente y los números como números
    const guardados = JSON.parse(localStorage.getItem('cgs_productos'));
    expect(guardados.length).toBe(4);
    expect(guardados[3]).toEqual(jasmine.objectContaining({ id: 4, codigo: 'MOCK-04', precio: 29990, stock: 7, categoria: 'Abrigo' }));

    // La tienda recibe el aviso para mostrar el producto nuevo
    expect(onProductosCambiados).toHaveBeenCalled();
  });
});
