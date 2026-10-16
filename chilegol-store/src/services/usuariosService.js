// Manejo de usuarios: registro, inicio de sesión y edición.
// Es una simulación: no hay servidor ni contraseñas encriptadas.

import usuariosIniciales from '../data/usuarios';
import { leerDatos, guardarDatos, borrarDatos } from './storage';

const CLAVE = 'chilegol_usuarios';
const CLAVE_SESION = 'chilegol_sesion';

let usuarios = leerDatos(CLAVE, usuariosIniciales);

function guardar() {
  guardarDatos(CLAVE, usuarios);
}

// Nunca devolvemos la contraseña a los componentes
function sinPassword(usuario) {
  if (!usuario) return null;
  const { password: _password, ...resto } = usuario;
  return resto;
}

export function obtenerUsuarios() {
  return usuarios.map(sinPassword);
}

export function obtenerUsuarioPorId(id) {
  return sinPassword(usuarios.find((u) => u.id === Number(id)));
}

export function buscarPorEmail(email) {
  return usuarios.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
}

// Revisa correo y contraseña. Devuelve el usuario o null
export function autenticar(email, password) {
  const usuario = buscarPorEmail(email);
  if (!usuario || usuario.password !== password) return null;
  return sinPassword(usuario);
}

export function registrarUsuario(datos) {
  if (buscarPorEmail(datos.email)) {
    return { ok: false, error: 'Ya existe una cuenta con ese correo. Inicia sesión o usa otro correo.' };
  }
  const id = usuarios.length > 0 ? Math.max(...usuarios.map((u) => u.id)) + 1 : 1;
  const nuevo = {
    id,
    nombre: datos.nombre.trim(),
    apellidos: datos.apellidos.trim(),
    email: datos.email.trim().toLowerCase(),
    password: datos.password,
    telefono: datos.telefono?.trim() ?? '',
    rol: 'cliente',
    fechaRegistro: new Date().toISOString().slice(0, 10),
    direccion: null,
  };
  usuarios = [...usuarios, nuevo];
  guardar();
  return { ok: true, usuario: sinPassword(nuevo) };
}

export function actualizarUsuario(id, datos) {
  const { password: _password, ...datosSinPassword } = datos;
  usuarios = usuarios.map((u) => (u.id === Number(id) ? { ...u, ...datosSinPassword, id: u.id } : u));
  guardar();
  return obtenerUsuarioPorId(id);
}

export function cambiarPassword(id, actual, nueva) {
  const usuario = usuarios.find((u) => u.id === Number(id));
  if (!usuario) return { ok: false, error: 'No se encontró el usuario.' };
  if (usuario.password !== actual) return { ok: false, error: 'La contraseña actual no es correcta.' };
  usuarios = usuarios.map((u) => (u.id === usuario.id ? { ...u, password: nueva } : u));
  guardar();
  return { ok: true };
}

export function reiniciarUsuarios() {
  usuarios = JSON.parse(JSON.stringify(usuariosIniciales));
  guardar();
  return obtenerUsuarios();
}

// ---------- Sesión ----------

export function guardarSesion(idUsuario) {
  guardarDatos(CLAVE_SESION, idUsuario);
}

export function obtenerUsuarioSesion() {
  const id = leerDatos(CLAVE_SESION, null);
  return id ? obtenerUsuarioPorId(id) : null;
}

export function cerrarSesionGuardada() {
  borrarDatos(CLAVE_SESION);
}
