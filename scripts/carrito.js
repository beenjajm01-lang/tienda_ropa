// carrito.js - el carrito se guarda en el localStorage

function leerCarrito() {
  const items = leerDeStorage(CLAVE_CARRITO, []);
  if (!Array.isArray(items)) {
    return [];
  }
  return items;
}

function guardarCarrito(items) {
  guardarEnStorage(CLAVE_CARRITO, items);
  actualizarContadorCarrito();
}

function buscarLineaCarrito(items, id) {
  for (let i = 0; i < items.length; i++) {
    if (items[i].id === id) {
      return items[i];
    }
  }
  return null;
}

// el stock lo miramos en el catalogo, no en el carrito
function agregarAlCarrito(id, cantidad) {
  let pedidas = parseInt(cantidad, 10);
  if (isNaN(pedidas) || pedidas < 1) {
    pedidas = 1;
  }

  const producto = buscarProducto(id);
  if (!producto) {
    return { ok: false, mensaje: "El producto ya no está disponible." };
  }
  if (producto.stock <= 0) {
    return { ok: false, mensaje: "Sin stock disponible." };
  }

  const items = leerCarrito();
  const linea = buscarLineaCarrito(items, producto.id);
  let enCarrito = 0;
  if (linea) {
    enCarrito = linea.cantidad;
  }

  if (enCarrito >= producto.stock) {
    return { ok: false, mensaje: "Ya tienes las " + producto.stock + " unidades disponibles en el carrito." };
  }

  let nuevaCantidad = enCarrito + pedidas;
  if (nuevaCantidad > producto.stock) {
    nuevaCantidad = producto.stock;
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
  return { ok: true, mensaje: producto.nombre + " agregado al carrito." };
}

// suma o resta una unidad, si llega a 0 se borra la linea
function cambiarCantidad(id, cambio) {
  const items = leerCarrito();
  const producto = buscarProducto(id);
  let tope = 0;
  if (producto) {
    tope = producto.stock;
  }

  const nuevos = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
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
  const items = leerCarrito();
  const nuevos = [];
  for (let i = 0; i < items.length; i++) {
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
  const items = leerCarrito();
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total = total + items[i].cantidad;
  }
  return total;
}

// sumamos el total recorriendo el carrito
function calcularTotal() {
  const items = leerCarrito();
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total = total + items[i].precio * items[i].cantidad;
  }
  return total;
}

// el numerito del menu
function actualizarContadorCarrito() {
  const total = contarCarrito();
  const marcas = document.querySelectorAll("[data-carrito-conteo]");
  for (let i = 0; i < marcas.length; i++) {
    marcas[i].textContent = total;
  }
}
