// validaciones.js - todas las revisiones de los formularios

const DOMINIOS_PERMITIDOS = "@duoc.cl, @profesor.duoc.cl y @gmail.com";


// ---------- revisiones basicas ----------

// solo los tres dominios que pide el enunciado
function esCorreoValido(correo) {
  let patron = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  return patron.test(correo);
}

// modulo 11: recorro el run de derecha a izquierda multiplicando por
// 2,3,4,5,6,7 y repitiendo la serie. Despues resto el resto a 11:
// si da 11 el digito es 0 y si da 10 es K
function esRunValido(run) {
  let limpio = String(run).toUpperCase();
  if (!/^[0-9]{6,8}[0-9K]$/.test(limpio)) {
    return false;
  }

  let cuerpo = limpio.substring(0, limpio.length - 1);
  let verificador = limpio.charAt(limpio.length - 1);
  let suma = 0;
  let multiplo = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma = suma + Number(cuerpo.charAt(i)) * multiplo;
    if (multiplo === 7) {
      multiplo = 2;
    } else {
      multiplo = multiplo + 1;
    }
  }

  let resto = 11 - (suma % 11);
  let esperado;
  if (resto === 11) {
    esperado = "0";
  } else if (resto === 10) {
    esperado = "K";
  } else {
    esperado = String(resto);
  }

  return esperado === verificador;
}


// ---------- pintar y borrar errores ----------

// devuelve false para poder hacer: return mostrarError(...)
function mostrarError(idCampo, mensaje) {
  let campo = document.getElementById(idCampo);
  let zona = document.querySelector('[data-error-de="' + idCampo + '"]');
  campo.setAttribute("aria-invalid", "true");
  if (zona) {
    zona.textContent = mensaje;
    campo.setAttribute("aria-describedby", zona.id);
  }
  return false;
}

function limpiarError(idCampo) {
  let campo = document.getElementById(idCampo);
  let zona = document.querySelector('[data-error-de="' + idCampo + '"]');
  campo.setAttribute("aria-invalid", "false");
  if (zona) {
    zona.textContent = "";
    campo.removeAttribute("aria-describedby");
  }
  return true;
}

// cursor al primer campo malo
function enfocarPrimerError(formulario) {
  let campo = formulario.querySelector('[aria-invalid="true"]');
  if (campo) {
    campo.focus();
  }
}

// mensaje grande del formulario
function mostrarResultado(formulario, mensaje, esError) {
  let zona = formulario.querySelector("[data-resultado]");
  if (!zona) {
    return;
  }
  if (esError) {
    zona.className = "aviso aviso--alerta formulario__resultado";
  } else {
    zona.className = "aviso formulario__resultado";
  }
  zona.textContent = mensaje;
}

// al salir del campo siempre revisa, mientras escribe solo si ya estaba en rojo
function conectarCampo(idCampo, revisar) {
  let campo = document.getElementById(idCampo);
  if (!campo) {
    return;
  }
  campo.addEventListener("blur", revisar);
  campo.addEventListener("change", revisar);
  campo.addEventListener("input", function () {
    if (campo.getAttribute("aria-invalid") === "true") {
      revisar();
    }
  });
}


// ---------- campos que se repiten en varios formularios ----------

function validarCorreo() {
  const valor = document.getElementById("correo").value.trim();
  if (valor === "") {
    return mostrarError("correo", "El correo es obligatorio.");
  }
  if (valor.length > 100) {
    return mostrarError("correo", "El correo no puede superar los 100 caracteres.");
  }
  if (!esCorreoValido(valor)) {
    return mostrarError("correo", "Usa un correo terminado en " + DOMINIOS_PERMITIDOS + ".");
  }
  return limpiarError("correo");
}

function validarClave() {
  const valor = document.getElementById("clave").value;
  if (valor === "") {
    return mostrarError("clave", "La contraseña es obligatoria.");
  }
  if (valor.length < 4 || valor.length > 10) {
    return mostrarError("clave", "La contraseña debe tener entre 4 y 10 caracteres.");
  }
  return limpiarError("clave");
}

// lo usan el formulario de contacto y el de producto, los dos con maximo 100
function validarNombre() {
  const valor = document.getElementById("nombre").value.trim();
  if (valor === "") {
    return mostrarError("nombre", "El nombre es obligatorio.");
  }
  if (valor.length > 100) {
    return mostrarError("nombre", "El nombre no puede superar los 100 caracteres.");
  }
  return limpiarError("nombre");
}


// ---------- contacto ----------


function validarComentario() {
  let valor = document.getElementById("comentario").value.trim();
  if (valor === "") {
    return mostrarError("comentario", "Escribe tu mensaje.");
  }
  if (valor.length > 500) {
    return mostrarError("comentario", "El mensaje no puede superar los 500 caracteres.");
  }
  return limpiarError("comentario");
}


// ---------- usuario (sirve para el registro y para el admin) ----------

function validarRun() {
  let valor = document.getElementById("run").value.trim();
  if (valor === "") {
    return mostrarError("run", "El RUN es obligatorio.");
  }
  if (valor.indexOf(".") >= 0 || valor.indexOf("-") >= 0) {
    return mostrarError("run", "Escribe el RUN sin puntos ni guion. Ejemplo: 190110222.");
  }
  if (valor.length < 7 || valor.length > 9) {
    return mostrarError("run", "El RUN debe tener entre 7 y 9 caracteres.");
  }
  if (!/^[0-9]{6,8}[0-9kK]$/.test(valor)) {
    return mostrarError("run", "El RUN solo admite números y una K final.");
  }
  if (!esRunValido(valor)) {
    return mostrarError("run", "El dígito verificador no corresponde a este RUN.");
  }
  return limpiarError("run");
}

function validarNombreUsuario() {
  let valor = document.getElementById("nombre").value.trim();
  if (valor === "") {
    return mostrarError("nombre", "El nombre es obligatorio.");
  }
  if (valor.length > 50) {
    return mostrarError("nombre", "El nombre no puede superar los 50 caracteres.");
  }
  return limpiarError("nombre");
}

function validarApellidos() {
  let valor = document.getElementById("apellidos").value.trim();
  if (valor === "") {
    return mostrarError("apellidos", "Los apellidos son obligatorios.");
  }
  if (valor.length > 100) {
    return mostrarError("apellidos", "Los apellidos no pueden superar los 100 caracteres.");
  }
  return limpiarError("apellidos");
}


function validarRepetirClave() {
  let valor = document.getElementById("clave2").value;
  let original = document.getElementById("clave").value;
  if (valor === "") {
    return mostrarError("clave2", "Repite la contraseña.");
  }
  if (valor !== original) {
    return mostrarError("clave2", "Las contraseñas no coinciden.");
  }
  return limpiarError("clave2");
}

function validarTipoUsuario() {
  let valor = document.getElementById("tipo").value;
  if (valor === "") {
    return mostrarError("tipo", "Selecciona el perfil del usuario.");
  }
  return limpiarError("tipo");
}

function validarRegion() {
  let valor = document.getElementById("region").value;
  if (valor === "") {
    return mostrarError("region", "Selecciona la región.");
  }
  return limpiarError("region");
}

function validarComuna() {
  let valor = document.getElementById("comuna").value;
  if (valor === "") {
    return mostrarError("comuna", "Selecciona la comuna.");
  }
  return limpiarError("comuna");
}

function validarDireccion() {
  let valor = document.getElementById("direccion").value.trim();
  if (valor === "") {
    return mostrarError("direccion", "La dirección es obligatoria.");
  }
  if (valor.length > 300) {
    return mostrarError("direccion", "La dirección no puede superar los 300 caracteres.");
  }
  return limpiarError("direccion");
}


// ---------- producto ----------

function validarCodigoProducto() {
  let valor = document.getElementById("codigo").value.trim();
  if (valor === "") {
    return mostrarError("codigo", "El código es obligatorio.");
  }
  if (valor.length < 3) {
    return mostrarError("codigo", "El código debe tener al menos 3 caracteres.");
  }
  if (!/^[a-zA-Z0-9-]+$/.test(valor)) {
    return mostrarError("codigo", "El código solo admite letras, números y guiones.");
  }
  return limpiarError("codigo");
}


function validarDescripcion() {
  let valor = document.getElementById("descripcion").value;
  if (valor.length > 500) {
    return mostrarError("descripcion", "La descripción no puede superar los 500 caracteres.");
  }
  return limpiarError("descripcion");
}

function validarPrecio() {
  let valor = document.getElementById("precio").value.trim();
  if (valor === "") {
    return mostrarError("precio", "El precio es obligatorio.");
  }
  let numero = Number(valor);
  if (isNaN(numero)) {
    return mostrarError("precio", "Ingresa un número válido.");
  }
  if (numero < 0) {
    return mostrarError("precio", "El precio mínimo es 0.");
  }
  return limpiarError("precio");
}

function validarStock() {
  let valor = document.getElementById("stock").value.trim();
  if (valor === "") {
    return mostrarError("stock", "El stock es obligatorio.");
  }
  let numero = Number(valor);
  if (isNaN(numero)) {
    return mostrarError("stock", "Ingresa un número válido.");
  }
  if (numero < 0) {
    return mostrarError("stock", "El stock mínimo es 0.");
  }
  if (numero % 1 !== 0) {
    return mostrarError("stock", "El stock debe ser un número entero.");
  }
  return limpiarError("stock");
}

// es opcional, si viene vacio pasa
function validarStockCritico() {
  let valor = document.getElementById("stockCritico").value.trim();
  if (valor === "") {
    return limpiarError("stockCritico");
  }
  let numero = Number(valor);
  if (isNaN(numero)) {
    return mostrarError("stockCritico", "Ingresa un número válido.");
  }
  if (numero < 0) {
    return mostrarError("stockCritico", "El mínimo es 0.");
  }
  if (numero % 1 !== 0) {
    return mostrarError("stockCritico", "Debe ser un número entero.");
  }
  return limpiarError("stockCritico");
}

function validarCategoria() {
  let valor = document.getElementById("categoria").value;
  if (valor === "") {
    return mostrarError("categoria", "Selecciona una categoría.");
  }
  return limpiarError("categoria");
}
