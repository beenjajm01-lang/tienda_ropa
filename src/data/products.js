const CLAVE_PRODUCTOS = "cgs_productos";

export const productosIniciales = [
  {
    id: 1,
    codigo: "CAM-CC-01",
    nombre: "Camiseta Colo-Colo 2026",
    descripcion: "Camiseta oficial para hacer cagar a Freezer en Namekusei. Confeccionada con fibra saiyajin ultraliviana para meter el Genkidama al ángulo en el minuto 90.",
    precio: 49990,
    stock: 24,
    stockCritico: 5,
    categoria: "Camisetas",
    imagen: "/images/goku-colocolo.webp"
  },
  {
    id: 2,
    codigo: "CAM-UDECH-02",
    nombre: "Camiseta U. de Chile 2026",
    descripcion: "Polera de tela aerodinámica para recorrer la cancha en la Nube Voladora. Si te la pones, aumenta tu ki de inmediato y no te cansarás ni en prórroga.",
    precio: 49990,
    stock: 15,
    stockCritico: 5,
    categoria: "Camisetas",
    imagen: "/images/goku-udechile.webp"
  },
  {
    id: 3,
    codigo: "CAM-UC-03",
    nombre: "Camiseta U. Católica 2026",
    descripcion: "La franja azul clásica bendecida por Karin en la torre sagrada. Ideal para clavar tiros libres con la fuerza de un Kamehameha cargado.",
    precio: 47990,
    stock: 18,
    stockCritico: 4,
    categoria: "Camisetas",
    imagen: "/images/goku-ucatolica.webp"
  },
  {
    id: 4,
    codigo: "CAM-COB-04",
    nombre: "Camiseta Cobreloa 2026",
    descripcion: "Naranja clásico traído directamente del Templo de Kamisama. Diseñada para aguantar la altura de Calama y el calor del planeta Kaiosama sin sudar.",
    precio: 42990,
    stock: 10,
    stockCritico: 3,
    categoria: "Camisetas",
    imagen: "/images/goku-cobreloa.webp"
  },
  {
    id: 5,
    codigo: "CAM-SW-05",
    nombre: "Camiseta Wanderers 2026",
    descripcion: "El uniforme aprobado por Krilin para esquivar patadas descalificadoras. Corta el viento de los cerros de Valparaíso como si fuera un Kienzan.",
    precio: 39990,
    stock: 12,
    stockCritico: 4,
    categoria: "Camisetas",
    imagen: "/images/krilin-wanderers.webp"
  },
  {
    id: 6,
    codigo: "CAM-UE-06",
    nombre: "Camiseta Unión Española 2026",
    descripcion: "El orgullo del Príncipe de los Saiyajin hecho tela. Advertencia: ponértela aumentará tus ganas de gritarle insecto al árbitro tras cada cobro dudoso.",
    precio: 39990,
    stock: 8,
    stockCritico: 2,
    categoria: "Camisetas",
    imagen: "/images/vegeta-uespañola.webp"
  },
  {
    id: 7,
    codigo: "CAM-PAL-07",
    nombre: "Camiseta Palestino 2026",
    descripcion: "Pesa más que la capa de entrenamiento de Piccolo, pero al quitártela juegas a la velocidad de la luz. Estilo de sobra para meter goles con el Makankosappo.",
    precio: 41990,
    stock: 14,
    stockCritico: 3,
    categoria: "Camisetas",
    imagen: "/images/piccolo-palestino.webp"
  },
  {
    id: 8,
    codigo: "CAM-OHI-08",
    nombre: "Camiseta O'Higgins 2026",
    descripcion: "La celeste rancagüina para tener visión de tres ojos en la mitad de la cancha. Garantiza tapar todos los contragolpes como si usaras un Kikoho defensivo.",
    precio: 38990,
    stock: 9,
    stockCritico: 3,
    categoria: "Camisetas",
    imagen: "/images/tenshinhan-ohiggins.webp"
  }
];

export function getProductos() {
  const guardados = localStorage.getItem(CLAVE_PRODUCTOS);
  if (!guardados) {
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productosIniciales));
    return productosIniciales;
  }
  return JSON.parse(guardados);
}

export function getProductoPorId(id) {
  const lista = getProductos();
  return lista.find((p) => p.id === Number(id)) || null;
}

export function saveProductos(lista) {
  localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(lista));
}

