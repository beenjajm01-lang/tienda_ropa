// principal.js - menu, sesion y los formularios de la tienda

// ---------- sesion ----------

function obtenerSesion() {
  return leerDeStorage(CLAVE_SESION, null);
}

function guardarSesion(usuario) {
  guardarEnStorage(CLAVE_SESION, {
    id: usuario.id,
    nombre: usuario.nombre + " " + usuario.apellidos,
    correo: usuario.correo,
    rol: usuario.tipo
  });
}

function cerrarSesion() {
  localStorage.removeItem(CLAVE_SESION);
}


// ---------- menu del celular ----------

function esPantallaChica() {
  return window.matchMedia("(max-width: 767px)").matches;
}

function iniciarMenu() {
  var boton = document.querySelector("[data-menu-boton]");
  var menu = document.querySelector("[data-menu]");
  if (!boton || !menu) {
    return;
  }

  // en el celular el menu parte cerrado, en pantalla grande el css lo muestra igual
  if (esPantallaChica()) {
    menu.hidden = true;
  }

  boton.addEventListener("click", function () {
    var abierto = boton.getAttribute("aria-expanded") === "true";
    if (abierto) {
      boton.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    } else {
      boton.setAttribute("aria-expanded", "true");
      menu.hidden = false;
    }
  });

  document.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape" && esPantallaChica()) {
      boton.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    }
  });

  window.addEventListener("resize", function () {
    if (!esPantallaChica()) {
      menu.hidden = false;
    } else if (boton.getAttribute("aria-expanded") !== "true") {
      menu.hidden = true;
    }
  });
}


// ---------- cabecera y pie ----------

function iniciarCabecera() {
  var raiz = raizSitio();
  var usuario = obtenerSesion();
  var enlace = document.querySelector("[data-sesion-enlace]");

  if (enlace) {
    if (!usuario) {
      enlace.textContent = "Iniciar sesión";
      enlace.href = raiz + "pages/login.html";
    } else if (usuario.rol === "Cliente") {
      enlace.textContent = "Mi cuenta";
      enlace.href = raiz + "pages/carrito.html";
    } else {
      enlace.textContent = "Panel admin";
      enlace.href = raiz + "admin/index.html";
    }
  }

  var salir = document.querySelector("[data-cerrar-sesion]");
  if (salir) {
    salir.hidden = !usuario;
    salir.addEventListener("click", function (evento) {
      evento.preventDefault();
      cerrarSesion();
      window.location.href = raiz + "index.html";
    });
  }

  var anio = document.querySelector("[data-anio]");
  if (anio) {
    anio.textContent = new Date().getFullYear();
  }

  actualizarContadorCarrito();
}


// ---------- select de region y comuna ----------

// llena el select de comunas segun la region elegida
function llenarComunas(regionElegida, comunaElegida) {
  var selectComuna = document.getElementById("comuna");
  var comunas = comunasDeRegion(regionElegida);
  var html = "";

  if (comunas.length === 0) {
    html = '<option value="">-- Elige primero una región --</option>';
    selectComuna.disabled = true;
  } else {
    html = '<option value="">-- Selecciona la comuna --</option>';
    for (var i = 0; i < comunas.length; i++) {
      html += '<option value="' + escaparTexto(comunas[i]) + '">' + escaparTexto(comunas[i]) + '</option>';
    }
    selectComuna.disabled = false;
  }

  selectComuna.innerHTML = html;

  if (comunaElegida) {
    selectComuna.value = comunaElegida;
  }
}

function llenarRegiones(regionElegida, comunaElegida) {
  var selectRegion = document.getElementById("region");
  if (!selectRegion) {
    return;
  }

  var html = '<option value="">-- Selecciona la región --</option>';
  for (var i = 0; i < regiones.length; i++) {
    html += '<option value="' + regiones[i].codigo + '">' + escaparTexto(regiones[i].nombre) + '</option>';
  }
  selectRegion.innerHTML = html;

  // cada vez que cambia la region se rearman las comunas
  selectRegion.addEventListener("change", function () {
    llenarComunas(selectRegion.value, "");
  });

  if (regionElegida) {
    selectRegion.value = regionElegida;
    llenarComunas(regionElegida, comunaElegida);
  } else {
    llenarComunas("", "");
  }
}


// ---------- formulario de login ----------

function iniciarLogin() {
  var formulario = document.querySelector("[data-form-login]");
  if (!formulario) {
    return;
  }

  // si el admin nos mando para aca por no tener sesion, avisamos
  if (obtenerParametro("motivo") === "sesion") {
    var zona = formulario.querySelector("[data-resultado]");
    zona.className = "aviso aviso--precaucion formulario__resultado";
    zona.textContent = "Inicia sesión para entrar al panel de administración.";
  }

  conectarCampo("correo", validarCorreoLogin);
  conectarCampo("clave", validarClaveLogin);

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var correoOk = validarCorreoLogin();
    var claveOk = validarClaveLogin();

    if (!correoOk || !claveOk) {
      mostrarResultado(formulario, "Revisa los campos marcados antes de continuar.", true);
      enfocarPrimerError(formulario);
      return;
    }

    var correo = document.getElementById("correo").value.trim().toLowerCase();
    var clave = document.getElementById("clave").value;

    var usuarios = obtenerUsuarios();
    var encontrado = null;
    for (var i = 0; i < usuarios.length; i++) {
      if (usuarios[i].correo.toLowerCase() === correo && usuarios[i].clave === clave) {
        encontrado = usuarios[i];
      }
    }

    if (!encontrado) {
      mostrarResultado(formulario, "Correo o contraseña incorrectos. Revisa las cuentas de prueba más abajo.", true);
      return;
    }

    guardarSesion(encontrado);

    if (encontrado.tipo === "Cliente") {
      window.location.href = raizSitio() + "index.html";
    } else {
      window.location.href = raizSitio() + "admin/index.html";
    }
  });
}


// ---------- formulario de registro ----------

function iniciarRegistro() {
  var formulario = document.querySelector("[data-form-registro]");
  if (!formulario) {
    return;
  }

  llenarRegiones("", "");
  conectarContador("direccion", 300);

  conectarCampo("run", validarRun);
  conectarCampo("nombre", validarNombreUsuario);
  conectarCampo("apellidos", validarApellidos);
  conectarCampo("correo", validarCorreoUsuario);
  conectarCampo("clave", validarClaveNueva);
  conectarCampo("clave2", validarRepetirClave);
  conectarCampo("region", validarRegion);
  conectarCampo("comuna", validarComuna);
  conectarCampo("direccion", validarDireccion);

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    // los llamamos todos por separado para que se marquen todos los errores
    var revisiones = [
      validarRun(),
      validarNombreUsuario(),
      validarApellidos(),
      validarCorreoUsuario(),
      validarClaveNueva(),
      validarRepetirClave(),
      validarRegion(),
      validarComuna(),
      validarDireccion()
    ];

    for (var i = 0; i < revisiones.length; i++) {
      if (revisiones[i] === false) {
        mostrarResultado(formulario, "Revisa los campos marcados antes de continuar.", true);
        enfocarPrimerError(formulario);
        return;
      }
    }

    var run = document.getElementById("run").value.trim().toUpperCase();
    var correo = document.getElementById("correo").value.trim();

    var usuarios = obtenerUsuarios();
    for (var j = 0; j < usuarios.length; j++) {
      if (usuarios[j].run.toUpperCase() === run || usuarios[j].correo.toLowerCase() === correo.toLowerCase()) {
        mostrarResultado(formulario, "Ya existe una cuenta con ese RUN o ese correo.", true);
        return;
      }
    }

    usuarios.push({
      id: siguienteId(usuarios),
      run: run,
      nombre: document.getElementById("nombre").value.trim(),
      apellidos: document.getElementById("apellidos").value.trim(),
      correo: correo,
      clave: document.getElementById("clave").value,
      fechaNacimiento: document.getElementById("fechaNacimiento").value,
      tipo: "Cliente", // el rol solo se cambia desde el admin
      region: document.getElementById("region").value,
      comuna: document.getElementById("comuna").value,
      direccion: document.getElementById("direccion").value.trim()
    });

    guardarUsuarios(usuarios);

    formulario.reset();
    llenarComunas("", "");
    mostrarResultado(formulario, "Cuenta creada. Ya puedes iniciar sesión con tu correo.", false);
  });
}


// ---------- formulario de contacto ----------

function iniciarContacto() {
  var formulario = document.querySelector("[data-form-contacto]");
  if (!formulario) {
    return;
  }

  conectarContador("comentario", 500);

  conectarCampo("nombre", validarNombreContacto);
  conectarCampo("correo", validarCorreoContacto);
  conectarCampo("comentario", validarComentario);

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var nombreOk = validarNombreContacto();
    var correoOk = validarCorreoContacto();
    var comentarioOk = validarComentario();

    if (!nombreOk || !correoOk || !comentarioOk) {
      mostrarResultado(formulario, "Revisa los campos marcados antes de continuar.", true);
      enfocarPrimerError(formulario);
      return;
    }

    var nombre = document.getElementById("nombre").value.trim();
    var correo = document.getElementById("correo").value.trim();

    formulario.reset();
    document.querySelector('[data-contador-de="comentario"]').textContent = "0 / 500";
    mostrarResultado(formulario, "Gracias " + nombre + ", recibimos tu mensaje. Te responderemos a " + correo + ".", false);
  });
}


document.addEventListener("DOMContentLoaded", function () {
  iniciarMenu();
  iniciarCabecera();
  iniciarLogin();
  iniciarRegistro();
  iniciarContacto();
});