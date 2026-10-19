import { useState } from 'react';
import ProductCard from '../components/molecules/ProductCard';

export default function Categories({ productos, onAgregar }) {
  const [catSel, setCatSel] = useState('Todas');
  const categorias = ['Todas', ...new Set(productos.map((p) => p.categoria || 'Camisetas'))];

  const filtrados = catSel === 'Todas'
    ? productos
    : productos.filter((p) => (p.categoria || 'Camisetas') === catSel);

  return (
    <main className="seccion">
      <div className="contenedor">
        <h1 className="seccion__titulo">Categorías</h1>
        <p className="seccion__bajada">Filtra nuestros productos según tu preferencia.</p>

        <div className="d-flex gap-2 mb-4 flex-wrap">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`boton ${catSel === cat ? 'boton--principal' : 'boton--secundario'} boton--pequeno`}
              onClick={() => setCatSel(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="calugas">
          {filtrados.map((prod) => (
            <ProductCard key={prod.id} product={prod} onAgregar={onAgregar} />
          ))}
        </div>
      </div>
    </main>
  );
}

