// Productos en oferta (los que tienen enOferta: true).
// Se ordenan del mayor al menor descuento.

import CabeceraPagina from '../components/CabeceraPagina';
import ProductList from '../components/ProductList';
import { useTienda } from '../context/TiendaContext';
import { useAgregarRapido } from '../context/CartContext';
import { filtrarOfertas } from '../services/productosService';
import { porcentajeDescuento } from '../utils/precios';

function Ofertas() {
  const { productos } = useTienda();
  const agregarRapido = useAgregarRapido();

  // Así filtro las ofertas: productos.filter(producto => producto.enOferta)
  const ofertas = filtrarOfertas(productos).sort((a, b) => porcentajeDescuento(b) - porcentajeDescuento(a));

  return (
    <>
      <CabeceraPagina
        titulo="Ofertas"
        descripcion="Camisetas con precio rebajado mientras dure el stock. El precio tachado es el precio normal."
      />
      <section className="seccion">
        <div className="container">
          <ProductList
            productos={ofertas}
            onAgregar={agregarRapido}
            mensajeVacio="Ahora no hay camisetas en oferta. Vuelve pronto o revisa el catálogo completo."
          />
        </div>
      </section>
    </>
  );
}

export default Ofertas;
