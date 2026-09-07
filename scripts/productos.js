// productos.js - pinta el catalogo, el detalle del producto y el carrito

var cuponAplicado = "";

// devuelve el texto y la clase del stock segun cuanto queda
function textoStock(producto) {
  if (producto.stock <= 0) {
    return { texto: "Sin stock", clase: "caluga__stock caluga__stock--agotado" };
  }
  if (producto.stockCritico !== "" && producto.stock <= producto.stockCritico) {
    return { texto: "Últimas " + producto.stock + " unidades", clase: "caluga__stock caluga__stock--critico" };
  }
  return { texto: producto.stock + " disponibles", clase: "caluga__stock" };
}

// arma el html de una tarjeta de producto
function htmlProducto(producto) {
  var stock = textoStock(producto);
  var imagen = raizSitio() + "imagenes/" + escaparTexto(producto.imagen);
  var enlace = raizSitio() + "pages/producto.html?id=" + producto.id;
  var nombre = escaparTexto(producto.nombre);
  var categoria = escaparTexto(producto.categoria);

  var boton;
  if (producto.stock <= 0) {
    boton = '<button class="boton boton--principal boton--ancho boton--pequeno" type="button" disabled>Sin stock</button>';
  } else {
    boton = '<button class="boton boton--principal boton--ancho boton--pequeno" type="button" data-agregar="' + producto.id + '">Agregar al carrito</button>';
  }

  var html = '<article class="caluga">';
  html += '<figure class="caluga__figura">';
  html += '<img src="' + imagen + '" alt="' + nombre + ', categoría ' + categoria + '" loading="lazy" width="400" height="400">';
  html += '</figure>';
  html += '<div class="caluga__cuerpo">';
  html += '<p class="caluga__categoria">' + categoria + '</p>';
  html += '<h3 class="caluga__nombre"><a href="' + enlace + '">' + nombre + '</a></h3>';
  html += '<p class="caluga__precio">' + formatearPrecio(producto.precio) + '</p>';
  html += '<p class="' + stock.clase + '">' + stock.texto + '</p>';
  html += '</div>';
  html += '<div class="caluga__acciones">' + boton + '</div>';
  html += '</article>';

  return html;
}

function pintarProductos(contenedor, lista) {
  if (lista.length === 0) {
    contenedor.innerHTML = '<p class="aviso aviso--precaucion">No hay productos en esta categoría.</p>';
    return;
  }

  var html = "";
  for (var i = 0; i < lista.length; i++) {
    html = html + htmlProducto(lista[i]);
  }
  contenedor.innerHTML = html;
}

// un solo click para todas las tarjetas del contenedor
function conectarBotonesAgregar(contenedor) {
  contenedor.addEventListener("click", function (evento) {
    var boton = evento.target.closest("[data-agregar]");
    if (!boton) {
      return;
    }
    var id = Number(boton.getAttribute("data-agregar"));
    var resultado = agregarAlCarrito(id, 1);
    mostrarAviso(resultado.mensaje, !resultado.ok);
  });
}


// ---------- portada ----------

function iniciarDestacados() {
  var contenedor = document.querySelector("[data-destacados]");
  if (!contenedor) {
    return;
  }

  var todos = obtenerProductos();
  var primeros = [];
  for (var i = 0; i < todos.length && i < 4; i++) {
    primeros.push(todos[i]);
  }

  pintarProductos(contenedor, primeros);
  conectarBotonesAgregar(contenedor);
}


// ---------- catalogo con filtro ----------

function iniciarCatalogo() {
  var contenedor = document.querySelector("[data-catalogo]");
  if (!contenedor) {
    return;
  }

  var filtros = document.querySelector("[data-filtros]");
  var todos = obtenerProductos();
  var categoriaActiva = "Todas";

  function aplicarFiltro() {
    var lista = [];
    for (var i = 0; i < todos.length; i++) {
      if (categoriaActiva === "Todas" || todos[i].categoria === categoriaActiva) {
        lista.push(todos[i]);
      }
    }

    pintarProductos(contenedor, lista);

    var conteo = document.querySelector("[data-conteo-catalogo]");
    if (conteo) {
      if (lista.length === 1) {
        conteo.textContent = "1 producto";
      } else {
        conteo.textContent = lista.length + " productos";
      }
    }
  }

  // botones de categoria: "Todas" mas las del arreglo de datos
  if (filtros) {
    var opciones = ["Todas"];
    for (var j = 0; j < categorias.length; j++) {
      opciones.push(categorias[j]);
    }

    var html = "";
    for (var k = 0; k < opciones.length; k++) {
      var activo = "false";
      if (opciones[k] === categoriaActiva) {
        activo = "true";
      }
      html += '<button class="filtros__boton" type="button" aria-pressed="' + activo + '" data-categoria="' + escaparTexto(opciones[k]) + '">' + escaparTexto(opciones[k]) + '</button>';
    }
    filtros.innerHTML = html;

    filtros.addEventListener("click", function (evento) {
      var boton = evento.target.closest("[data-categoria]");
      if (!boton) {
        return;
      }
      categoriaActiva = boton.getAttribute("data-categoria");

      var botones = filtros.querySelectorAll("button");
      for (var m = 0; m < botones.length; m++) {
        if (botones[m] === boton) {
          botones[m].setAttribute("aria-pressed", "true");
        } else {
          botones[m].setAttribute("aria-pressed", "false");
        }
      }

      aplicarFiltro();
    });
  }

  aplicarFiltro();
  conectarBotonesAgregar(contenedor);
}


// ---------- detalle del producto ----------

function iniciarDetalle() {
  var zona = document.querySelector("[data-detalle]");
  if (!zona) {
    return;
  }

  var producto = buscarProducto(obtenerParametro("id"));

  if (!producto) {
    zona.innerHTML = '<div class="vacio">' +
      '<h2>No encontramos ese producto</h2>' +
      '<p>Puede que haya salido del catálogo.</p>' +
      '<a class="boton boton--principal" href="productos.html">Ver todos los productos</a>' +
      '</div>';
    return;
  }

  document.title = producto.nombre + " · ChileGol Store";

  var miga = document.querySelector("[data-miga-producto]");
  if (miga) {
    miga.textContent = producto.nombre;
  }

  document.querySelector("[data-campo=nombre]").textContent = producto.nombre;
  document.querySelector("[data-campo=precio]").textContent = formatearPrecio(producto.precio);
  document.querySelector("[data-campo=codigo]").textContent = producto.codigo;
  document.querySelector("[data-campo=categoria]").textContent = producto.categoria;
  document.querySelector("[data-campo=stock]").textContent = textoStock(producto).texto;

  if (producto.descripcion) {
    document.querySelector("[data-campo=descripcion]").textContent = producto.descripcion;
  } else {
    document.querySelector("[data-campo=descripcion]").textContent = "Este producto todavía no tiene descripción.";
  }

  var imagen = document.querySelector("[data-campo=imagen]");
  imagen.src = raizSitio() + "imagenes/" + producto.imagen;
  imagen.alt = producto.nombre + " en detalle";

  var cantidad = document.getElementById("cantidad");
  if (producto.stock > 0) {
    cantidad.max = producto.stock;
  } else {
    cantidad.max = 1;
  }

  var boton = document.querySelector("[data-agregar-detalle]");
  if (producto.stock <= 0) {
    boton.disabled = true;
    boton.textContent = "Sin stock";
    cantidad.disabled = true;
  }

  boton.addEventListener("click", function () {
    var resultado = agregarAlCarrito(producto.id, cantidad.value);
    mostrarAviso(resultado.mensaje, !resultado.ok);
  });

  // productos de la misma categoria, sin repetir el que estamos viendo
  var zonaRelacionados = document.querySelector("[data-relacionados]");
  if (zonaRelacionados) {
    var todos = obtenerProductos();
    var relacionados = [];
    for (var i = 0; i < todos.length; i++) {
      if (todos[i].categoria === producto.categoria && todos[i].id !== producto.id && relacionados.length < 4) {
        relacionados.push(todos[i]);
      }
    }

    if (relacionados.length > 0) {
      pintarProductos(zonaRelacionados, relacionados);
      conectarBotonesAgregar(zonaRelacionados);
    } else {
      zonaRelacionados.closest("section").hidden = true;
    }
  }
}


// ---------- carrito ----------

function htmlLineaCarrito(item) {
  var producto = buscarProducto(item.id);
  var tope = item.cantidad;
  if (producto) {
    tope = producto.stock;
  }

  var nombre = escaparTexto(item.nombre);
  var imagen = raizSitio() + "imagenes/" + escaparTexto(item.imagen);

  var masDeshabilitado = "";
  if (item.cantidad >= tope) {
    masDeshabilitado = ' disabled title="No queda más stock de este producto."';
  }

  var html = '<article class="linea">';
  html += '<figure class="linea__figura"><img src="' + imagen + '" alt="' + nombre + '" width="110" height="110"></figure>';
  html += '<div class="linea__cuerpo">';
  html += '<h3 class="linea__nombre">' + nombre + '</h3>';
  html += '<p class="linea__precio">' + formatearPrecio(item.precio) + ' c/u</p>';
  html += '<p class="linea__subtotal">Subtotal: ' + formatearPrecio(item.precio * item.cantidad) + '</p>';
  html += '<div class="cantidad">';
  html += '<button type="button" data-menos="' + item.id + '" aria-label="Quitar una unidad de ' + nombre + '">−</button>';
  html += '<output aria-label="Cantidad de ' + nombre + '">' + item.cantidad + '</output>';
  html += '<button type="button" data-mas="' + item.id + '" aria-label="Agregar una unidad de ' + nombre + '"' + masDeshabilitado + '>+</button>';
  html += '</div>';
  html += '</div>';
  html += '<button class="boton boton--peligro boton--pequeno" type="button" data-quitar="' + item.id + '">Quitar</button>';
  html += '</article>';

  return html;
}

function pintarResumenCarrito() {
  var resumen = document.querySelector("[data-carrito-resumen]");
  if (!resumen) {
    return;
  }

  var totales = calcularTotales(cuponAplicado);

  var html = "<h2>Resumen</h2>";
  html += '<div class="resumen__fila"><span>' + totales.unidades + ' unidades</span><span>' + formatearPrecio(totales.subtotal) + '</span></div>';

  if (totales.descuento > 0) {
    html += '<div class="resumen__fila"><span>Descuento ' + escaparTexto(cuponAplicado) + '</span><span>−' + formatearPrecio(totales.descuento) + '</span></div>';
  }

  if (totales.despacho === 0) {
    html += '<div class="resumen__fila"><span>Despacho</span><span>Gratis</span></div>';
  } else {
    html += '<div class="resumen__fila"><span>Despacho</span><span>' + formatearPrecio(totales.despacho) + '</span></div>';
  }

  html += '<div class="resumen__total"><span>Total</span><span>' + formatearPrecio(totales.total) + '</span></div>';

  if (totales.unidades === 0) {
    html += '<button class="boton boton--principal boton--ancho" type="button" data-pagar disabled>Pagar</button>';
  } else {
    html += '<button class="boton boton--principal boton--ancho" type="button" data-pagar>Pagar</button>';
  }

  resumen.innerHTML = html;
}

function pintarCarrito() {
  var lista = document.querySelector("[data-carrito-lista]");
  if (!lista) {
    return;
  }

  var items = leerCarrito();

  if (items.length === 0) {
    lista.innerHTML = '<div class="vacio">' +
      '<h2>Tu carrito está vacío</h2>' +
      '<p>Agrega productos del catálogo para verlos aquí.</p>' +
      '<a class="boton boton--principal" href="productos.html">Ir al catálogo</a>' +
      '</div>';
  } else {
    var html = "";
    for (var i = 0; i < items.length; i++) {
      html = html + htmlLineaCarrito(items[i]);
    }
    lista.innerHTML = html;
  }

  pintarResumenCarrito();
}

function iniciarCarrito() {
  var lista = document.querySelector("[data-carrito-lista]");
  if (!lista) {
    return;
  }

  // los botones se crean con innerHTML, asi que escuchamos el click en el padre
  lista.addEventListener("click", function (evento) {
    var menos = evento.target.closest("[data-menos]");
    if (menos) {
      cambiarCantidad(Number(menos.getAttribute("data-menos")), -1);
      pintarCarrito();
      return;
    }

    var mas = evento.target.closest("[data-mas]");
    if (mas) {
      cambiarCantidad(Number(mas.getAttribute("data-mas")), 1);
      pintarCarrito();
      return;
    }

    var quitar = evento.target.closest("[data-quitar]");
    if (quitar) {
      eliminarDelCarrito(Number(quitar.getAttribute("data-quitar")));
      pintarCarrito();
    }
  });

  var resumen = document.querySelector("[data-carrito-resumen]");
  resumen.addEventListener("click", function (evento) {
    if (!evento.target.closest("[data-pagar]")) {
      return;
    }
    var totales = calcularTotales(cuponAplicado);
    mostrarAviso("Pago simulado por " + formatearPrecio(totales.total) + ". El carrito quedó vacío.");
    cuponAplicado = "";
    vaciarCarrito();
    pintarCarrito();
  });

  var aplicar = document.querySelector("[data-aplicar-cupon]");
  var cupon = document.getElementById("cupon");
  if (aplicar && cupon) {
    aplicar.addEventListener("click", function () {
      var codigo = cupon.value.trim().toUpperCase();
      if (CUPONES[codigo]) {
        cuponAplicado = codigo;
        mostrarAviso("Cupón " + codigo + " aplicado.");
      } else {
        cuponAplicado = "";
        mostrarAviso("Ese cupón no es válido. Prueba con HINCHA10.", true);
      }
      pintarResumenCarrito();
    });
  }

  var botonVaciar = document.querySelector("[data-vaciar]");
  if (botonVaciar) {
    botonVaciar.addEventListener("click", function () {
      cuponAplicado = "";
      vaciarCarrito();
      pintarCarrito();
    });
  }

  pintarCarrito();
}


document.addEventListener("DOMContentLoaded", function () {
  iniciarDestacados();
  iniciarCatalogo();
  iniciarDetalle();
  iniciarCarrito();
});