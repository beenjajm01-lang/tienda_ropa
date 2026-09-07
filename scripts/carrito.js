// carrito.js - el carrito se guarda completo en el localStorage

var CUPONES = { HINCHA10: 0.1, DEBUT20: 0.2 };

function leerCarrito() {
  var items = leerDeStorage(CLAVE_CARRITO, []);
  if (!Array.isArray(items)) {
    return [];
  }
  return items;
}

function guardarCarrito(items) {
  guardarEnStorage(CLAVE_CARRITO, items);
  actualizarContadorCarrito();
}

// busca una linea del carrito por el id del producto
function buscarLineaCarrito(items, id) {
  for (var i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      return items[i];
    }
  }
  return null;
}

// el stock lo miramos siempre en el catalogo, asi si el admin lo cambia
// el carrito se entera al toque
function agregarAlCarrito(id, cantidad) {
  var pedidas = parseInt(cantidad, 10);
  if (isNaN(pedidas) || pedidas < 1) {
    pedidas = 1;
  }

  var producto = buscarProducto(id);
  if (!producto) {
    return { ok: false, mensaje: "El producto ya no está disponible." };
  }
  if (producto.stock <= 0) {
    return { ok: false, mensaje: "Sin stock disponible." };
  }

  var items = leerCarrito();
  var linea = buscarLineaCarrito(items, producto.id);
  var enCarrito = 0;
  if (linea) {
    enCarrito = linea.cantidad;
  }

  if (enCarrito >= producto.stock) {
    return { ok: false, mensaje: "Ya tienes las " + producto.stock + " unidades disponibles en el carrito." };
  }

  var nuevaCantidad = enCarrito + pedidas;
  var recortado = false;
  if (nuevaCantidad > producto.stock) {
    nuevaCantidad = producto.stock;
    recortado = true;
  }

  if (linea) {
    linea.cantidad = nuevaCantidad;
  } else {
    items.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      cantidad: nuevaCantidad
    });
  }

  guardarCarrito(items);

  if (recortado) {
    return { ok: true, mensaje: "Se agregaron solo " + (nuevaCantidad - enCarrito) + " unidades: es todo el stock disponible." };
  }
  return { ok: true, mensaje: producto.nombre + " agregado al carrito." };
}

// suma o resta una unidad. Si llega a 0 se borra la linea
function cambiarCantidad(id, cambio) {
  var items = leerCarrito();
  var producto = buscarProducto(id);
  var tope = 0;
  if (producto) {
    tope = producto.stock;
  }

  var nuevos = [];
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    if (item.id === id) {
      item.cantidad = item.cantidad + cambio;
      if (item.cantidad > tope) {
        item.cantidad = tope;
      }
    }
    if (item.cantidad > 0) {
      nuevos.push(item);
    }
  }

  guardarCarrito(nuevos);
}

function eliminarDelCarrito(id) {
  var items = leerCarrito();
  var nuevos = [];
  for (var i = 0; i < items.length; i++) {
    if (items[i].id !== id) {
      nuevos.push(items[i]);
    }
  }
  guardarCarrito(nuevos);
}

function vaciarCarrito() {
  guardarCarrito([]);
}

function contarCarrito() {
  var items = leerCarrito();
  var total = 0;
  for (var i = 0; i < items.length; i++) {
    total = total + items[i].cantidad;
  }
  return total;
}

// calculamos el total del carrito con el descuento del cupon
function calcularTotales(cupon) {
  var items = leerCarrito();
  var subtotal = 0;
  var unidades = 0;

  for (var i = 0; i < items.length; i++) {
    subtotal = subtotal + items[i].precio * items[i].cantidad;
    unidades = unidades + items[i].cantidad;
  }

  var codigo = String(cupon || "").toUpperCase();
  var descuento = 0;
  if (CUPONES[codigo]) {
    descuento = Math.round(subtotal * CUPONES[codigo]);
  }

  // el despacho es gratis sobre 50 mil
  var despacho = 0;
  if (subtotal > 0 && subtotal - descuento < 50000) {
    despacho = 3990;
  }

  return {
    unidades: unidades,
    subtotal: subtotal,
    descuento: descuento,
    despacho: despacho,
    total: subtotal - descuento + despacho
  };
}

// el numerito rojo del carrito que aparece en el menu
function actualizarContadorCarrito() {
  var total = contarCarrito();
  var marcas = document.querySelectorAll("[data-carrito-conteo]");
  for (var i = 0; i < marcas.length; i++) {
    marcas[i].textContent = total;
  }
}

// si el usuario tiene otra pestaña abierta, actualizamos el contador
window.addEventListener("storage", function (evento) {
  if (evento.key === CLAVE_CARRITO) {
    actualizarContadorCarrito();
  }
});