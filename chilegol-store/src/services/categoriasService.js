// CRUD de categorías (mismo estilo que productosService)

import categoriasIniciales from '../data/categorias';
import { leerDatos, guardarDatos } from './storage';

const CLAVE = 'chilegol_categorias';

let categorias = leerDatos(CLAVE, categoriasIniciales);

function guardar() {
  guardarDatos(CLAVE, categorias);
}

export function obtenerCategorias() {
  return [...categorias];
}

export function obtenerCategoriaPorId(id) {
  return categorias.find((c) => c.id === Number(id));
}

export function crearCategoria(datos) {
  const id = categorias.length > 0 ? Math.max(...categorias.map((c) => c.id)) + 1 : 1;
  const categoria = {
    colores: ['#0b1f4b', '#d52b1e'],
    descripcion: '',
    ...datos,
    id,
  };
  categorias = [...categorias, categoria];
  guardar();
  return categoria;
}

export function actualizarCategoria(id, datos) {
  categorias = categorias.map((c) => (c.id === Number(id) ? { ...c, ...datos, id: c.id } : c));
  guardar();
  return obtenerCategoriaPorId(id);
}

export function eliminarCategoria(id) {
  categorias = categorias.filter((c) => c.id !== Number(id));
  guardar();
  return obtenerCategorias();
}

export function reiniciarCategorias() {
  categorias = JSON.parse(JSON.stringify(categoriasIniciales));
  guardar();
  return obtenerCategorias();
}
