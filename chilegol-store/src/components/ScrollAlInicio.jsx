// Cuando se cambia de página, vuelve arriba del todo.

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollAlInicio() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollAlInicio;
