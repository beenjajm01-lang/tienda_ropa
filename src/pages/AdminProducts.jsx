// Gestión de productos: Administrador ve/crea/edita/elimina; Vendedor solo ve.
// El formulario se abre con ?nuevo o ?editar=ID en la URL.

import { useState } from 'react';
import { Link, useOutletContext, useSearchParams } from 'react-router-dom';
import Button from '../components/atoms/Button';
import ProductForm from '../components/organisms/ProductForm';
import {
  getProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  existeCodigo,
  estaEnStockCritico,
} from '../data/products';
import { formatearPrecio } from '../utils/formato';

function EtiquetaEstado({ producto }) {
  if (producto.stock === 0) return <span className="etiqueta etiqueta--alerta">Agotado</span>;
  if (estaEnStockCritico(producto)) return <span className="etiqueta etiqueta--aviso">Stock crítico</span>;
  return <span className="etiqueta etiqueta--ok">Disponible</span>;
}

export default function AdminProducts() {
  const { permisos, onProductosCambiados } = useOutletContext();
  const puedeEditar = permisos.productos === 'crud';

  const [productos, setProductos] = useState(getProductos);
  const [parametros, setParametros] = useSearchParams();
  const [porEliminar, setPorEliminar] = useState(null);
  const [aviso, setAviso] = useState('');

  const idEditar = parametros.get('editar');
  const enEdicion = idEditar ? productos.find((p) => p.id === Number(idEditar)) : null;
  const formularioAbierto = puedeEditar && (parametros.has('nuevo') || Boolean(enEdicion));

  // Tras cada cambio: refresco la tabla y aviso a la tienda
  function refrescar(mensaje) {
    setProductos(getProductos());
    setAviso(mensaje);
    if (onProductosCambiados) onProductosCambiados();
  }

  function abrirNuevo() {
    setAviso('');
    setParametros({ nuevo: '' });
  }

  function abrirEdicion(id) {
    setAviso('');
    setParametros({ editar: String(id) });
  }

  function cerrarFormulario() {
    setParametros({});
  }

  function guardar(datos) {
    if (existeCodigo(datos.codigo, enEdicion?.id ?? null)) {
      return { ok: false, campo: 'codigo', error: `Ya existe otro producto con el código ${datos.codigo.trim().toUpperCase()}.` };
    }

    const guardado = enEdicion ? actualizarProducto(enEdicion.id, datos) : crearProducto(datos);
    let mensaje = enEdicion ? `Producto actualizado: ${guardado.nombre}.` : `Producto creado: ${guardado.nombre}.`;
    if (estaEnStockCritico(guardado)) {
      mensaje += ' Atención: el stock quedó en o bajo el umbral crítico.';
    }
    cerrarFormulario();
    refrescar(mensaje);
    return { ok: true };
  }

  function confirmarEliminar(producto) {
    eliminarProducto(producto.id);
    setPorEliminar(null);
    refrescar(`Producto eliminado: ${producto.nombre}.`);
  }

  return (
    <>
      <div className="trabajo__cabecera">
        <h1>Productos</h1>
        {puedeEditar && !formularioAbierto && (
          <Button variant="principal" onClick={abrirNuevo}>Nuevo producto</Button>
        )}
      </div>

      {!puedeEditar && (
        <p className="aviso aviso--precaucion mb-4">Tu perfil puede ver el catálogo, pero no modificarlo.</p>
      )}

      {aviso && <p className="aviso mb-4" role="status">{aviso}</p>}

      {formularioAbierto && (
        <ProductForm
          key={enEdicion?.id ?? 'nuevo'}
          producto={enEdicion}
          onGuardar={guardar}
          onCancelar={cerrarFormulario}
        />
      )}

      <div className="tabla-envoltorio">
        <table className="tabla">
          <caption>Listado de productos del catálogo ({productos.length})</caption>
          <thead>
            <tr>
              <th scope="col"><span className="solo-lectores">Imagen</span></th>
              <th scope="col">Código</th>
              <th scope="col">Nombre</th>
              <th scope="col">Categoría</th>
              <th scope="col">Precio</th>
              <th scope="col">Stock</th>
              <th scope="col">Estado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((p) => (
              <tr key={p.id}>
                <td><img className="tabla__miniatura" src={p.imagen} alt="" /></td>
                <td>{p.codigo}</td>
                <td>{p.nombre}</td>
                <td>{p.categoria}</td>
                <td>{formatearPrecio(p.precio)}</td>
                <td>{p.stock}</td>
                <td><EtiquetaEstado producto={p} /></td>
                <td>
                  {porEliminar === p.id ? (
                    <div className="tabla__confirmar">
                      <span>¿Eliminar {p.nombre}?</span>
                      <Button variant="peligro" className="boton--pequeno" onClick={() => confirmarEliminar(p)}>Sí, eliminar</Button>
                      <Button variant="secundario" className="boton--pequeno" onClick={() => setPorEliminar(null)}>No</Button>
                    </div>
                  ) : (
                    <div className="tabla__acciones">
                      <Link className="boton boton--secundario boton--pequeno" to={`/products/${p.id}`}>Ver</Link>
                      {puedeEditar && (
                        <>
                          <Button variant="secundario" className="boton--pequeno" onClick={() => abrirEdicion(p.id)}>
                            Editar<span className="solo-lectores"> {p.nombre}</span>
                          </Button>
                          <Button variant="peligro" className="boton--pequeno" onClick={() => setPorEliminar(p.id)}>
                            Eliminar<span className="solo-lectores"> {p.nombre}</span>
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {productos.length === 0 && <p className="aviso su-20">No hay productos. Crea el primero con "Nuevo producto".</p>}
    </>
  );
}
