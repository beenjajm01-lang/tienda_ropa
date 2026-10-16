// Contexto de la tienda: productos, categorías y órdenes.
// Los componentes leen los datos desde aquí y, cuando algo cambia
// (por ejemplo, el admin edita un precio), React vuelve a dibujar la pantalla.

import { createContext, useContext, useState } from 'react';
import * as productosService from '../services/productosService';
import * as categoriasService from '../services/categoriasService';
import * as ordenesService from '../services/ordenesService';
import { reiniciarUsuarios } from '../services/usuariosService';

const TiendaContext = createContext(null);

// Las props "...Iniciales" sirven para las pruebas: permiten usar datos falsos (mocks)
export function TiendaProvider({ children, productosIniciales, categoriasIniciales, ordenesIniciales }) {
  const [productos, setProductos] = useState(() => productosIniciales ?? productosService.obtenerProductos());
  const [categorias, setCategorias] = useState(() => categoriasIniciales ?? categoriasService.obtenerCategorias());
  const [ordenes, setOrdenes] = useState(() => ordenesIniciales ?? ordenesService.obtenerOrdenes());

  // ---------- Productos (CRUD) ----------

  function agregarProducto(datos) {
    const nuevo = productosService.crearProducto(datos);
    setProductos(productosService.obtenerProductos());
    return nuevo;
  }

  function editarProducto(id, datos) {
    const editado = productosService.actualizarProducto(id, datos);
    setProductos(productosService.obtenerProductos());
    return editado;
  }

  function borrarProducto(id) {
    productosService.eliminarProducto(id);
    setProductos(productosService.obtenerProductos());
  }

  // ---------- Categorías ----------

  function existeCategoria(nombre, idIgnorado) {
    return categorias.some(
      (c) => c.nombre.trim().toLowerCase() === nombre.trim().toLowerCase() && c.id !== idIgnorado
    );
  }

  function agregarCategoria(datos) {
    if (!datos.nombre || datos.nombre.trim().length < 3) {
      return { ok: false, error: 'El nombre debe tener al menos 3 caracteres.' };
    }
    if (existeCategoria(datos.nombre)) {
      return { ok: false, error: `Ya existe la categoría "${datos.nombre.trim()}".` };
    }
    categoriasService.crearCategoria({ ...datos, nombre: datos.nombre.trim() });
    setCategorias(categoriasService.obtenerCategorias());
    return { ok: true };
  }

  function editarCategoria(id, datos) {
    const anterior = categorias.find((c) => c.id === id);
    if (!anterior) return { ok: false, error: 'La categoría no existe.' };
    if (!datos.nombre || datos.nombre.trim().length < 3) {
      return { ok: false, error: 'El nombre debe tener al menos 3 caracteres.' };
    }
    if (existeCategoria(datos.nombre, id)) {
      return { ok: false, error: `Ya existe la categoría "${datos.nombre.trim()}".` };
    }
    const nombreNuevo = datos.nombre.trim();
    categoriasService.actualizarCategoria(id, { ...datos, nombre: nombreNuevo });
    // Los productos de esa categoría también cambian de nombre de categoría
    if (anterior.nombre !== nombreNuevo) {
      productosService.reemplazarCategoria(anterior.nombre, nombreNuevo);
      setProductos(productosService.obtenerProductos());
    }
    setCategorias(categoriasService.obtenerCategorias());
    return { ok: true };
  }

  function borrarCategoria(id) {
    const categoria = categorias.find((c) => c.id === id);
    if (!categoria) return { ok: false, error: 'La categoría no existe.' };
    const cantidad = productos.filter((p) => p.categoria === categoria.nombre).length;
    if (cantidad > 0) {
      return {
        ok: false,
        error: `No se puede eliminar "${categoria.nombre}" porque tiene ${cantidad} producto(s). Muévelos a otra categoría primero.`,
      };
    }
    categoriasService.eliminarCategoria(id);
    setCategorias(categoriasService.obtenerCategorias());
    return { ok: true };
  }

  // ---------- Órdenes ----------

  function registrarOrden(datos) {
    const orden = ordenesService.crearOrden(datos);
    productosService.descontarStock(datos.items);
    setOrdenes(ordenesService.obtenerOrdenes());
    setProductos(productosService.obtenerProductos());
    return orden;
  }

  function cambiarEstadoOrden(id, estado) {
    ordenesService.actualizarEstadoOrden(id, estado);
    setOrdenes(ordenesService.obtenerOrdenes());
  }

  // Vuelve todos los datos a como estaban en los archivos de /data
  function restablecerDatos() {
    setProductos(productosService.reiniciarProductos());
    setCategorias(categoriasService.reiniciarCategorias());
    setOrdenes(ordenesService.reiniciarOrdenes());
    reiniciarUsuarios();
  }

  const valor = {
    productos,
    categorias,
    ordenes,
    obtenerProducto: (id) => productos.find((p) => p.id === Number(id)),
    agregarProducto,
    editarProducto,
    borrarProducto,
    agregarCategoria,
    editarCategoria,
    borrarCategoria,
    registrarOrden,
    cambiarEstadoOrden,
    restablecerDatos,
  };

  return <TiendaContext.Provider value={valor}>{children}</TiendaContext.Provider>;
}

export function useTienda() {
  const contexto = useContext(TiendaContext);
  if (!contexto) {
    throw new Error('useTienda debe usarse dentro de <TiendaProvider>');
  }
  return contexto;
}
