// Funciones para mostrar precios y fechas al estilo chileno.

// 49990 -> "$49.990"
export function formatearPrecio(valor) {
  const numero = Math.round(Number(valor) || 0);
  const signo = numero < 0 ? '-' : '';
  const conPuntos = Math.abs(numero)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${signo}$${conPuntos}`;
}

// Convierte "2026-09-20" o "2026-09-20T15:20:00" en una fecha.
// Las fechas sin hora se leen como fecha local (si no, en Chile aparecerían un día antes).
function aFecha(texto) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(texto)) {
    const [anio, mes, dia] = texto.split('-').map(Number);
    return new Date(anio, mes - 1, dia);
  }
  return new Date(texto);
}

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sept', 'oct', 'nov', 'dic'];

// "2026-09-20" -> "20 sept 2026"
export function formatearFecha(texto) {
  const fecha = aFecha(texto);
  if (Number.isNaN(fecha.getTime())) return '';
  return `${fecha.getDate()} ${MESES[fecha.getMonth()]} ${fecha.getFullYear()}`;
}

// "2026-09-20T15:20:00" -> "20 sept 2026, 15:20"
export function formatearFechaHora(texto) {
  const fecha = aFecha(texto);
  if (Number.isNaN(fecha.getTime())) return '';
  const horas = String(fecha.getHours()).padStart(2, '0');
  const minutos = String(fecha.getMinutes()).padStart(2, '0');
  return `${formatearFecha(texto)}, ${horas}:${minutos}`;
}

// Nombre del mes y año: "2026-09" -> "sept 2026"
export function nombreMes(anioMes) {
  const [anio, mes] = anioMes.split('-').map(Number);
  return `${MESES[mes - 1]} ${anio}`;
}
