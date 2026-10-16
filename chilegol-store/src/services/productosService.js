// Este archivo tiene las funciones para crear, leer, editar y borrar productos.
// Se llama CRUD: Create, Read, Update, Delete.
// Funciona como una "API falsa": los componentes no tocan los datos directamente,
// siempre pasan por estas funciones.

import productosIniciales from '../data/productos';
import { leerDatos, guardarDatos } from './storage';

const CLAVE = 'chilegol_productos';

// Lista de productos con la que trabaja la tienda
let productos = leerDatos(CLAVE, productosIniciales);

function guardar() {
  guardarDatos(CLAVE, productos);
}

// ---------- Read (leer) ----------

// Obtener todos los productos
export function obtenerProductos() {
  return [...productos];
}

// Buscar un producto por su id
export function obtenerProductoPorId(id) {
  return productos.find((producto) => producto.id === Number(id));
}

// ---------- Create (crear) ----------

// Agregar un producto nuevo. El id se calcula como el mayor id + 1
export function crearProducto(nuevoProducto) {
  const id = productos.length > 0 ? Math.max(...productos.map((p) => p.id)) + 1 : 1;
  const producto = { ...nuevoProducto, id };
  productos = [...productos, producto];
  guardar();
  return producto;
}

// ---------- Update (actualizar) ----------

// Modificar un producto existente
export function actualizarProducto(id, datosActualizados) {
  productos = productos.map((p) =>
    p.id === Number(id) ? { ...p, ...datosActualizados, id: p.id } : p
  );
  guardar();
  return obtenerProductoPorId(id);
}

// Descontar stock después de una compra
export function descontarStock(items) {
  productos = productos.map((p) => {
    const unidades = items
      .filter((item) => item.id === p.id || item.productoId === p.id)
      .reduce((suma, item) => suma + item.cantidad, 0);
    return unidades > 0 ? { ...p, stock: Math.max(p.stock - unidades, 0) } : p;
  });
  guardar();
}

// Cuando se renombra una categoría, sus productos también cambian de categoría
export function reemplazarCategoria(nombreAnterior, nombreNuevo) {
  productos = productos.map((p) =>
    p.categoria === nombreAnterior ? { ...p, categoria: nombreNuevo } : p
  );
  guardar();
}

// ---------- Delete (eliminar) ----------

// Borrar un producto
export function eliminarProducto(id) {
  productos = productos.filter((p) => p.id !== Number(id));
  guardar();
  return obtenerProductos();
}

// Volver a los productos del archivo original
export function reiniciarProductos() {
  productos = JSON.parse(JSON.stringify(productosIniciales));
  guardar();
  return obtenerProductos();
}

// ---------- Filtros ----------
// Estas funciones reciben una lista y devuelven otra lista filtrada.
// No cambian nada, por eso se pueden usar con cualquier lista (también con mocks en las pruebas).

export function filtrarPorCategoria(lista, categoria) {
  if (!categoria) return lista;
  return lista.filter((p) => p.categoria === categoria);
}

export function filtrarOfertas(lista) {
  return lista.filter((p) => p.enOferta);
}

export function buscarPorNombre(lista, texto) {
  const busqueda = texto.trim().toLowerCase();
  if (!busqueda) return lista;
  return lista.filter((p) => p.nombre.toLowerCase().includes(busqueda));
}

// Versiones que usan directamente la lista de la tienda
export function obtenerPorCategoria(categoria) {
  return filtrarPorCategoria(productos, categoria);
}

export function obtenerOfertas() {
  return filtrarOfertas(productos);
}

export function buscarProductos(texto) {
  return buscarPorNombre(productos, texto);
}
