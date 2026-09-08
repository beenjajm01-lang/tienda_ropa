// admin.js - panel de administracion: permisos y mantenedores

// lo que puede hacer cada rol
const PERMISOS = {
  Administrador: { productos: "crud", usuarios: "crud", ordenes: "lectura" },
  Vendedor: { productos: "lectura", usuarios: "ninguno", ordenes: "lectura" },
  Cliente: { productos: "ninguno", usuarios: "ninguno", ordenes: "ninguno" }
};

// revisa si el usuario puede estar en esta pagina.
// Esto es solo para la maqueta, la seguridad de verdad va en el servidor.
function protegerPanel(modulo) {
  const raiz = raizSitio();
  const usuario = obtenerSesion();

  if (!usuario) {
    window.location.replace("login.html?motivo=sesion");
    return null;
  }

  if (usuario.rol === "Cliente") {
    window.location.replace(raiz + "index.html");
    return null;
  }

  const permisos = PERMISOS[usuario.rol];

  if (modulo && permisos[modulo] === "ninguno") {
    window.location.replace("admin-home.html?motivo=permiso");
    return null;
  }

  // escondo del menu lo que el rol no puede abrir
  const opciones = document.querySelectorAll("[data-requiere]");
  for (let i = 0; i < opciones.length; i++) {
    if (permisos[opciones[i].dataset.requiere] === "ninguno") {
      opciones[i].style.display = "none";
    }
  }

  // el vendedor no crea ni edita
  if (permisos.productos !== "crud") {
    const soloAdmin = document.querySelectorAll("[data-solo-admin]");
    for (let j = 0; j < soloAdmin.length; j++) {
      soloAdmin[j].style.display = "none";
    }
  }

  document.querySelector("[data-sesion-nombre]").textContent = usuario.nombre;
  document.querySelector("[data-sesion-rol]").textContent = usuario.rol;

  document.querySelector("[data-salir]").addEventListener("click", function (evento) {
    evento.preventDefault();
    cerrarSesion();
    window.location.href = raiz + "index.html";
  });

  return { usuario: usuario, permisos: permisos };
}

// mensajes que vienen en la url despues de guardar
function mostrarAvisoDeLaUrl() {
  if (obtenerParametro("motivo") === "permiso") {
    mostrarAviso("Tu rol no tiene acceso a ese módulo.", true);
    return;
  }
  const texto = obtenerParametro("aviso");
  if (texto) {
    mostrarAviso(texto, false);
  }
}


// ---------- home del admin ----------

function iniciarResumen() {
  const lista = document.querySelector("[data-criticos]");
  if (!lista) {
    return;
  }
  if (!protegerPanel(null)) {
    return;
  }

  // aviso de stock critico
  const productos = obtenerProductos();
  let html = "";
  for (let i = 0; i < productos.length; i++) {
    const p = productos[i];
    if (p.stockCritico !== "" && p.stock <= p.stockCritico) {
      html += "<li>" + escaparTexto(p.nombre) + " — quedan " + p.stock + " (umbral: " + p.stockCritico + ")</li>";
    }
  }

  if (html === "") {
    lista.innerHTML = '<p class="aviso">Ningún producto está bajo su umbral crítico.</p>';
  } else {
    lista.innerHTML = '<ul class="aviso aviso--precaucion">' + html + "</ul>";
  }
}


// ---------- listado de productos ----------

function iniciarTablaProductos() {
  const cuerpo = document.querySelector("[data-tabla-productos]");
  if (!cuerpo) {
    return;
  }

  const sesion = protegerPanel("productos");
  if (!sesion) {
    return;
  }

  const puedeEditar = sesion.permisos.productos === "crud";

  function pintar() {
    const productos = obtenerProductos();
    let html = "";

    for (let i = 0; i < productos.length; i++) {
      const p = productos[i];

      let estado;
      if (p.stock === 0) {
        estado = '<span class="etiqueta etiqueta--alerta">Agotado</span>';
      } else if (p.stockCritico !== "" && p.stock <= p.stockCritico) {
        estado = '<span class="etiqueta etiqueta--aviso">Stock crítico</span>';
      } else {
        estado = '<span class="etiqueta etiqueta--ok">Disponible</span>';
      }

      let acciones = '<a class="boton boton--secundario boton--pequeno" href="detalle-producto.html?id=' + p.id + '">Ver</a>';
      if (puedeEditar) {
        acciones += '<a class="boton boton--secundario boton--pequeno" href="admin-nuevo-producto.html?id=' + p.id + '">Editar</a>';
        acciones += '<button class="boton boton--peligro boton--pequeno" type="button" data-borrar="' + p.id + '">Eliminar</button>';
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

    cuerpo.innerHTML = html;
  }

  cuerpo.addEventListener("click", function (evento) {
    const boton = evento.target.closest("[data-borrar]");
    if (!boton) {
      return;
    }

    const id = Number(boton.dataset.borrar);
    if (!confirm("¿Eliminar " + buscarProducto(id).nombre + " del catálogo?")) {
      return;
    }

    const productos = obtenerProductos();
    const quedan = [];
    for (let i = 0; i < productos.length; i++) {
      if (productos[i].id !== id) {
        quedan.push(productos[i]);
      }
    }

    guardarProductos(quedan);
    pintar();
  });

  pintar();
}


// ---------- formulario de producto ----------

function iniciarFormProducto() {
  const formulario = document.querySelector("[data-form-producto]");
  if (!formulario) {
    return;
  }

  const sesion = protegerPanel("productos");
  if (!sesion) {
    return;
  }

  if (sesion.permisos.productos !== "crud") {
    window.location.replace("admin-productos.html?motivo=permiso");
    return;
  }

  const selectCategoria = document.getElementById("categoria");
  let htmlCategorias = '<option value="">-- Selecciona la categoría --</option>';
  for (let i = 0; i < categorias.length; i++) {
    htmlCategorias += '<option value="' + categorias[i] + '">' + categorias[i] + "</option>";
  }
  selectCategoria.innerHTML = htmlCategorias;

  // si viene un id en la url estamos editando
  const id = obtenerParametro("id");
  let existente = null;
  if (id) {
    existente = buscarProducto(id);
  }

  if (existente) {
    document.querySelector("[data-titulo-form]").textContent = "Editar producto";
    document.getElementById("codigo").value = existente.codigo;
    document.getElementById("nombre").value = existente.nombre;
    document.getElementById("descripcion").value = existente.descripcion;
    document.getElementById("precio").value = existente.precio;
    document.getElementById("stock").value = existente.stock;
    document.getElementById("stockCritico").value = existente.stockCritico;
    document.getElementById("categoria").value = existente.categoria;
    document.getElementById("imagen").value = existente.imagen;
  }

  conectarCampo("codigo", validarCodigoProducto);
  conectarCampo("nombre", validarNombre);
  conectarCampo("descripcion", validarDescripcion);
  conectarCampo("precio", validarPrecio);
  conectarCampo("stock", validarStock);
  conectarCampo("stockCritico", validarStockCritico);
  conectarCampo("categoria", validarCategoria);

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const revisiones = [
      validarCodigoProducto(),
      validarNombre(),
      validarDescripcion(),
      validarPrecio(),
      validarStock(),
      validarStockCritico(),
      validarCategoria()
    ];

    for (let i = 0; i < revisiones.length; i++) {
      if (revisiones[i] === false) {
        mostrarResultado(formulario, "Revisa los campos marcados antes de continuar.", true);
        enfocarPrimerError(formulario);
        return;
      }
    }

    const codigo = document.getElementById("codigo").value.trim().toUpperCase();
    const productos = obtenerProductos();

    // no puede haber dos productos con el mismo codigo
    for (let j = 0; j < productos.length; j++) {
      const esElMismo = existente && productos[j].id === existente.id;
      if (!esElMismo && productos[j].codigo.toUpperCase() === codigo) {
        mostrarResultado(formulario, "Ya existe otro producto con el código " + codigo + ".", true);
        return;
      }
    }

    const textoCritico = document.getElementById("stockCritico").value.trim();
    let stockCritico = "";
    if (textoCritico !== "") {
      stockCritico = parseInt(textoCritico, 10);
    }

    let imagen = document.getElementById("imagen").value.trim();
    if (imagen === "") {
      imagen = "camiseta-cordillera.svg";
    }

    const nuevo = {
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

    let mensaje;
    if (existente) {
      nuevo.id = existente.id;
      for (let k = 0; k < productos.length; k++) {
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

    // aviso si el stock quedo bajo el umbral critico
    if (nuevo.stockCritico !== "" && nuevo.stock <= nuevo.stockCritico) {
      mensaje += " Atención: el stock quedó en o bajo el umbral crítico.";
    }

    guardarProductos(productos);
    window.location.href = "admin-productos.html?aviso=" + encodeURIComponent(mensaje);
  });
}


// ---------- listado de usuarios ----------

function iniciarTablaUsuarios() {
  const cuerpo = document.querySelector("[data-tabla-usuarios]");
  if (!cuerpo) {
    return;
  }

  const sesion = protegerPanel("usuarios");
  if (!sesion) {
    return;
  }

  function pintar() {
    const usuarios = obtenerUsuarios();
    let html = "";

    for (let i = 0; i < usuarios.length; i++) {
      const u = usuarios[i];

      // nadie se borra a si mismo
      let borrar;
      if (u.id === sesion.usuario.id) {
        borrar = '<button class="boton boton--peligro boton--pequeno" type="button" disabled>Eliminar</button>';
      } else {
        borrar = '<button class="boton boton--peligro boton--pequeno" type="button" data-borrar="' + u.id + '">Eliminar</button>';
      }

      html += "<tr>";
      html += "<td>" + escaparTexto(u.run) + "</td>";
      html += "<td>" + escaparTexto(u.nombre + " " + u.apellidos) + "</td>";
      html += "<td>" + escaparTexto(u.correo) + "</td>";
      html += '<td><span class="etiqueta">' + escaparTexto(u.tipo) + "</span></td>";
      html += "<td>" + escaparTexto(nombreDeRegion(u.region) + " · " + u.comuna) + "</td>";
      html += '<td><div class="tabla__acciones">';
      html += '<a class="boton boton--secundario boton--pequeno" href="admin-nuevo-usuario.html?id=' + u.id + '">Editar</a>';
      html += borrar;
      html += "</div></td></tr>";
    }

    cuerpo.innerHTML = html;
  }

  cuerpo.addEventListener("click", function (evento) {
    const boton = evento.target.closest("[data-borrar]");
    if (!boton) {
      return;
    }

    const id = Number(boton.dataset.borrar);
    const usuario = buscarUsuario(id);
    if (!confirm("¿Eliminar a " + usuario.nombre + " " + usuario.apellidos + "?")) {
      return;
    }

    const usuarios = obtenerUsuarios();
    const quedan = [];
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].id !== id) {
        quedan.push(usuarios[i]);
      }
    }

    guardarUsuarios(quedan);
    pintar();
  });

  pintar();
}


// ---------- formulario de usuario ----------

function iniciarFormUsuario() {
  const formulario = document.querySelector("[data-form-usuario]");
  if (!formulario) {
    return;
  }

  const sesion = protegerPanel("usuarios");
  if (!sesion) {
    return;
  }

  const selectTipo = document.getElementById("tipo");
  let htmlRoles = '<option value="">-- Selecciona el perfil --</option>';
  for (let i = 0; i < roles.length; i++) {
    htmlRoles += '<option value="' + roles[i] + '">' + roles[i] + "</option>";
  }
  selectTipo.innerHTML = htmlRoles;

  const id = obtenerParametro("id");
  let existente = null;
  if (id) {
    existente = buscarUsuario(id);
  }

  if (existente) {
    document.querySelector("[data-titulo-form]").textContent = "Editar usuario";
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

  conectarCampo("run", validarRun);
  conectarCampo("nombre", validarNombreUsuario);
  conectarCampo("apellidos", validarApellidos);
  conectarCampo("correo", validarCorreo);
  conectarCampo("tipo", validarTipoUsuario);
  conectarCampo("region", validarRegion);
  conectarCampo("comuna", validarComuna);
  conectarCampo("direccion", validarDireccion);

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const revisiones = [
      validarRun(),
      validarNombreUsuario(),
      validarApellidos(),
      validarCorreo(),
      validarTipoUsuario(),
      validarRegion(),
      validarComuna(),
      validarDireccion()
    ];

    for (let j = 0; j < revisiones.length; j++) {
      if (revisiones[j] === false) {
        mostrarResultado(formulario, "Revisa los campos marcados antes de continuar.", true);
        enfocarPrimerError(formulario);
        return;
      }
    }

    const run = document.getElementById("run").value.trim().toUpperCase();
    const correo = document.getElementById("correo").value.trim();
    const usuarios = obtenerUsuarios();

    for (let k = 0; k < usuarios.length; k++) {
      const esElMismo = existente && usuarios[k].id === existente.id;
      if (!esElMismo && (usuarios[k].run.toUpperCase() === run || usuarios[k].correo.toLowerCase() === correo.toLowerCase())) {
        mostrarResultado(formulario, "Ya existe otro usuario con ese RUN o ese correo.", true);
        return;
      }
    }

    const nuevo = {
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

    let mensaje;
    if (existente) {
      nuevo.id = existente.id;
      nuevo.clave = existente.clave;
      for (let m = 0; m < usuarios.length; m++) {
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
    window.location.href = "admin-usuarios.html?aviso=" + encodeURIComponent(mensaje);
  });
}


// ---------- ordenes, solo lectura ----------

function iniciarTablaOrdenes() {
  const cuerpo = document.querySelector("[data-tabla-ordenes]");
  if (!cuerpo) {
    return;
  }
  if (!protegerPanel("ordenes")) {
    return;
  }

  let html = "";
  for (let i = 0; i < ordenes.length; i++) {
    const orden = ordenes[i];

    let clase = "etiqueta";
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
  // este archivo se carga en todas las paginas pero solo trabaja en el admin
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
