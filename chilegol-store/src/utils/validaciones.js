// Validaciones de los formularios.
// Cada función recibe los datos del formulario y devuelve un objeto con los errores.
// Si el objeto está vacío, el formulario está bien.

export function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(email).trim());
}

export function validarPassword(password) {
  return String(password).length >= 6;
}

export function hayErrores(errores) {
  return Object.keys(errores).length > 0;
}

function textoVacio(valor) {
  return !valor || String(valor).trim() === '';
}

const MENSAJE_EMAIL = 'Ingresa un correo válido, por ejemplo nombre@correo.cl';
const MENSAJE_PASSWORD = 'La contraseña debe tener al menos 6 caracteres';

export function validarLogin({ email, password }) {
  const errores = {};
  if (!validarEmail(email)) errores.email = MENSAJE_EMAIL;
  if (!validarPassword(password)) errores.password = MENSAJE_PASSWORD;
  return errores;
}

export function validarRegistro({ nombre, apellidos, email, password, confirmar, terminos }) {
  const errores = {};
  if (textoVacio(nombre)) errores.nombre = 'Escribe tu nombre';
  if (textoVacio(apellidos)) errores.apellidos = 'Escribe tus apellidos';
  if (!validarEmail(email)) errores.email = MENSAJE_EMAIL;
  if (!validarPassword(password)) errores.password = MENSAJE_PASSWORD;
  if (password !== confirmar) errores.confirmar = 'Las contraseñas no coinciden';
  if (!terminos) errores.terminos = 'Debes aceptar los términos y condiciones';
  return errores;
}

export const LARGO_MAXIMO_MENSAJE = 500;

export function validarContacto({ nombre, email, motivo, mensaje }) {
  const errores = {};
  if (textoVacio(nombre)) errores.nombre = 'Escribe tu nombre';
  if (!validarEmail(email)) errores.email = MENSAJE_EMAIL;
  if (textoVacio(motivo)) errores.motivo = 'Elige el motivo de tu mensaje';
  if (String(mensaje).trim().length < 10) errores.mensaje = 'El mensaje debe tener al menos 10 caracteres';
  if (String(mensaje).length > LARGO_MAXIMO_MENSAJE) {
    errores.mensaje = `El mensaje puede tener hasta ${LARGO_MAXIMO_MENSAJE} caracteres`;
  }
  return errores;
}

export function validarCheckout({ nombre, apellidos, email, calle, region, comuna }) {
  const errores = {};
  if (textoVacio(nombre)) errores.nombre = 'Escribe el nombre de quien recibe';
  if (textoVacio(apellidos)) errores.apellidos = 'Escribe los apellidos';
  if (!validarEmail(email)) errores.email = MENSAJE_EMAIL;
  if (textoVacio(calle)) errores.calle = 'Escribe la calle y el número';
  if (textoVacio(region)) errores.region = 'Elige una región';
  if (textoVacio(comuna)) errores.comuna = 'Elige una comuna';
  return errores;
}

export function validarProducto({ nombre, precio, stock, categoria, enOferta, precioOferta, tallas }) {
  const errores = {};
  const precioNumero = Number(precio);
  const stockNumero = Number(stock);

  if (textoVacio(nombre) || String(nombre).trim().length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres';
  }
  if (!Number.isInteger(precioNumero) || precioNumero <= 0) {
    errores.precio = 'El precio debe ser un número entero mayor que 0';
  }
  if (!Number.isInteger(stockNumero) || stockNumero < 0) {
    errores.stock = 'El stock debe ser un número entero igual o mayor que 0';
  }
  if (textoVacio(categoria)) errores.categoria = 'Elige una categoría';
  if (enOferta) {
    const ofertaNumero = Number(precioOferta);
    if (!Number.isInteger(ofertaNumero) || ofertaNumero <= 0) {
      errores.precioOferta = 'Escribe el precio de oferta';
    } else if (ofertaNumero >= precioNumero) {
      errores.precioOferta = 'El precio de oferta debe ser menor que el precio normal';
    }
  }
  if (!tallas || tallas.length === 0) errores.tallas = 'Elige al menos una talla';
  return errores;
}

export function validarCambioPassword({ actual, nueva, confirmar }) {
  const errores = {};
  if (textoVacio(actual)) errores.actual = 'Escribe tu contraseña actual';
  if (!validarPassword(nueva)) errores.nueva = MENSAJE_PASSWORD;
  if (nueva !== confirmar) errores.confirmar = 'Las contraseñas no coinciden';
  return errores;
}
