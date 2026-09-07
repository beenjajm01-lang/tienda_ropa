// admin.js - panel de administracion: permisos por rol y mantenedores

// que puede hacer cada rol en cada modulo
var PERMISOS = {
  Administrador: { productos: "crud", usuarios: "crud", ordenes: "lectura" },
  Vendedor: { productos: "lectura", usuarios: "ninguno", ordenes: "lectura" },
  Cliente: { productos: "ninguno", usuarios: "ninguno", ordenes: "ninguno" }
};

// revisa que el usuario pueda estar en esta pagina.
// Ojo: esto es solo para la maqueta, la seguridad de verdad va en el servidor
function protegerPanel(modulo) {
  var raiz = raizSitio();
  var usuario = obtenerSesion();

  if (!usuario) {
    window.location.replace(raiz + "pages/login.html?motivo=sesion");
    return null;
  }

  if (usuario.rol === "Cliente") {
    window.location.replace(raiz + "index.html");
    return null;
  }

  var permisos = PERMISOS[usuario.rol];

  if (modulo && permisos[modulo] === "ninguno") {
    window.location.replace(raiz + "admin/index.html?motivo=permiso");
    return null;
  }

  // escondemos del menu lo que el rol no puede abrir
  var opciones = document.querySelectorAll("[data-requiere]");
  for (var i = 0; i < opciones.length; i++) {
    var necesita = opciones[i].getAttribute("data-requiere");
    if (permisos[necesita] === "ninguno") {
      opciones[i].hidden = true;
    }
  }

  // el vendedor no puede crear ni editar, asi que le sacamos esos botones
  if (permisos.productos !== "crud") {
    var soloAdmin = document.querySelectorAll("[data-solo-admin]");
    for (var j = 0; j < soloAdmin.length; j++) {
      soloAdmin[j].hidden = true;
    }
  }

  var nombre = document.querySelector("[data-sesion-nombre]");
  if (nombre) {
    nombre.textContent = usuario.nombre;
  }

  var rol = document.querySelector("[data-sesion-rol]");
  if (rol) {
    rol.textContent = usuario.rol;
  }

  var salir = document.querySelector("[data-salir]");
  if (salir) {
    salir.addEventListener("click", function (evento) {
      evento.preventDefault();
      cerrarSesion();
      window.location.href = raiz + "index.html";
    });
  }

  return { usuario: usuario, permisos: permisos };
}

// mensajes que llegan por la url despues de guardar o de un rebote por permisos
function mostrarAvisoDeLaUrl() {
  if (obtenerParametro("motivo") === "permiso") {
    mostrarAviso("Tu rol no tiene acceso a ese módulo.", true);
    return;
  }
  var texto = obtenerParametro("aviso");
  if (texto) {
    mostrarAviso(texto, false);
  }
}


// ---------- resumen ----------

function iniciarResumen() {
  var zona = document.querySelector("[data-indicadores]");
  if (!zona) {
    return;
  }
  if (!protegerPanel(null)) {
    return;
  }

  var productos = obtenerProductos();
  var usuarios = obtenerUsuarios();

  var criticos = [];
  var valorInventario = 0;
  for (var i = 0; i < productos.length; i++) {
    valorInventario = valorInventario + productos[i].precio * productos[i].stock;
    if (productos[i].stockCritico !== "" && productos[i].stock <= productos[i].stockCritico) {
      criticos.push(productos[i]);
    }
  }

  var claseCriticos = "indicador";
  if (criticos.length > 0) {
    claseCriticos = "indicador indicador--alerta";
  }

  var html = "";
  html += '<article class="indicador"><p class="indicador__valor">' + productos.length + '</p><p class="indicador__etiqueta">Productos publicados</p></article>';
  html += '<article class="' + claseCriticos + '"><p class="indicador__valor">' + criticos.length + '</p><p class="indicador__etiqueta">En stock crítico</p></article>';
  html += '<article class="indicador"><p class="indicador__valor">' + usuarios.length + '</p><p class="indicador__etiqueta">Usuarios registrados</p></article>';
  html += '<article class="indicador"><p class="indicador__valor">' + formatearPrecio(valorInventario) + '</p><p class="indicador__etiqueta">Valor del inventario</p></article>';
  zona.innerHTML = html;

  var lista = document.querySelector("[data-criticos]");
  if (!lista) {
    return;
  }

  if (criticos.length === 0) {
    lista.innerHTML = '<p class="aviso">Ningún producto está bajo su umbral crítico.</p>';
  } else {
    var htmlLista = "<ul>";
    for (var j = 0; j < criticos.length; j++) {
      htmlLista += "<li>" + escaparTexto(criticos[j].nombre) + " — quedan " + criticos[j].stock + " (umbral: " + criticos[j].stockCritico + ")</li>";
    }
    htmlLista += "</ul>";
    lista.innerHTML = htmlLista;
  }
}


// ---------- tabla de productos ----------

function iniciarTablaProductos() {
  var cuerpo = document.querySelector("[data-tabla-productos]");
  if (!cuerpo) {
    return;
  }

  var sesion = protegerPanel("productos");
  if (!sesion) {
    return;
  }

  var puedeEditar = sesion.permisos.productos === "crud";
  var buscador = document.getElementById("buscar");

  function pintar() {
    var texto = "";
    if (buscador) {
      texto = buscador.value.toLowerCase();
    }

    var productos = obtenerProductos();
    var html = "";
    var encontrados = 0;

    for (var i = 0; i < productos.length; i++) {
      var p = productos[i];

      if (texto !== "" && p.nombre.toLowerCase().indexOf(texto) < 0 && p.codigo.toLowerCase().indexOf(texto) < 0) {
        continue;
      }
      encontrados++;

      var estado;
      if (p.stock === 0) {
        estado = '<span class="etiqueta etiqueta--alerta">Agotado</span>';
      } else if (p.stockCritico !== "" && p.stock <= p.stockCritico) {
        estado = '<span class="etiqueta etiqueta--aviso">Stock crítico</span>';
      } else {
        estado = '<span class="etiqueta etiqueta--ok">Disponible</span>';
      }

      var acciones = '<a class="boton boton--secundario boton--pequeno" href="' + raizSitio() + 'pages/producto.html?id=' + p.id + '">Ver</a>';
      if (puedeEditar) {
        acciones += '<a class="boton boton--secundario boton--pequeno" href="producto-form.html?id=' + p.id + '">Editar</a>';
        acciones += '<button class="boton boton--peligro boton--pequeno" type="button" data-borrar-producto="' + p.id + '">Eliminar</button>';
      }

      html += "<tr>";
      html += "<td>" + escaparTexto(p.codigo) + "</td>";
      html += "<td>" + escaparTexto(p.nombre) + "</td>";
      html += "<td>" + escaparTexto(p.categoria) + "</td>";
      html += "<td>" + formatearPrecio(p.precio) + "</td>";
      html += "<td>" + p.stock + "</td>";
      html += "<td>" + estado + "</td>";
      html += '<td><div class="tabla__acciones">' + acciones + "</div></td>";
      html += "</tr>";
    }

    if (encontrados === 0) {
      html = '<tr><td colspan="7">No hay productos que coincidan con la búsqueda.</td></tr>';
    }

    cuerpo.innerHTML = html;
  }

  cuerpo.addEventListener("click", function (evento) {
    var boton = evento.target.closest("[data-borrar-producto]");
    if (!boton) {
      return;
    }

    var id = Number(boton.getAttribute("data-borrar-producto"));
    var producto = buscarProducto(id);
    if (!confirm("¿Eliminar " + producto.nombre + " del catálogo?")) {
      return;
    }

    var productos = obtenerProductos();
    var quedan = [];
    for (var i = 0; i < productos.length; i++) {
      if (productos[i].id !== id) {
        quedan.push(productos[i]);
      }
    }

    guardarProductos(quedan);
    pintar();
  });

  if (buscador) {
    buscador.addEventListener("input", pintar);
  }

  pintar();
}


// ---------- formulario de producto ----------

function iniciarFormProducto() {
  var formulario = document.querySelector("[data-form-producto]");
  if (!formulario) {
    return;
  }

  var sesion = protegerPanel("productos");
  if (!sesion) {
    return;
  }

  // el vendedor no puede crear ni editar productos
  if (sesion.permisos.productos !== "crud") {
    window.location.replace("productos.html?motivo=permiso");
    return;
  }

  var selectCategoria = document.getElementById("categoria");
  var htmlCategorias = '<option value="">-- Selecciona la categoría --</option>';
  for (var i = 0; i < categorias.length; i++) {
    htmlCategorias += '<option value="' + categorias[i] + '">' + categorias[i] + "</option>";
  }
  selectCategoria.innerHTML = htmlCategorias;

  // si viene un id en la url estamos editando
  var id = obtenerParametro("id");
  var existente = null;
  if (id) {
    existente = buscarProducto(id);
  }

  if (existente) {
    document.querySelector("[data-titulo-form]").textContent = "Editar producto";
    document.title = "Editar producto · Panel ChileGol";
    document.getElementById("codigo").value = existente.codigo;
    document.getElementById("nombre").value = existente.nombre;
    document.getElementById("descripcion").value = existente.descripcion;
    document.getElementById("precio").value = existente.precio;
    document.getElementById("stock").value = existente.stock;
    document.getElementById("stockCritico").value = existente.stockCritico;
    document.getElementById("categoria").value = existente.categoria;
    document.getElementById("imagen").value = existente.imagen;
  }

  conectarContador("descripcion", 500);

  conectarCampo("codigo", validarCodigoProducto);
  conectarCampo("nombre", validarNombreProducto);
  conectarCampo("descripcion", validarDescripcion);
  conectarCampo("precio", validarPrecio);
  conectarCampo("stock", validarStock);
  conectarCampo("stockCritico", validarStockCritico);
  conectarCampo("categoria", validarCategoria);

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var revisiones = [
      validarCodigoProducto(),
      validarNombreProducto(),
      validarDescripcion(),
      validarPrecio(),
      validarStock(),
      validarStockCritico(),
      validarCategoria()
    ];

    for (var i = 0; i < revisiones.length; i++) {
      if (revisiones[i] === false) {
        mostrarResultado(formulario, "Revisa los campos marcados antes de continuar.", true);
        enfocarPrimerError(formulario);
        return;
      }
    }

    var codigo = document.getElementById("codigo").value.trim().toUpperCase();
    var productos = obtenerProductos();

    // no puede haber dos productos con el mismo codigo
    for (var j = 0; j < productos.length; j++) {
      var esElMismo = existente && productos[j].id === existente.id;
      if (!esElMismo && productos[j].codigo.toUpperCase() === codigo) {
        mostrarResultado(formulario, "Ya existe otro producto con el código " + codigo + ".", true);
        return;
      }
    }

    var stockCriticoTexto = document.getElementById("stockCritico").value.trim();
    var stockCritico = "";
    if (stockCriticoTexto !== "") {
      stockCritico = parseInt(stockCriticoTexto, 10);
    }

    var imagen = document.getElementById("imagen").value.trim();
    if (imagen === "") {
      imagen = "camiseta-cordillera.svg";
    }

    var nuevo = {
      id: 0,
      codigo: codigo,
      nombre: document.getElementById("nombre").value.trim(),
      descripcion: document.getElementById("descripcion").value.trim(),
      precio: Number(document.getElementById("precio").value),
      stock: parseInt(document.getElementById("stock").value, 10),
      stockCritico: stockCritico,
      categoria: document.getElementById("categoria").value,
      imagen: imagen
    };

    var mensaje;
    if (existente) {
      nuevo.id = existente.id;
      for (var k = 0; k < productos.length; k++) {
        if (productos[k].id === existente.id) {
          productos[k] = nuevo;
        }
      }
      mensaje = "Producto actualizado.";
    } else {
      nuevo.id = siguienteId(productos);
      productos.push(nuevo);
      mensaje = "Producto creado.";
    }

    // avisamos si el stock quedo bajo el umbral critico
    if (nuevo.stockCritico !== "" && nuevo.stock <= nuevo.stockCritico) {
      mensaje += " Atención: el stock (" + nuevo.stock + ") está en o bajo el umbral crítico (" + nuevo.stockCritico + ").";
    }

    guardarProductos(productos);
    window.location.href = "productos.html?aviso=" + encodeURIComponent(mensaje);
  });
}


// ---------- tabla de usuarios ----------

function iniciarTablaUsuarios() {
  var cuerpo = document.querySelector("[data-tabla-usuarios]");
  if (!cuerpo) {
    return;
  }

  var sesion = protegerPanel("usuarios");
  if (!sesion) {
    return;
  }

  var buscador = document.getElementById("buscar");

  function pintar() {
    var texto = "";
    if (buscador) {
      texto = buscador.value.toLowerCase();
    }

    var usuarios = obtenerUsuarios();
    var html = "";

    for (var i = 0; i < usuarios.length; i++) {
      var u = usuarios[i];
      var nombreCompleto = u.nombre + " " + u.apellidos;

      if (texto !== "" &&
          nombreCompleto.toLowerCase().indexOf(texto) < 0 &&
          u.correo.toLowerCase().indexOf(texto) < 0 &&
          u.run.toLowerCase().indexOf(texto) < 0) {
        continue;
      }

      // nadie puede borrarse a si mismo
      var borrar;
      if (u.id === sesion.usuario.id) {
        borrar = '<button class="boton boton--peligro boton--pequeno" type="button" disabled title="No puedes eliminar tu propia cuenta.">Eliminar</button>';
      } else {
        borrar = '<button class="boton boton--peligro boton--pequeno" type="button" data-borrar-usuario="' + u.id + '">Eliminar</button>';
      }

      html += "<tr>";
      html += "<td>" + escaparTexto(u.run) + "</td>";
      html += "<td>" + escaparTexto(nombreCompleto) + "</td>";
      html += "<td>" + escaparTexto(u.correo) + "</td>";
      html += '<td><span class="etiqueta">' + escaparTexto(u.tipo) + "</span></td>";
      html += "<td>" + escaparTexto(nombreDeRegion(u.region) + " · " + u.comuna) + "</td>";
      html += '<td><div class="tabla__acciones">';
      html += '<a class="boton boton--secundario boton--pequeno" href="usuario-form.html?id=' + u.id + '">Editar</a>';
      html += borrar;
      html += "</div></td>";
      html += "</tr>";
    }

    cuerpo.innerHTML = html;
  }

  cuerpo.addEventListener("click", function (evento) {
    var boton = evento.target.closest("[data-borrar-usuario]");
    if (!boton) {
      return;
    }

    var id = Number(boton.getAttribute("data-borrar-usuario"));
    var usuario = buscarUsuario(id);
    if (!confirm("¿Eliminar a " + usuario.nombre + " " + usuario.apellidos + "?")) {
      return;
    }

    var usuarios = obtenerUsuarios();
    var quedan = [];
    for (var i = 0; i < usuarios.length; i++) {
      if (usuarios[i].id !== id) {
        quedan.push(usuarios[i]);
      }
    }

    guardarUsuarios(quedan);
    pintar();
  });

  if (buscador) {
    buscador.addEventListener("input", pintar);
  }

  pintar();
}


// ---------- formulario de usuario ----------

function iniciarFormUsuario() {
  var formulario = document.querySelector("[data-form-usuario]");
  if (!formulario) {
    return;
  }

  var sesion = protegerPanel("usuarios");
  if (!sesion) {
    return;
  }

  var selectTipo = document.getElementById("tipo");
  var htmlRoles = '<option value="">-- Selecciona el perfil --</option>';
  for (var i = 0; i < roles.length; i++) {
    htmlRoles += '<option value="' + roles[i] + '">' + roles[i] + "</option>";
  }
  selectTipo.innerHTML = htmlRoles;

  var id = obtenerParametro("id");
  var existente = null;
  if (id) {
    existente = buscarUsuario(id);
  }

  if (existente) {
    document.querySelector("[data-titulo-form]").textContent = "Editar usuario";
    document.title = "Editar usuario · Panel ChileGol";
    document.getElementById("run").value = existente.run;
    document.getElementById("nombre").value = existente.nombre;
    document.getElementById("apellidos").value = existente.apellidos;
    document.getElementById("correo").value = existente.correo;
    document.getElementById("fechaNacimiento").value = existente.fechaNacimiento;
    document.getElementById("tipo").value = existente.tipo;
    document.getElementById("direccion").value = existente.direccion;
    llenarRegiones(existente.region, existente.comuna);
  } else {
    llenarRegiones("", "");
  }

  conectarContador("direccion", 300);

  conectarCampo("run", validarRun);
  conectarCampo("nombre", validarNombreUsuario);
  conectarCampo("apellidos", validarApellidos);
  conectarCampo("correo", validarCorreoUsuario);
  conectarCampo("tipo", validarTipoUsuario);
  conectarCampo("region", validarRegion);
  conectarCampo("comuna", validarComuna);
  conectarCampo("direccion", validarDireccion);

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    var revisiones = [
      validarRun(),
      validarNombreUsuario(),
      validarApellidos(),
      validarCorreoUsuario(),
      validarTipoUsuario(),
      validarRegion(),
      validarComuna(),
      validarDireccion()
    ];

    for (var j = 0; j < revisiones.length; j++) {
      if (revisiones[j] === false) {
        mostrarResultado(formulario, "Revisa los campos marcados antes de continuar.", true);
        enfocarPrimerError(formulario);
        return;
      }
    }

    var run = document.getElementById("run").value.trim().toUpperCase();
    var correo = document.getElementById("correo").value.trim();
    var usuarios = obtenerUsuarios();

    for (var k = 0; k < usuarios.length; k++) {
      var esElMismo = existente && usuarios[k].id === existente.id;
      if (!esElMismo && (usuarios[k].run.toUpperCase() === run || usuarios[k].correo.toLowerCase() === correo.toLowerCase())) {
        mostrarResultado(formulario, "Ya existe otro usuario con ese RUN o ese correo.", true);
        return;
      }
    }

    var nuevo = {
      id: 0,
      run: run,
      nombre: document.getElementById("nombre").value.trim(),
      apellidos: document.getElementById("apellidos").value.trim(),
      correo: correo,
      clave: "1234",
      fechaNacimiento: document.getElementById("fechaNacimiento").value,
      tipo: document.getElementById("tipo").value,
      region: document.getElementById("region").value,
      comuna: document.getElementById("comuna").value,
      direccion: document.getElementById("direccion").value.trim()
    };

    var mensaje;
    if (existente) {
      nuevo.id = existente.id;
      nuevo.clave = existente.clave;
      for (var m = 0; m < usuarios.length; m++) {
        if (usuarios[m].id === existente.id) {
          usuarios[m] = nuevo;
        }
      }
      mensaje = "Usuario actualizado.";
    } else {
      nuevo.id = siguienteId(usuarios);
      usuarios.push(nuevo);
      mensaje = "Usuario creado con la clave inicial 1234.";
    }

    guardarUsuarios(usuarios);
    window.location.href = "usuarios.html?aviso=" + encodeURIComponent(mensaje);
  });
}


// ---------- tabla de ordenes ----------

function iniciarTablaOrdenes() {
  var cuerpo = document.querySelector("[data-tabla-ordenes]");
  if (!cuerpo) {
    return;
  }
  if (!protegerPanel("ordenes")) {
    return;
  }

  var html = "";
  for (var i = 0; i < ordenes.length; i++) {
    var orden = ordenes[i];

    var clase = "etiqueta";
    if (orden.estado === "Enviado") {
      clase = "etiqueta etiqueta--ok";
    } else if (orden.estado === "Pendiente") {
      clase = "etiqueta etiqueta--aviso";
    } else if (orden.estado === "Cancelado") {
      clase = "etiqueta etiqueta--alerta";
    }

    html += "<tr>";
    html += "<td>" + orden.numero + "</td>";
    html += "<td>" + orden.fecha + "</td>";
    html += "<td>" + escaparTexto(orden.cliente) + "</td>";
    html += '<td><span class="' + clase + '">' + orden.estado + "</span></td>";
    html += "<td>" + formatearPrecio(orden.total) + "</td>";
    html += "</tr>";
  }

  cuerpo.innerHTML = html;
}


document.addEventListener("DOMContentLoaded", function () {
  // este archivo se carga en todas las paginas, pero solo trabaja en el admin
  if (!document.body.classList.contains("es-admin")) {
    return;
  }

  iniciarResumen();
  iniciarTablaProductos();
  iniciarFormProducto();
  iniciarTablaUsuarios();
  iniciarFormUsuario();
  iniciarTablaOrdenes();
  mostrarAvisoDeLaUrl();
});