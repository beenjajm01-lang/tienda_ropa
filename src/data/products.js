// Datos de productos y su CRUD en localStorage.
import { leer, guardar, siguienteId } from './storage';

const CLAVE_PRODUCTOS = "cgs_productos";

export const categorias = ["Camisetas", "Shorts", "Abrigo", "Accesorios"];

// Función para resolver rutas estáticas en Vite tanto en local como en GitHub Pages
export function resolverImagen(nombreArchivo) {
  if (!nombreArchivo) return new URL('../../public/images/sin-imagen.svg', import.meta.url).href;
  // Si trae el prefijo 'images/', se lo quitamos para buscarlo directo en public/images/
  const limpio = nombreArchivo.replace(/^images\//, '').replace(/^\//, '');
  try {
    return new URL(`../../public/images/${limpio}`, import.meta.url).href;
  } catch (e) {
    return new URL('../../public/images/sin-imagen.svg', import.meta.url).href;
  }
}

export const imagenesDisponibles = [
  "goku-colocolo.webp",
  "goku-udechile.webp",
  "goku-ucatolica.webp",
  "goku-cobreloa.webp",
  "krilin-wanderers.webp",
  "vegeta-uespañola.webp",
  "piccolo-palestino.webp",
  "tenshinhan-ohiggins.webp",
  "camiseta-colo-colo.webp",
  "camiseta-universidad-de-chile.webp",
  "camiseta-universidad-catolica.webp",
  "camiseta-cobreloa.webp",
];

export const IMAGEN_POR_DEFECTO = "sin-imagen.svg";

export const productosIniciales = [
  {
    id: 1,
    codigo: "CAM-CC-01",
    nombre: "Camiseta Colo-Colo 2026",
    equipo: "Colo-Colo",
    descripcion: "Camiseta oficial para hacer cagar a Freezer en Namekusei. Confeccionada con fibra saiyajin ultraliviana para meter el Genkidama al ángulo en el minuto 90.",
    precio: 49990,
    stock: 24,
    stockCritico: 5,
    categoria: "Camisetas",
    imagen: "goku-colocolo.webp"
  },
  {
    id: 2,
    codigo: "CAM-UDECH-02",
    nombre: "Camiseta U. de Chile 2026",
    equipo: "Universidad de Chile",
    descripcion: "Polera de tela aerodinámica para recorrer la cancha en la Nube Voladora. Si te la pones, aumenta tu ki de inmediato y no te cansarás ni en prórroga.",
    precio: 49990,
    stock: 15,
    stockCritico: 5,
    categoria: "Camisetas",
    imagen: "goku-udechile.webp"
  },
  {
    id: 3,
    codigo: "CAM-UC-03",
    nombre: "Camiseta U. Católica 2026",
    equipo: "Universidad Católica",
    descripcion: "La franja azul clásica bendecida por Karin en la torre sagrada. Ideal para clavar tiros libres con la fuerza de un Kamehameha cargado.",
    precio: 47990,
    stock: 18,
    stockCritico: 4,
    categoria: "Camisetas",
    imagen: "goku-ucatolica.webp"
  },
  {
    id: 4,
    codigo: "CAM-COB-04",
    nombre: "Camiseta Cobreloa 2026",
    equipo: "Cobreloa",
    descripcion: "Naranja clásico traído directamente del Templo de Kamisama. Diseñada para aguantar la altura de Calama y el calor del planeta Kaiosama sin sudar.",
    precio: 42990,
    stock: 10,
    stockCritico: 3,
    categoria: "Camisetas",
    imagen: "goku-cobreloa.webp"
  },
  {
    id: 5,
    codigo: "CAM-SW-05",
    nombre: "Camiseta Wanderers 2026",
    equipo: "Santiago Wanderers",
    descripcion: "El uniforme aprobado por Krilin para esquivar patadas descalificadoras. Corta el viento de los cerros de Valparaíso como si fuera un Kienzan.",
    precio: 39990,
    stock: 12,
    stockCritico: 4,
    categoria: "Camisetas",
    imagen: "krilin-wanderers.webp"
  },
  {
    id: 6,
    codigo: "CAM-UE-06",
    nombre: "Camiseta Unión Española 2026",
    equipo: "Unión Española",
    descripcion: "El orgullo del Príncipe de los Saiyajin hecho tela. Advertencia: ponértela aumentará tus ganas de gritarle insecto al árbitro tras cada cobro dudoso.",
    precio: 39990,
    stock: 8,
    stockCritico: 2,
    categoria: "Camisetas",
    imagen: "vegeta-uespañola.webp"
  },
  {
    id: 7,
    codigo: "CAM-PAL-07",
    nombre: "Camiseta Palestino 2026",
    equipo: "Palestino",
    descripcion: "Pesa más que la capa de entrenamiento de Piccolo, pero al quitártela juegas a la velocidad de la luz. Estilo de sobra para meter goles con el Makankosappo.",
    precio: 41990,
    stock: 14,
    stockCritico: 3,
    categoria: "Camisetas",
    imagen: "piccolo-palestino.webp"
  },
  {
    id: 8,
    codigo: "CAM-OHI-08",
    nombre: "Camiseta O'Higgins 2026",
    equipo: "O'Higgins",
    descripcion: "La celeste rancagüina para tener visión de tres ojos en la mitad de la cancha. Garantiza tapar todos los contragolpes como si usaras un Kikoho defensivo.",
    precio: 38990,
    stock: 9,
    stockCritico: 3,
    categoria: "Camisetas",
    imagen: "tenshinhan-ohiggins.webp"
  }
];

export function getProductos() {
  const guardados = leer(CLAVE_PRODUCTOS, null);
  if (!Array.isArray(guardados)) {
    guardar(CLAVE_PRODUCTOS, productosIniciales);
    return [...productosIniciales];
  }
  return guardados;
}

export function getProductoPorId(id) {
  return getProductos().find((p) => String(p.id) === String(id)) || null;
}

export function estaEnStockCritico(producto) {
  return producto.stockCritico !== "" && producto.stockCritico != null && producto.stock <= producto.stockCritico;
}

export function getProductosCriticos() {
  return getProductos().filter(estaEnStockCritico);
}

export function existeCodigo(codigo, idIgnorado = null) {
  const buscado = String(codigo).trim().toUpperCase();
  return getProductos().some((p) => p.codigo.toUpperCase() === buscado && p.id !== idIgnorado);
}

export function saveProductos(lista) {
  guardar(CLAVE_PRODUCTOS, lista);
}

function normalizar(datos) {
  const critico = String(datos.stockCritico ?? "").trim();
  const imagen = String(datos.imagen ?? "").trim();
  return {
    codigo: String(datos.codigo).trim().toUpperCase(),
    nombre: String(datos.nombre).trim(),
    equipo: String(datos.equipo ?? "").trim(),
    descripcion: String(datos.descripcion ?? "").trim(),
    precio: Number(datos.precio),
    stock: parseInt(datos.stock, 10),
    stockCritico: critico === "" ? "" : parseInt(critico, 10),
    categoria: datos.categoria,
    imagen: imagen === "" ? IMAGEN_POR_DEFECTO : imagen,
  };
}

export function crearProducto(datos) {
  const lista = getProductos();
  const nuevo = { id: siguienteId(lista), ...normalizar(datos) };
  saveProductos([...lista, nuevo]);
  return nuevo;
}

export function actualizarProducto(id, datos) {
  const lista = getProductos();
  const numero = Number(id);
  const existente = lista.find((p) => p.id === numero);
  if (!existente) {
    return null;
  }
  const actualizado = { ...existente, ...normalizar({ ...existente, ...datos }), id: numero };
  saveProductos(lista.map((p) => (p.id === numero ? actualizado : p)));
  return actualizado;
}

export function eliminarProducto(id) {
  const quedan = getProductos().filter((p) => String(p.id) !== String(id));
  saveProductos(quedan);
  return quedan;
}

export function restablecerProductos() {
  saveProductos(productosIniciales);
  return [...productosIniciales];
}

export default getProductos();

