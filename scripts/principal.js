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

function iniciarMenu() {
  const boton = document.querySelector("[data-menu-boton]");
  const menu = document.querySelector("[data-menu]");
  if (!boton || !menu) {
    return;
  }

  boton.addEventListener("click", function () {
    if (menu.classList.contains("menu--abierto")) {
      menu.classList.remove("menu--abierto");
      boton.setAttribute("aria-expanded", "false");
    } else {
      menu.classList.add("menu--abierto");
      boton.setAttribute("aria-expanded", "true");
    }
  });
}


// ---------- cabecera y pie ----------

function iniciarCabecera() {
  let raiz = raizSitio();
  let usuario = obtenerSesion();
  let enlace = document.querySelector("[data-sesion-enlace]");

  // si inicio sesion le cambio el texto al boton del header
  if (enlace) {
    if (!usuario) {
      enlace.textContent = "Iniciar sesión";
      enlace.href = raiz + "pages/login.html";
    } else if (usuario.rol === "Cliente") {
      enlace.textContent = "Mi cuenta";
      enlace.href = raiz + "pages/carrito.html";
    } else {
      enlace.textContent = "Panel admin";
      enlace.href = raiz + "pages/admin-home.html";
    }
  }

  // boton de salir que aparece abajo en el footer
  let salir = document.querySelector("[data-cerrar-sesion]");
  if (salir) {
    salir.hidden = !usuario;
    salir.addEventListener("click", function (evento) {
      evento.preventDefault();
      cerrarSesion();
      window.location.href = raiz + "index.html";
    });
  }

  // año dinamico pal footer
  let anio = document.querySelector("[data-anio]");
  if (anio) {
    anio.textContent = new Date().getFullYear();
  }

  actualizarContadorCarrito();
}


// ---------- select de region y comuna ----------

// llena las comunas de la region elegida
function llenarComunas(regionElegida, comunaElegida) {
  let selectComuna = document.getElementById("comuna");
  if (!selectComuna) {
    return;
  }

  let comunas = comunasDeRegion(regionElegida);
  let html = "";

  if (comunas.length === 0) {
    html = '<option value="">-- Elige primero una región --</option>';
    selectComuna.disabled = true;
  } else {
    html = '<option value="">-- Selecciona la comuna --</option>';
    for (let i = 0; i < comunas.length; i++) {
      html += '<option value="' + comunas[i] + '">' + comunas[i] + '</option>';
    }
    selectComuna.disabled = false;
  }

  selectComuna.innerHTML = html;

  if (comunaElegida) {
    selectComuna.value = comunaElegida;
  }
}

function llenarRegiones(regionElegida, comunaElegida) {
  let selectRegion = document.getElementById("region");
  if (!selectRegion) {
    return;
  }

  let html = '<option value="">-- Selecciona la región --</option>';
  for (let i = 0; i < regiones.length; i++) {
    html += '<option value="' + regiones[i].codigo + '">' + regiones[i].nombre + '</option>';
  }
  selectRegion.innerHTML = html;

  // al cambiar la region cambian las comunas
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
  let formulario = document.querySelector("[data-form-login]");
  if (!formulario || typeof validarCorreo !== "function") {
    return;
  }

  if (obtenerParametro("motivo") === "sesion") {
    let zona = formulario.querySelector("[data-resultado]");
    if (zona) {
      zona.className = "aviso aviso--precaucion formulario__resultado";
      zona.textContent = "Inicia sesión para entrar al panel de administración.";
    }
  }

  conectarCampo("correo", validarCorreo);
  conectarCampo("clave", validarClave);

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let correoOk = validarCorreo();
    let claveOk = validarClave();

    if (!correoOk || !claveOk) {
      mostrarResultado(formulario, "Revisa los campos marcados antes de continuar.", true);
      enfocarPrimerError(formulario);
      return;
    }

    let correo = document.getElementById("correo").value.trim().toLowerCase();
    let clave = document.getElementById("clave").value;

    let usuarios = obtenerUsuarios();
    let encontrado = null;
    for (let i = 0; i < usuarios.length; i++) {
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
      window.location.href = raizSitio() + "pages/admin-home.html";
    }
  });
}


// ---------- formulario de registro ----------

function iniciarRegistro() {
  let formulario = document.querySelector("[data-form-registro]");
  if (!formulario || typeof validarRun !== "function") {
    return;
  }
  llenarRegiones("", "");

  conectarCampo("run", validarRun);
  conectarCampo("nombre", validarNombreUsuario);
  conectarCampo("apellidos", validarApellidos);
  conectarCampo("correo", validarCorreo);
  conectarCampo("clave", validarClave);
  conectarCampo("clave2", validarRepetirClave);
  conectarCampo("region", validarRegion);
  conectarCampo("comuna", validarComuna);
  conectarCampo("direccion", validarDireccion);

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    // los llamo todos para que se marquen todos los errores
    let revisiones = [
      validarRun(),
      validarNombreUsuario(),
      validarApellidos(),
      validarCorreo(),
      validarClave(),
      validarRepetirClave(),
      validarRegion(),
      validarComuna(),
      validarDireccion()
    ];

    for (let i = 0; i < revisiones.length; i++) {
      if (revisiones[i] === false) {
        mostrarResultado(formulario, "Revisa los campos marcados antes de continuar.", true);
        enfocarPrimerError(formulario);
        return;
      }
    }

    let run = document.getElementById("run").value.trim().toUpperCase();
    let correo = document.getElementById("correo").value.trim();

    let usuarios = obtenerUsuarios();
    for (let j = 0; j < usuarios.length; j++) {
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
      tipo: "Cliente",
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
  let formulario = document.querySelector("[data-form-contacto]");
  if (!formulario || typeof validarNombre !== "function") {
    return;
  }

  conectarCampo("nombre", validarNombre);
  conectarCampo("correo", validarCorreo);
  conectarCampo("comentario", validarComentario);

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    let nombreOk = validarNombre();
    let correoOk = validarCorreo();
    let comentarioOk = validarComentario();

    if (!nombreOk || !correoOk || !comentarioOk) {
      mostrarResultado(formulario, "Revisa los campos marcados antes de continuar.", true);
      enfocarPrimerError(formulario);
      return;
    }

    let nombre = document.getElementById("nombre").value.trim();
    let correo = document.getElementById("correo").value.trim();

    formulario.reset();
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