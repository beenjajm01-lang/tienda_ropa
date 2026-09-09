// datos.js - datos de la tienda y funciones del localStorage

// claves del localStorage
const CLAVE_PRODUCTOS = "cgs_productos";
const CLAVE_USUARIOS = "cgs_usuarios";
const CLAVE_CARRITO = "cgs_carrito";
const CLAVE_SESION = "cgs_sesion";

const categorias = ["Camisetas", "Shorts", "Abrigo", "Accesorios"];
const roles = ["Administrador", "Vendedor", "Cliente"];

// catalogo con camisetas reales del futbol chileno
const productosIniciales = [
  {
    id: 1,
    codigo: "CAM-CC-01",
    nombre: "Camiseta Colo-Colo 2026",
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
    descripcion: "La celeste rancagüina para tener visión de tres ojos en la mitad de la cancha. Garantiza tapar todos los contragolpes como si usaras un Kikoho defensivo.",
    precio: 38990,
    stock: 9,
    stockCritico: 3,
    categoria: "Camisetas",
    imagen: "tenshinhan-ohiggins.webp"
  }
];

// usuarios de prueba, la clave de todos es 1234
const usuariosIniciales = [
  {
    id: 1,
    run: "190110222",
    nombre: "Benjamín",
    apellidos: "Jara Molina",
    correo: "admin@duoc.cl",
    clave: "1234",
    fechaNacimiento: "1999-04-12",
    tipo: "Administrador",
    region: "13",
    comuna: "Santiago",
    direccion: "Av. Libertador Bernardo O'Higgins 1234, oficina 501"
  },
  {
    id: 2,
    run: "156789011",
    nombre: "Carolina",
    apellidos: "Soto Pérez",
    correo: "vendedor@duoc.cl",
    clave: "1234",
    fechaNacimiento: "1994-11-02",
    tipo: "Vendedor",
    region: "05",
    comuna: "Valparaíso",
    direccion: "Calle Prat 88, local 3"
  },
  {
    id: 3,
    run: "21345675K",
    nombre: "Matías",
    apellidos: "Rojas Fuentes",
    correo: "cliente@gmail.com",
    clave: "1234",
    fechaNacimiento: "2003-07-21",
    tipo: "Cliente",
    region: "08",
    comuna: "Concepción",
    direccion: "Pasaje Los Aromos 45"
  },
  {
    id: 4,
    run: "178889990",
    nombre: "Paula",
    apellidos: "Vergara Núñez",
    correo: "paula.vergara@profesor.duoc.cl",
    clave: "1234",
    fechaNacimiento: "1988-02-09",
    tipo: "Cliente",
    region: "13",
    comuna: "Maipú",
    direccion: "Av. Pajaritos 3020, depto 12B"
  }
];

// regiones con sus comunas
const regiones = [
  { codigo: "15", nombre: "Arica y Parinacota", comunas: ["Arica", "Camarones", "Putre", "General Lagos"] },
  { codigo: "01", nombre: "Tarapacá", comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Pica", "Huara"] },
  { codigo: "02", nombre: "Antofagasta", comunas: ["Antofagasta", "Calama", "Tocopilla", "Mejillones", "Taltal"] },
  { codigo: "03", nombre: "Atacama", comunas: ["Copiapó", "Caldera", "Vallenar", "Chañaral", "Huasco"] },
  { codigo: "04", nombre: "Coquimbo", comunas: ["La Serena", "Coquimbo", "Ovalle", "Illapel", "Vicuña"] },
  { codigo: "05", nombre: "Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio", "Quillota"] },
  { codigo: "13", nombre: "Metropolitana de Santiago", comunas: ["Santiago", "Providencia", "Ñuñoa", "Maipú", "Puente Alto", "La Florida", "Las Condes", "Recoleta", "San Bernardo"] },
  { codigo: "06", nombre: "Libertador General Bernardo O'Higgins", comunas: ["Rancagua", "San Fernando", "Machalí", "Santa Cruz", "Pichilemu"] },
  { codigo: "07", nombre: "Maule", comunas: ["Talca", "Curicó", "Linares", "Constitución", "Longaví", "Cauquenes"] },
  { codigo: "16", nombre: "Ñuble", comunas: ["Chillán", "Chillán Viejo", "San Carlos", "Bulnes", "Quirihue"] },
  { codigo: "08", nombre: "Biobío", comunas: ["Concepción", "Talcahuano", "Los Ángeles", "Coronel", "Chiguayante", "San Pedro de la Paz"] },
  { codigo: "09", nombre: "La Araucanía", comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Angol", "Pucón", "Victoria"] },
  { codigo: "14", nombre: "Los Ríos", comunas: ["Valdivia", "La Unión", "Río Bueno", "Panguipulli", "Paillaco"] },
  { codigo: "10", nombre: "Los Lagos", comunas: ["Puerto Montt", "Osorno", "Castro", "Ancud", "Puerto Varas"] },
  { codigo: "11", nombre: "Aysén del General Carlos Ibáñez del Campo", comunas: ["Coyhaique", "Puerto Aysén", "Chile Chico", "Cochrane"] },
  { codigo: "12", nombre: "Magallanes y de la Antártica Chilena", comunas: ["Punta Arenas", "Puerto Natales", "Porvenir", "Cabo de Hornos"] }
];

// ---------- localStorage ----------

function guardarEnStorage(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

function leerDeStorage(clave, porDefecto) {
  const texto = localStorage.getItem(clave);
  if (!texto) {
    return porDefecto;
  }
  return JSON.parse(texto);
}

// ---------- productos ----------

function obtenerProductos() {
  return leerDeStorage(CLAVE_PRODUCTOS, productosIniciales);
}

function guardarProductos(lista) {
  guardarEnStorage(CLAVE_PRODUCTOS, lista);
}

function buscarProducto(id) {
  const numero = Number(id);
  const lista = obtenerProductos();
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id === numero) {
      return lista[i];
    }
  }
  return null;
}

// ---------- usuarios ----------

function obtenerUsuarios() {
  return leerDeStorage(CLAVE_USUARIOS, usuariosIniciales);
}

function guardarUsuarios(lista) {
  guardarEnStorage(CLAVE_USUARIOS, lista);
}

function buscarUsuario(id) {
  const numero = Number(id);
  const lista = obtenerUsuarios();
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id === numero) {
      return lista[i];
    }
  }
  return null;
}

function siguienteId(lista) {
  let mayor = 0;
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id > mayor) {
      mayor = lista[i].id;
    }
  }
  return mayor + 1;
}

// ---------- regiones ----------

function comunasDeRegion(codigo) {
  for (let i = 0; i < regiones.length; i++) {
    if (regiones[i].codigo === codigo) {
      return regiones[i].comunas;
    }
  }
  return [];
}

function nombreDeRegion(codigo) {
  for (let i = 0; i < regiones.length; i++) {
    if (regiones[i].codigo === codigo) {
      return regiones[i].nombre;
    }
  }
  return "";
}

// ---------- utilidades ----------

function formatearPrecio(valor) {
  const numero = Number(valor);
  if (!numero) {
    return "$0";
  }
  return "$" + numero.toLocaleString("es-CL");
}

function obtenerParametro(nombre) {
  const partes = window.location.search.replace("?", "").split("&");
  for (let i = 0; i < partes.length; i++) {
    const par = partes[i].split("=");
    if (par[0] === nombre) {
      return decodeURIComponent(par[1]);
    }
  }
  return null;
}

function raizSitio() {
  return document.body.getAttribute("data-raiz") || "";
}

function mostrarAviso(mensaje, esError) {
  const zona = document.querySelector("[data-anuncio]");
  if (!zona) {
    alert(mensaje);
    return;
  }
  zona.className = esError ? "aviso aviso--alerta" : "aviso";
  zona.textContent = mensaje;
  zona.hidden = false;
}

