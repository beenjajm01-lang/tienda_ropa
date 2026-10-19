// Reglas de validación para react-hook-form.
// Cada función recibe el valor del campo y devuelve true, o el mensaje de error.

export const DOMINIOS_PERMITIDOS = "@duoc.cl, @profesor.duoc.cl y @gmail.com";

const texto = (valor) => String(valor ?? "").trim();




// Correo válido según los dominios permitidos
export function esCorreoValido(correo) {
  return /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/.test(correo);
}

// Módulo 11: recorro el RUN de derecha a izquierda multiplicando por 2,3,4,5,6,7
// y repitiendo la serie. Luego 11 menos el resto: si da 11 el dígito es 0 y si da 10 es K.
export function esRunValido(run) {
  const limpio = String(run).toUpperCase();
  if (!/^[0-9]{6,8}[0-9K]$/.test(limpio)) {
    return false;
  }
  const cuerpo = limpio.slice(0, -1);
  const verificador = limpio.slice(-1);
  let suma = 0;
  let multiplo = 2;
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }
  const resto = 11 - (suma % 11);
  const esperado = resto === 11 ? "0" : resto === 10 ? "K" : String(resto);
  return esperado === verificador;
}




export function validarCorreo(valor) {
  const v = texto(valor);
  if (v === "") return "El correo es obligatorio.";
  if (v.length > 100) return "El correo no puede superar los 100 caracteres.";
  if (!esCorreoValido(v)) return `Usa un correo terminado en ${DOMINIOS_PERMITIDOS}.`;
  return true;
}

export function validarClave(valor) {
  const v = String(valor ?? "");
  if (v === "") return "La contraseña es obligatoria.";
  if (v.length < 4 || v.length > 10) return "La contraseña debe tener entre 4 y 10 caracteres.";
  return true;
}

// Repetir contraseña: recibe también la contraseña original
export function validarRepetirClave(valor, original) {
  if (String(valor ?? "") === "") return "Repite la contraseña.";
  if (valor !== original) return "Las contraseñas no coinciden.";
  return true;
}

// Nombre del contacto y del producto (máximo 100)
export function validarNombre(valor) {
  const v = texto(valor);
  if (v === "") return "El nombre es obligatorio.";
  if (v.length > 100) return "El nombre no puede superar los 100 caracteres.";
  return true;
}




export const LARGO_MAXIMO_COMENTARIO = 500;

export function validarComentario(valor) {
  const v = texto(valor);
  if (v === "") return "Escribe tu mensaje.";
  if (v.length > LARGO_MAXIMO_COMENTARIO) return "El mensaje no puede superar los 500 caracteres.";
  return true;
}




export function validarRun(valor) {
  const v = texto(valor);
  if (v === "") return "El RUN es obligatorio.";
  if (v.includes(".") || v.includes("-")) return "Escribe el RUN sin puntos ni guion. Ejemplo: 190110222.";
  if (v.length < 7 || v.length > 9) return "El RUN debe tener entre 7 y 9 caracteres.";
  if (!/^[0-9]{6,8}[0-9kK]$/.test(v)) return "El RUN solo admite números y una K final.";
  if (!esRunValido(v)) return "El dígito verificador no corresponde a este RUN.";
  return true;
}

export function validarNombreUsuario(valor) {
  const v = texto(valor);
  if (v === "") return "El nombre es obligatorio.";
  if (v.length > 50) return "El nombre no puede superar los 50 caracteres.";
  return true;
}

export function validarApellidos(valor) {
  const v = texto(valor);
  if (v === "") return "Los apellidos son obligatorios.";
  if (v.length > 100) return "Los apellidos no pueden superar los 100 caracteres.";
  return true;
}

// Opcional, pero si viene no puede ser una fecha futura
export function validarFechaNacimiento(valor) {
  if (!valor) return true;
  const hoy = new Date().toISOString().slice(0, 10);
  if (valor > hoy) return "La fecha de nacimiento no puede ser futura.";
  return true;
}

export function validarTipoUsuario(valor) {
  return valor ? true : "Selecciona el perfil del usuario.";
}

export function validarRegion(valor) {
  return valor ? true : "Selecciona la región.";
}

export function validarComuna(valor) {
  return valor ? true : "Selecciona la comuna.";
}

export function validarDireccion(valor) {
  const v = texto(valor);
  if (v === "") return "La dirección es obligatoria.";
  if (v.length > 300) return "La dirección no puede superar los 300 caracteres.";
  return true;
}




export function validarCodigoProducto(valor) {
  const v = texto(valor);
  if (v === "") return "El código es obligatorio.";
  if (v.length < 3) return "El código debe tener al menos 3 caracteres.";
  if (!/^[a-zA-Z0-9-]+$/.test(v)) return "El código solo admite letras, números y guiones.";
  return true;
}

export function validarDescripcion(valor) {
  if (String(valor ?? "").length > 500) return "La descripción no puede superar los 500 caracteres.";
  return true;
}

export function validarPrecio(valor) {
  const v = texto(valor);
  if (v === "") return "El precio es obligatorio.";
  const numero = Number(v);
  if (Number.isNaN(numero)) return "Ingresa un número válido.";
  if (numero < 0) return "El precio mínimo es 0.";
  return true;
}

export function validarStock(valor) {
  const v = texto(valor);
  if (v === "") return "El stock es obligatorio.";
  const numero = Number(v);
  if (Number.isNaN(numero)) return "Ingresa un número válido.";
  if (numero < 0) return "El stock mínimo es 0.";
  if (numero % 1 !== 0) return "El stock debe ser un número entero.";
  return true;
}

// Opcional: si viene vacío pasa
export function validarStockCritico(valor) {
  const v = texto(valor);
  if (v === "") return true;
  const numero = Number(v);
  if (Number.isNaN(numero)) return "Ingresa un número válido.";
  if (numero < 0) return "El mínimo es 0.";
  if (numero % 1 !== 0) return "Debe ser un número entero.";
  return true;
}

export function validarCategoria(valor) {
  return valor ? true : "Selecciona una categoría.";
}
