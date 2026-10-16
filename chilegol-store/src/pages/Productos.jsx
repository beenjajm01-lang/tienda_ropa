// Catálogo con buscador, filtro por categoría y orden.
// Lo que el usuario escribe en el buscador se guarda en el estado "busqueda"
// y la lista se vuelve a dibujar con cada letra.

import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CabeceraPagina from '../components/CabeceraPagina';
import ProductList from '../components/ProductList';
import { useTienda } from '../context/TiendaContext';
import { useAgregarRapido } from '../context/CartContext';
import { buscarPorNombre, filtrarPorCategoria } from '../services/productosService';
import { precioFinal } from '../utils/precios';

function ordenar(lista, orden) {
  const copia = [...lista];
  if (orden === 'precio-asc') return copia.sort((a, b) => precioFinal(a) - precioFinal(b));
  if (orden === 'precio-desc') return copia.sort((a, b) => precioFinal(b) - precioFinal(a));
  if (orden === 'nombre') return copia.sort((a, b) => a.nombre.localeCompare(b.nombre, 'es'));
  return copia;
}

function Productos() {
  const { productos, categorias } = useTienda();
  const agregarRapido = useAgregarRapido();
  const [parametros] = useSearchParams();

  const [busqueda, setBusqueda] = useState(parametros.get('buscar') ?? '');
  const [categoria, setCategoria] = useState('');
  const [orden, setOrden] = useState('relevancia');

  // Primero filtro por categoría, después por nombre y al final ordeno
  const resultado = ordenar(buscarPorNombre(filtrarPorCategoria(productos, categoria), busqueda), orden);

  return (
    <>
      <CabeceraPagina
        titulo="Productos"
        descripcion={`${productos.length} camisetas de clubes chilenos y de la Selección.`}
      />

      <section className="seccion">
        <div className="container">
          <form className="row g-3 mb-4" role="search" onSubmit={(e) => e.preventDefault()}>
            <div className="col-12 col-md-6">
              <label htmlFor="buscar" className="form-label">Buscar camiseta</label>
              <div className="input-group">
                <span className="input-group-text bg-white"><i className="bi bi-search" aria-hidden="true" /></span>
                <input
                  id="buscar"
                  type="search"
                  className="form-control"
                  placeholder="Ej: Colo-Colo, retro, visita"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </div>
            <div className="col-6 col-md-3">
              <label htmlFor="filtro-categoria" className="form-label">Categoría</label>
              <select
                id="filtro-categoria"
                className="form-select"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              >
                <option value="">Todas</option>
                {categorias.map((c) => (
                  <option key={c.id} value={c.nombre}>{c.nombre}</option>
                ))}
              </select>
            </div>
            <div className="col-6 col-md-3">
              <label htmlFor="orden" className="form-label">Ordenar por</label>
              <select id="orden" className="form-select" value={orden} onChange={(e) => setOrden(e.target.value)}>
                <option value="relevancia">Recomendados</option>
                <option value="precio-asc">Menor precio</option>
                <option value="precio-desc">Mayor precio</option>
                <option value="nombre">Nombre (A-Z)</option>
              </select>
            </div>
          </form>

          <p className="texto-secundario" aria-live="polite">
            {resultado.length === 1 ? '1 resultado' : `${resultado.length} resultados`}
          </p>

          <ProductList
            productos={resultado}
            onAgregar={agregarRapido}
            mensajeVacio="No encontramos camisetas con esa búsqueda. Prueba con el nombre del club."
          />
        </div>
      </section>
    </>
  );
}

export default Productos;
