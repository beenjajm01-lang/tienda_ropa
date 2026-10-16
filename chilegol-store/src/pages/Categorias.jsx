// Categorías: tarjetas arriba y productos abajo.
// Al hacer clic en una categoría, el estado "seleccionada" cambia
// y la lista muestra solo los productos de esa categoría.

import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CabeceraPagina from '../components/CabeceraPagina';
import CategoriaTile from '../components/CategoriaTile';
import ProductList from '../components/ProductList';
import { useTienda } from '../context/TiendaContext';
import { useAgregarRapido } from '../context/CartContext';
import { filtrarPorCategoria } from '../services/productosService';

const TODAS = { id: 0, nombre: 'Todas', colores: ['#0b1f4b', '#d52b1e'] };

function Categorias() {
  const { productos, categorias } = useTienda();
  const agregarRapido = useAgregarRapido();
  const [parametros, setParametros] = useSearchParams();

  // Si se llega desde la portada con ?c=Colo-Colo, parte con esa categoría elegida
  const [seleccionada, setSeleccionada] = useState(parametros.get('c') ?? '');

  function seleccionar(nombre) {
    setSeleccionada(nombre);
    setParametros(nombre ? { c: nombre } : {}, { replace: true });
  }

  const productosFiltrados = filtrarPorCategoria(productos, seleccionada);
  const contar = (nombre) => productos.filter((p) => p.categoria === nombre).length;

  return (
    <>
      <CabeceraPagina titulo="Categorías" descripcion="Elige un equipo para ver solo sus camisetas." />

      <section className="seccion">
        <div className="container">
          <div className="row row-cols-2 row-cols-md-3 row-cols-xl-6 g-2 g-md-3 mb-5">
            <div className="col">
              <CategoriaTile
                categoria={TODAS}
                cantidad={productos.length}
                seleccionada={seleccionada === ''}
                onSeleccionar={() => seleccionar('')}
              />
            </div>
            {categorias.map((categoria) => (
              <div className="col" key={categoria.id}>
                <CategoriaTile
                  categoria={categoria}
                  cantidad={contar(categoria.nombre)}
                  seleccionada={seleccionada === categoria.nombre}
                  onSeleccionar={seleccionar}
                />
              </div>
            ))}
          </div>

          <h2 className="mb-4" aria-live="polite">
            {seleccionada ? `Camisetas de ${seleccionada}` : 'Todas las camisetas'}
            <span className="texto-secundario fs-6 fw-normal ms-2" style={{ fontFamily: 'var(--cg-fuente-texto)' }}>
              ({productosFiltrados.length})
            </span>
          </h2>

          <ProductList
            productos={productosFiltrados}
            onAgregar={agregarRapido}
            mensajeVacio="Esta categoría todavía no tiene camisetas."
          />
        </div>
      </section>
    </>
  );
}

export default Categorias;
