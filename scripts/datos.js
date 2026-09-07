// datos.js - datos de la tienda y funciones para leer/guardar en localStorage

// claves que usamos en el localStorage
var CLAVE_PRODUCTOS = "cgs_productos";
var CLAVE_USUARIOS = "cgs_usuarios";
var CLAVE_CARRITO = "cgs_carrito";
var CLAVE_SESION = "cgs_sesion";

var categorias = ["Camisetas", "Shorts", "Abrigo", "Accesorios"];
var roles = ["Administrador", "Vendedor", "Cliente"];

// catalogo de partida, solo se usa la primera vez que se abre la pagina
var productosIniciales = [
  {
    id: 1,
    codigo: "CAM-CORD-01",
    nombre: "Camiseta Cordillera",
    descripcion: "Camiseta local en tejido reciclado, con franja diagonal y cuello redondo reforzado. Corte regular, pensada para jugar y para la tribuna.",
    precio: 34990,
    stock: 24,
    stockCritico: 5,
    categoria: "Camisetas",
    imagen: "camiseta-cordillera.svg"
  },
  {
    id: 2,
    codigo: "CAM-PACI-02",
    nombre: "Camiseta Pacífico",
    descripcion: "Alternativa en azul profundo con detalles celestes. Tela liviana de secado rápido para entrenamientos largos.",
    precio: 32990,
    stock: 3,
    stockCritico: 5,
    categoria: "Camisetas",
    imagen: "camiseta-pacifico.svg"
  },
  {
    id: 3,
    codigo: "CAM-RET-88",
    nombre: "Camiseta Retro 88",
    descripcion: "Reedición del modelo de 1988: algodón peinado, cuello polo y escudo bordado. Edición limitada.",
    precio: 44990,
    stock: 12,
    stockCritico: 4,
    categoria: "Camisetas",
    imagen: "camiseta-retro-88.svg"
  },
  {
    id: 4,
    codigo: "CAM-CAL-04",
    nombre: "Camiseta Visita Cal",
    descripcion: "Camiseta de visita en color cal con ribetes verdes. Costuras planas para evitar roce.",
    precio: 31990,
    stock: 18,
    stockCritico: 5,
    categoria: "Camisetas",
    imagen: "camiseta-visita-cal.svg"
  },
  {
    id: 5,
    codigo: "SHO-ARE-05",
    nombre: "Short Arena",
    descripcion: "Short de juego con bolsillos internos y pretina elástica ajustable.",
    precio: 18990,
    stock: 30,
    stockCritico: 6,
    categoria: "Shorts",
    imagen: "short-arena.svg"
  },
  {
    id: 6,
    codigo: "ABR-HIN-06",
    nombre: "Polerón Hincha",
    descripcion: "Polerón con capucha y felpa interior. Pensado para partidos de invierno en el estadio.",
    precio: 49990,
    stock: 0,
    stockCritico: 4,
    categoria: "Abrigo",
    imagen: "poleron-hincha.svg"
  },
  {
    id: 7,
    codigo: "ACC-ALT-07",
    nombre: "Medias Altiplano",
    descripcion: "Par de medias altas con compresión suave en el empeine.",
    precio: 7990,
    stock: 60,
    stockCritico: 10,
    categoria: "Accesorios",
    imagen: "medias-altiplano.svg"
  },
  {
    id: 8,
    codigo: "ABR-BAN-08",
    nombre: "Chaqueta Banca",
    descripcion: "Chaqueta cortaviento con forro de malla y cierre completo. Resiste lluvia ligera.",
    precio: 0,
    stock: 9,
    stockCritico: 3,
    categoria: "Abrigo",
    imagen: "chaqueta-banca.svg"
  }
];

// usuarios de prueba, la clave de todos es 1234
var usuariosIniciales = [
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

// ordenes de ejemplo, solo para mostrarlas en la tabla del admin
var ordenes = [
  { numero: "SO1001", fecha: "2026-08-28", cliente: "Matías Rojas", estado: "Enviado", total: 67980 },
  { numero: "SO1002", fecha: "2026-08-29", cliente: "Paula Vergara", estado: "Pendiente", total: 34990 },
  { numero: "SO1003", fecha: "2026-08-30", cliente: "Ignacio Bravo", estado: "Cancelado", total: 18990 },
  { numero: "SO1004", fecha: "2026-09-01", cliente: "Daniela Retamal", estado: "Procesando", total: 112970 },
  { numero: "SO1005", fecha: "2026-09-03", cliente: "Echo Enterprises", estado: "Enviado", total: 44990 },
  { numero: "SO1006", fecha: "2026-09-05", cliente: "Camila Fuenzalida", estado: "Pendiente", total: 25980 }
];

// regiones con sus comunas, para los select en cascada
var regiones = [
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
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
    return true;
  } catch (error) {
    console.log("No se pudo guardar " + clave, error);
    return false;
  }
}

function leerDeStorage(clave, porDefecto) {
  var texto = localStorage.getItem(clave);
  if (!texto) {
    return porDefecto;
  }
  try {
    return JSON.parse(texto);
  } catch (error) {
    // si el json quedo malo devolvemos los datos de partida
    console.log("No se pudo leer " + clave, error);
    return porDefecto;
  }
}

// copia una lista para no modificar los datos originales
function copiarLista(lista) {
  return JSON.parse(JSON.stringify(lista));
}


// ---------- productos ----------

function obtenerProductos() {
  return leerDeStorage(CLAVE_PRODUCTOS, copiarLista(productosIniciales));
}

function guardarProductos(lista) {
  return guardarEnStorage(CLAVE_PRODUCTOS, lista);
}

function buscarProducto(id) {
  var numero = Number(id);
  var lista = obtenerProductos();
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id === numero) {
      return lista[i];
    }
  }
  return null;
}


// ---------- usuarios ----------

function obtenerUsuarios() {
  return leerDeStorage(CLAVE_USUARIOS, copiarLista(usuariosIniciales));
}

function guardarUsuarios(lista) {
  return guardarEnStorage(CLAVE_USUARIOS, lista);
}

function buscarUsuario(id) {
  var numero = Number(id);
  var lista = obtenerUsuarios();
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id === numero) {
      return lista[i];
    }
  }
  return null;
}

// el id nuevo es el mas alto que exista mas uno
function siguienteId(lista) {
  var mayor = 0;
  for (var i = 0; i < lista.length; i++) {
    if (lista[i].id > mayor) {
      mayor = lista[i].id;
    }
  }
  return mayor + 1;
}


// ---------- regiones ----------

function comunasDeRegion(codigo) {
  for (var i = 0; i < regiones.length; i++) {
    if (regiones[i].codigo === codigo) {
      return regiones[i].comunas;
    }
  }
  return [];
}

function nombreDeRegion(codigo) {
  for (var i = 0; i < regiones.length; i++) {
    if (regiones[i].codigo === codigo) {
      return regiones[i].nombre;
    }
  }
  return "";
}


// ---------- ayudas generales ----------

function formatearPrecio(valor) {
  var numero = Number(valor);
  if (!numero) {
    return "Gratis";
  }
  return numero.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  });
}

// lee un parametro de la url, por ejemplo producto.html?id=3
function obtenerParametro(nombre) {
  var parametros = new URLSearchParams(window.location.search);
  return parametros.get(nombre);
}

// las paginas dentro de pages/ y admin/ guardan "../" en el body
function raizSitio() {
  return document.body.getAttribute("data-raiz") || "";
}

// escapamos el texto antes de meterlo con innerHTML para que un nombre
// con < o " no rompa la pagina
function escaparTexto(texto) {
  var salida = String(texto);
  salida = salida.split("&").join("&amp;");
  salida = salida.split("<").join("&lt;");
  salida = salida.split(">").join("&gt;");
  salida = salida.split('"').join("&quot;");
  return salida;
}

// muestra el mensajito verde o rojo que tienen varias paginas
function mostrarAviso(mensaje, esError) {
  var zona = document.querySelector("[data-anuncio]");
  if (!zona) {
    return;
  }
  if (esError) {
    zona.className = "aviso aviso--alerta";
  } else {
    zona.className = "aviso";
  }
  zona.textContent = mensaje;
  zona.hidden = false;
}