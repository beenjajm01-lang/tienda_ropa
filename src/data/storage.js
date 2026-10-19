// Helpers de localStorage. Si falla o no está disponible, se usa el valor por defecto.

export function leer(clave, porDefecto) {
  try {
    const texto = localStorage.getItem(clave);
    if (texto) {
      return JSON.parse(texto);
    }
  } catch {
    // dato dañado o localStorage bloqueado
  }
  return porDefecto;
}

export function guardar(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    // sin localStorage los cambios no persisten
  }
}

export function borrar(clave) {
  try {
    localStorage.removeItem(clave);
  } catch {
    // nada que borrar
  }
}

// El id nuevo es el mayor id + 1
export function siguienteId(lista) {
  return lista.reduce((mayor, item) => Math.max(mayor, item.id), 0) + 1;
}
