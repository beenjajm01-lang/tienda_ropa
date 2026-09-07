// validaciones.js - todas las revisiones de los formularios

var DOMINIOS_PERMITIDOS = "@duoc.cl, @profesor.duoc.cl y @gmail.com";


// ---------- revisiones basicas ----------

// solo aceptamos los tres dominios que pide el enunciado
function esCorreoValido(correo) {
  var patron = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
  return patron.test(correo);
}

// modulo 11: se recorre el cuerpo del run de derecha a izquierda
// multiplicando por 2,3,4,5,6,7 y volviendo a empezar. Al final se resta
// el resto a 11: si da 11 el digito es 0 y si da 10 es K
function esRunValido(run) {
  var limpio = String(run).toUpperCase();
  if (!/^[0-9]{6,8}[0-9K]$/.test(limpio)) {
    return false;
  }

  var cuerpo = limpio.substring(0, limpio.length - 1);
  var verificador = limpio.charAt(limpio.length - 1);
  var suma = 0;
  var multiplo = 2;

  for (var i = cuerpo.length - 1; i >= 0; i--) {
    suma = suma + Number(cuerpo.charAt(i)) * multiplo;
    if (multiplo === 7) {
      multiplo = 2;
    } else {
      multiplo = multiplo + 1;
    }
  }

  var resto = 11 - (suma % 11);
  var esperado;
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

// devuelve false para poder escribir: return mostrarError(...)
function mostrarError(idCampo, mensaje) {
  var campo = document.getElementById(idCampo);
  var zona = document.querySelector('[data-error-de="' + idCampo + '"]');
  campo.setAttribute("aria-invalid", "true");
  if (zona) {
    zona.textContent = mensaje;
    campo.setAttribute("aria-describedby", zona.id);
  }
  return false;
}

function limpiarError(idCampo) {
  var campo = document.getElementById(idCampo);
  var zona = document.querySelector('[data-error-de="' + idCampo + '"]');
  campo.setAttribute("aria-invalid", "false");
  if (zona) {
    zona.textContent = "";
    campo.removeAttribute("aria-describedby");
  }
  return true;
}

// pone el cursor en el primer campo que quedo malo
function enfocarPrimerError(formulario) {
  var campo = formulario.querySelector('[aria-invalid="true"]');
  if (campo) {
    campo.focus();
  }
}

// muestra el mensaje grande de arriba del boton
function mostrarResultado(formulario, mensaje, esError) {
  var zona = formulario.querySelector("[data-resultado]");
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

// contador de caracteres que va abajo de algunos campos
function conectarContador(idCampo, maximo) {
  var campo = document.getElementById(idCampo);
  var contador = document.querySelector('[data-contador-de="' + idCampo + '"]');
  if (!campo || !contador) {
    return;
  }

  function actualizar() {
    contador.textContent = campo.value.length + " / " + maximo;
    if (campo.value.length > maximo) {
      contador.classList.add("campo__contador--tope");
    } else {
      contador.classList.remove("campo__contador--tope");
    }
  }

  campo.addEventListener("input", actualizar);
  actualizar();
}

// engancha un campo a su validacion: al salir siempre revisa, y mientras
// escribe solo si ya estaba marcado en rojo
function conectarCampo(idCampo, revisar) {
  var campo = document.getElementById(idCampo);
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


// ---------- login ----------

function validarCorreoLogin() {
  var valor = document.getElementById("correo").value.trim();
  if (valor === "") {
    return mostrarError("correo", "Ingresa tu correo.");
  }
  if (valor.length > 100) {
    return mostrarError("correo", "El correo no puede superar los 100 caracteres.");
  }
  if (!esCorreoValido(valor)) {
    return mostrarError("correo", "Usa un correo terminado en " + DOMINIOS_PERMITIDOS + ".");
  }
  return limpiarError("correo");
}

function validarClaveLogin() {
  var valor = document.getElementById("clave").value;
  if (valor === "") {
    return mostrarError("clave", "Ingresa tu contraseña.");
  }
  if (valor.length < 4 || valor.length > 10) {
    return mostrarError("clave", "La contraseña debe tener entre 4 y 10 caracteres.");
  }
  return limpiarError("clave");
}


// ---------- contacto ----------

function validarNombreContacto() {
  var valor = document.getElementById("nombre").value.trim();
  if (valor === "") {
    return mostrarError("nombre", "Ingresa tu nombre.");
  }
  if (valor.length > 100) {
    return mostrarError("nombre", "El nombre no puede superar los 100 caracteres.");
  }
  return limpiarError("nombre");
}

function validarCorreoContacto() {
  var valor = document.getElementById("correo").value.trim();
  if (valor === "") {
    return mostrarError("correo", "Ingresa tu correo.");
  }
  if (valor.length > 100) {
    return mostrarError("correo", "El correo no puede superar los 100 caracteres.");
  }
  if (!esCorreoValido(valor)) {
    return mostrarError("correo", "Usa un correo terminado en " + DOMINIOS_PERMITIDOS + ".");
  }
  return limpiarError("correo");
}

function validarComentario() {
  var valor = document.getElementById("comentario").value.trim();
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
  var valor = document.getElementById("run").value.trim();
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
  var valor = document.getElementById("nombre").value.trim();
  if (valor === "") {
    return mostrarError("nombre", "El nombre es obligatorio.");
  }
  if (valor.length > 50) {
    return mostrarError("nombre", "El nombre no puede superar los 50 caracteres.");
  }
  return limpiarError("nombre");
}

function validarApellidos() {
  var valor = document.getElementById("apellidos").value.trim();
  if (valor === "") {
    return mostrarError("apellidos", "Los apellidos son obligatorios.");
  }
  if (valor.length > 100) {
    return mostrarError("apellidos", "Los apellidos no pueden superar los 100 caracteres.");
  }
  return limpiarError("apellidos");
}

function validarCorreoUsuario() {
  var valor = document.getElementById("correo").value.trim();
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

function validarClaveNueva() {
  var valor = document.getElementById("clave").value;
  if (valor === "") {
    return mostrarError("clave", "Define una contraseña.");
  }
  if (valor.length < 4 || valor.length > 10) {
    return mostrarError("clave", "La contraseña debe tener entre 4 y 10 caracteres.");
  }
  return limpiarError("clave");
}

function validarRepetirClave() {
  var valor = document.getElementById("clave2").value;
  var original = document.getElementById("clave").value;
  if (valor === "") {
    return mostrarError("clave2", "Repite la contraseña.");
  }
  if (valor !== original) {
    return mostrarError("clave2", "Las contraseñas no coinciden.");
  }
  return limpiarError("clave2");
}

function validarTipoUsuario() {
  var valor = document.getElementById("tipo").value;
  if (valor === "") {
    return mostrarError("tipo", "Selecciona el perfil del usuario.");
  }
  return limpiarError("tipo");
}

function validarRegion() {
  var valor = document.getElementById("region").value;
  if (valor === "") {
    return mostrarError("region", "Selecciona la región.");
  }
  return limpiarError("region");
}

function validarComuna() {
  var valor = document.getElementById("comuna").value;
  if (valor === "") {
    return mostrarError("comuna", "Selecciona la comuna.");
  }
  return limpiarError("comuna");
}

function validarDireccion() {
  var valor = document.getElementById("direccion").value.trim();
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
  var valor = document.getElementById("codigo").value.trim();
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

function validarNombreProducto() {
  var valor = document.getElementById("nombre").value.trim();
  if (valor === "") {
    return mostrarError("nombre", "El nombre es obligatorio.");
  }
  if (valor.length > 100) {
    return mostrarError("nombre", "El nombre no puede superar los 100 caracteres.");
  }
  return limpiarError("nombre");
}

function validarDescripcion() {
  var valor = document.getElementById("descripcion").value;
  if (valor.length > 500) {
    return mostrarError("descripcion", "La descripción no puede superar los 500 caracteres.");
  }
  return limpiarError("descripcion");
}

function validarPrecio() {
  var valor = document.getElementById("precio").value.trim();
  if (valor === "") {
    return mostrarError("precio", "El precio es obligatorio.");
  }
  var numero = Number(valor);
  if (isNaN(numero)) {
    return mostrarError("precio", "Ingresa un número válido.");
  }
  if (numero < 0) {
    return mostrarError("precio", "El precio mínimo es 0.");
  }
  return limpiarError("precio");
}

function validarStock() {
  var valor = document.getElementById("stock").value.trim();
  if (valor === "") {
    return mostrarError("stock", "El stock es obligatorio.");
  }
  var numero = Number(valor);
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

// este es opcional, si viene vacio lo damos por bueno
function validarStockCritico() {
  var valor = document.getElementById("stockCritico").value.trim();
  if (valor === "") {
    return limpiarError("stockCritico");
  }
  var numero = Number(valor);
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
  var valor = document.getElementById("categoria").value;
  if (valor === "") {
    return mostrarError("categoria", "Selecciona una categoría.");
  }
  return limpiarError("categoria");
}