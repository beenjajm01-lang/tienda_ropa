// Usuarios, roles, permisos y sesión en localStorage (simulación, sin servidor).
// Cuentas de prueba (clave 1234): admin@duoc.cl, vendedor@duoc.cl, cliente@gmail.com.

import { leer, guardar, borrar, siguienteId } from './storage';

const CLAVE_USUARIOS = "cgs_usuarios";
const CLAVE_SESION = "cgs_sesion";

// Clave inicial de los usuarios creados desde el panel
export const CLAVE_INICIAL = "1234";

export const roles = ["Administrador", "Vendedor", "Cliente"];

// Permisos de cada rol en el panel
export const PERMISOS = {
  Administrador: { productos: "crud", usuarios: "crud" },
  Vendedor: { productos: "lectura", usuarios: "ninguno" },
  Cliente: { productos: "ninguno", usuarios: "ninguno" },
};

export const usuariosIniciales = [
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
    direccion: "Av. Libertador Bernardo O'Higgins 1234, oficina 501",
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
    direccion: "Calle Prat 88, local 3",
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
    direccion: "Pasaje Los Aromos 45",
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
    direccion: "Av. Pajaritos 3020, depto 12B",
  },
];




export function getUsuarios() {
  const guardados = leer(CLAVE_USUARIOS, null);
  if (!Array.isArray(guardados)) {
    guardar(CLAVE_USUARIOS, usuariosIniciales);
    return [...usuariosIniciales];
  }
  return guardados;
}

export function getUsuarioPorId(id) {
  return getUsuarios().find((u) => u.id === Number(id)) || null;
}

// true si el RUN o el correo ya existen; idIgnorado se omite al editar
export function existeRunOCorreo(run, correo, idIgnorado = null) {
  const runBuscado = String(run).trim().toUpperCase();
  const correoBuscado = String(correo).trim().toLowerCase();
  return getUsuarios().some(
    (u) => u.id !== idIgnorado && (u.run.toUpperCase() === runBuscado || u.correo.toLowerCase() === correoBuscado)
  );
}




function saveUsuarios(lista) {
  guardar(CLAVE_USUARIOS, lista);
}

function normalizar(datos) {
  return {
    run: String(datos.run).trim().toUpperCase(),
    nombre: String(datos.nombre).trim(),
    apellidos: String(datos.apellidos).trim(),
    correo: String(datos.correo).trim(),
    fechaNacimiento: datos.fechaNacimiento || "",
    tipo: datos.tipo,
    region: datos.region,
    comuna: datos.comuna,
    direccion: String(datos.direccion).trim(),
  };
}

// Crear (registro o panel). Si no viene clave, queda la inicial.
export function crearUsuario(datos) {
  const lista = getUsuarios();
  const nuevo = {
    id: siguienteId(lista),
    ...normalizar(datos),
    clave: datos.clave || CLAVE_INICIAL,
  };
  saveUsuarios([...lista, nuevo]);
  return nuevo;
}

// Actualizar: la clave no se cambia aquí
export function actualizarUsuario(id, datos) {
  const lista = getUsuarios();
  const numero = Number(id);
  const existente = lista.find((u) => u.id === numero);
  if (!existente) {
    return null;
  }
  const actualizado = { ...existente, ...normalizar({ ...existente, ...datos }), id: numero, clave: existente.clave };
  saveUsuarios(lista.map((u) => (u.id === numero ? actualizado : u)));
  return actualizado;
}

export function eliminarUsuario(id) {
  const quedan = getUsuarios().filter((u) => u.id !== Number(id));
  saveUsuarios(quedan);
  return quedan;
}

export function restablecerUsuarios() {
  saveUsuarios(usuariosIniciales);
  return [...usuariosIniciales];
}




// Devuelve el usuario si el correo y la clave coinciden, o null
export function autenticar(correo, clave) {
  const buscado = String(correo).trim().toLowerCase();
  return getUsuarios().find((u) => u.correo.toLowerCase() === buscado && u.clave === clave) || null;
}

// En la sesión nunca se guarda la clave
function datosDeSesion(usuario) {
  return {
    id: usuario.id,
    nombre: `${usuario.nombre} ${usuario.apellidos}`,
    correo: usuario.correo,
    rol: usuario.tipo,
  };
}

export function guardarSesion(usuario) {
  const sesion = datosDeSesion(usuario);
  guardar(CLAVE_SESION, sesion);
  return sesion;
}

export function getSesion() {
  return leer(CLAVE_SESION, null);
}

// Vuelve a leer al usuario conectado (por si lo editaron o lo eliminaron)
export function refrescarSesion() {
  const sesion = getSesion();
  if (!sesion) {
    return null;
  }
  const usuario = getUsuarioPorId(sesion.id);
  if (!usuario) {
    cerrarSesion();
    return null;
  }
  return guardarSesion(usuario);
}

export function cerrarSesion() {
  borrar(CLAVE_SESION);
}

export function permisosDe(rol) {
  return PERMISOS[rol] ?? PERMISOS.Cliente;
}
