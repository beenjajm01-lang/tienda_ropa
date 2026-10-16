// Funciones para guardar y leer datos en el navegador (localStorage).
// Así, si el administrador crea un producto y recarga la página, el producto sigue ahí.
// Si el navegador no deja usar localStorage (modo incógnito, por ejemplo),
// la tienda igual funciona con los datos del archivo.

// Versión de los datos de /data. Si cambia (por ejemplo, porque se agregan productos o imágenes),
// se borra lo guardado en el navegador para que todos partan con los datos nuevos.
const VERSION_DATOS = '2';

try {
  if (window.localStorage.getItem('chilegol_version') !== VERSION_DATOS) {
    Object.keys(window.localStorage)
      .filter((clave) => clave.startsWith('chilegol_'))
      .forEach((clave) => window.localStorage.removeItem(clave));
    window.localStorage.setItem('chilegol_version', VERSION_DATOS);
  }
} catch {
  // Sin localStorage no hay nada que limpiar
}

// Hace una copia del valor para no modificar los datos originales del archivo
function copiar(valor) {
  return JSON.parse(JSON.stringify(valor));
}

export function leerDatos(clave, valorPorDefecto) {
  try {
    const texto = window.localStorage.getItem(clave);
    if (texto) {
      return JSON.parse(texto);
    }
  } catch {
    // Si falla, seguimos con los datos por defecto
  }
  return copiar(valorPorDefecto);
}

export function guardarDatos(clave, valor) {
  try {
    window.localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    // Si no se puede guardar, los datos solo duran hasta recargar la página
  }
}

export function borrarDatos(clave) {
  try {
    window.localStorage.removeItem(clave);
  } catch {
    // Nada que hacer
  }
}
