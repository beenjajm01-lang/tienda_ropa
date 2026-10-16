// Punto de entrada de la aplicación.
// Aquí cargo Bootstrap, los íconos y mis estilos, y "monto" el componente App
// dentro del <div id="root"> que está en index.html.
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// Tipografías instaladas con npm (funcionan sin internet)
import '@fontsource/big-shoulders-display/latin-700';
import '@fontsource/big-shoulders-display/latin-800';
import '@fontsource/big-shoulders-display/latin-900';
import '@fontsource/figtree/latin-400';
import '@fontsource/figtree/latin-500';
import '@fontsource/figtree/latin-600';
import '@fontsource/figtree/latin-700';
import './styles/styles.css';

import App from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter permite cambiar de página sin recargar el navegador */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
