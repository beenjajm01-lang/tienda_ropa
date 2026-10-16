// Órdenes de compra (boletas)

import ordenesIniciales from '../data/ordenes';
import { leerDatos, guardarDatos } from './storage';

const CLAVE = 'chilegol_ordenes';

let ordenes = leerDatos(CLAVE, ordenesIniciales);

function guardar() {
  guardarDatos(CLAVE, ordenes);
}

// Las más nuevas primero
export function obtenerOrdenes() {
  return [...ordenes].sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
}

export function obtenerOrdenPorNumero(numero) {
  return ordenes.find((o) => o.numero === numero);
}

// Órdenes de un usuario (por id o por correo, para incluir compras como invitado)
export function obtenerOrdenesDeUsuario(usuario) {
  return obtenerOrdenes().filter(
    (o) => o.usuarioId === usuario.id || o.cliente.email.toLowerCase() === usuario.email.toLowerCase()
  );
}

// Número correlativo: ORD-001, ORD-002, ...
function siguienteNumero() {
  const mayor = ordenes.reduce((max, o) => Math.max(max, Number(o.numero.replace('ORD-', ''))), 0);
  return `ORD-${String(mayor + 1).padStart(3, '0')}`;
}

export function crearOrden({ usuarioId = null, cliente, direccion, items, total }) {
  const id = ordenes.length > 0 ? Math.max(...ordenes.map((o) => o.id)) + 1 : 1;
  const orden = {
    id,
    numero: siguienteNumero(),
    fecha: new Date().toISOString(),
    usuarioId,
    estado: 'Pagada',
    cliente,
    direccion,
    items,
    total,
  };
  ordenes = [...ordenes, orden];
  guardar();
  return orden;
}

export function actualizarEstadoOrden(id, estado) {
  ordenes = ordenes.map((o) => (o.id === Number(id) ? { ...o, estado } : o));
  guardar();
}

export function reiniciarOrdenes() {
  ordenes = JSON.parse(JSON.stringify(ordenesIniciales));
  guardar();
  return obtenerOrdenes();
}
