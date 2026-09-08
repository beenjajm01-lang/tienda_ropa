// productos.js - muestra el catalogo, el detalle y el carrito

// texto y color segun el stock que queda
function textoStock(producto) {
  if (producto.stock <= 0) {
    return { texto: "Sin stock", clase: "caluga__stock caluga__stock--agotado" };
  }
  if (producto.stockCritico !== "" && producto.stock <= producto.stockCritico) {
    return { texto: "Últimas " + producto.stock + " unidades", clase: "caluga__stock caluga__stock--critico" };
  }
  return { texto: producto.stock + " disponibles", clase: "caluga__stock" };
}

function htmlProducto(producto) {
  const stock = textoStock(producto);
  const imagen = raizSitio() + "images/" + escaparTexto(producto.imagen);
  const nombre = escaparTexto(producto.nombre);

  let boton;
  if (producto.stock <= 0) {
    boton = '<button class="boton boton--principal boton--ancho boton--pequeno" type="button" disabled>Sin stock</button>';
  } else {
    boton = '<button class="boton boton--principal boton--ancho boton--pequeno" type="button" data-agregar="' + producto.id + '">Agregar al carrito</button>';
  }

  let html = '<article class="caluga">';
  html += '<figure class="caluga__figura"><img src="' + imagen + '" alt="' + nombre + '" width="400" height="400"></figure>';
  html += '<div class="caluga__cuerpo">';
  html += '<p class="caluga__categoria">' + escaparTexto(producto.categoria) + '</p>';
  html += '<h3 class="caluga__nombre"><a href="detalle-producto.html?id=' + producto.id + '">' + nombre + '</a></h3>';
  html += '<p class="caluga__precio">' + formatearPrecio(producto.precio) + '</p>';
  html += '<p class="' + stock.clase + '">' + stock.texto + '</p>';
  html += '</div>';
  html += '<div class="caluga__acciones">' + boton + '</div>';
  html += '</article>';
  return html;
}

function pintarProductos(contenedor, lista) {
  let html = "";
  for (let i = 0; i < lista.length; i++) {
    html = html + htmlProducto(lista[i]);
  }
  contenedor.innerHTML = html;
}

// un solo click para todas las tarjetas
function conectarBotonesAgregar(contenedor) {
  contenedor.addEventListener("click", function (evento) {
    const boton = evento.target.closest("[data-agregar]");
    if (!boton) {
      return;
    }
    const resultado = agregarAlCarrito(Number(boton.dataset.agregar), 1);
    mostrarAviso(resultado.mensaje, !resultado.ok);
  });
}

// los 4 destacados del home
function iniciarDestacados() {
  const contenedor = document.querySelector("[data-destacados]");
  if (!contenedor) {
    return;
  }

  const todos = obtenerProductos();
  const primeros = [];
  for (let i = 0; i < todos.length && i < 4; i++) {
    primeros.push(todos[i]);
  }

  pintarProductos(contenedor, primeros);
  conectarBotonesAgregar(contenedor);
}

function iniciarCatalogo() {
  const contenedor = document.querySelector("[data-catalogo]");
  if (!contenedor) {
    return;
  }
  pintarProductos(contenedor, obtenerProductos());
  conectarBotonesAgregar(contenedor);
}

function iniciarDetalle() {
  const zona = document.querySelector("[data-detalle]");
  if (!zona) {
    return;
  }

  const producto = buscarProducto(obtenerParametro("id"));

  if (!producto) {
    zona.innerHTML = '<div class="vacio"><h2>No encontramos ese producto</h2>' +
      '<a class="boton boton--principal" href="productos.html">Ver todos los productos</a></div>';
    return;
  }

  document.title = producto.nombre + " · ChileGol Store";
  document.querySelector("[data-miga-producto]").textContent = producto.nombre;
  document.querySelector("[data-campo=nombre]").textContent = producto.nombre;
  document.querySelector("[data-campo=precio]").textContent = formatearPrecio(producto.precio);
  document.querySelector("[data-campo=codigo]").textContent = producto.codigo;
  document.querySelector("[data-campo=categoria]").textContent = producto.categoria;
  document.querySelector("[data-campo=stock]").textContent = textoStock(producto).texto;

  if (producto.descripcion) {
    document.querySelector("[data-campo=descripcion]").textContent = producto.descripcion;
  } else {
    document.querySelector("[data-campo=descripcion]").textContent = "Sin descripción.";
  }

  const imagen = document.querySelector("[data-campo=imagen]");
  imagen.src = raizSitio() + "images/" + producto.imagen;
  imagen.alt = producto.nombre;

  const cantidad = document.getElementById("cantidad");
  const boton = document.querySelector("[data-agregar-detalle]");

  if (producto.stock <= 0) {
    boton.disabled = true;
    boton.textContent = "Sin stock";
    cantidad.disabled = true;
  } else {
    cantidad.max = producto.stock;
  }

  boton.addEventListener("click", function () {
    const resultado = agregarAlCarrito(producto.id, cantidad.value);
    mostrarAviso(resultado.mensaje, !resultado.ok);
  });
}

function htmlLineaCarrito(item) {
  const producto = buscarProducto(item.id);
  let tope = item.cantidad;
  if (producto) {
    tope = producto.stock;
  }

  const nombre = escaparTexto(item.nombre);
  const imagen = raizSitio() + "images/" + escaparTexto(item.imagen);

  let masApagado = "";
  if (item.cantidad >= tope) {
    masApagado = " disabled";
  }

  let html = '<article class="linea">';
  html += '<figure class="linea__figura"><img src="' + imagen + '" alt="' + nombre + '" width="110" height="110"></figure>';
  html += '<div class="linea__cuerpo">';
  html += '<h3 class="linea__nombre">' + nombre + '</h3>';
  html += '<p class="linea__precio">' + formatearPrecio(item.precio) + ' c/u</p>';
  html += '<p class="linea__subtotal">Subtotal: ' + formatearPrecio(item.precio * item.cantidad) + '</p>';
  html += '<div class="cantidad">';
  html += '<button type="button" data-menos="' + item.id + '" aria-label="Quitar una unidad de ' + nombre + '">−</button>';
  html += '<output>' + item.cantidad + '</output>';
  html += '<button type="button" data-mas="' + item.id + '" aria-label="Agregar una unidad de ' + nombre + '"' + masApagado + '>+</button>';
  html += '</div></div>';
  html += '<button class="boton boton--peligro boton--pequeno" type="button" data-quitar="' + item.id + '">Quitar</button>';
  html += '</article>';
  return html;
}

function pintarCarrito() {
  const lista = document.querySelector("[data-carrito-lista]");
  if (!lista) {
    return;
  }

  const items = leerCarrito();

  if (items.length === 0) {
    lista.innerHTML = '<div class="vacio"><h2>Tu carrito está vacío</h2>' +
      '<a class="boton boton--principal" href="productos.html">Ir al catálogo</a></div>';
  } else {
    let html = "";
    for (let i = 0; i < items.length; i++) {
      html = html + htmlLineaCarrito(items[i]);
    }
    lista.innerHTML = html;
  }

  const total = calcularTotal();
  const resumen = document.querySelector("[data-carrito-resumen]");
  let htmlResumen = "<h2>Resumen</h2>";
  htmlResumen += '<div class="resumen__fila"><span>' + contarCarrito() + ' unidades</span><span>' + formatearPrecio(total) + '</span></div>';
  htmlResumen += '<div class="resumen__total"><span>Total</span><span>' + formatearPrecio(total) + '</span></div>';
  if (items.length === 0) {
    htmlResumen += '<button class="boton boton--principal boton--ancho" type="button" data-pagar disabled>Pagar</button>';
  } else {
    htmlResumen += '<button class="boton boton--principal boton--ancho" type="button" data-pagar>Pagar</button>';
  }
  resumen.innerHTML = htmlResumen;
}

function iniciarCarrito() {
  const lista = document.querySelector("[data-carrito-lista]");
  if (!lista) {
    return;
  }

  // los botones se crean con innerHTML, por eso escucho el click en el padre
  lista.addEventListener("click", function (evento) {
    const menos = evento.target.closest("[data-menos]");
    if (menos) {
      cambiarCantidad(Number(menos.dataset.menos), -1);
      pintarCarrito();
      return;
    }

    const mas = evento.target.closest("[data-mas]");
    if (mas) {
      cambiarCantidad(Number(mas.dataset.mas), 1);
      pintarCarrito();
      return;
    }

    const quitar = evento.target.closest("[data-quitar]");
    if (quitar) {
      eliminarDelCarrito(Number(quitar.dataset.quitar));
      pintarCarrito();
    }
  });

  document.querySelector("[data-carrito-resumen]").addEventListener("click", function (evento) {
    if (!evento.target.closest("[data-pagar]")) {
      return;
    }
    mostrarAviso("Pago simulado por " + formatearPrecio(calcularTotal()) + ".");
    vaciarCarrito();
    pintarCarrito();
  });

  document.querySelector("[data-vaciar]").addEventListener("click", function () {
    vaciarCarrito();
    pintarCarrito();
  });

  pintarCarrito();
}

document.addEventListener("DOMContentLoaded", function () {
  iniciarDestacados();
  iniciarCatalogo();
  iniciarDetalle();
  iniciarCarrito();
});
