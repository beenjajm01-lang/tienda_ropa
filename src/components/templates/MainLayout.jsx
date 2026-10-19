// Plantilla de la tienda: barra superior + la página que corresponda (Outlet).

import { Outlet } from 'react-router-dom';
import { NavbarHeader } from '../organisms/NavbarHeader';

export default function MainLayout({ totalItems, usuario, onLogout }) {
  return (
    <>
      <NavbarHeader totalItems={totalItems} usuario={usuario} onLogout={onLogout} />
      <Outlet />
    </>
  );
}
