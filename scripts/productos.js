// productos.js - renderizado de catalogo, detalle y carrito

function htmlProducto(producto) {
  const imagen = raizSitio() + "images/" + producto.imagen;
  const enlaceDetalle = raizSitio() + "pages/detalle-producto.html?id=" + producto.id;
  let boton = `<button class="boton boton--principal boton--ancho boton--pequeno" type="button" data-agregar="${producto.id}">Agregar al carrito</button>`;

  if (producto.stock <= 0) {
    boton = `<button class="boton boton--principal boton--ancho boton--pequeno" type="button" disabled>Sin stock</button>`;
  }

  return `
    <article class="caluga">
      <figure class="caluga__figura">
        <img src="${imagen}" alt="${producto.nombre}" width="400" height="400">
      </figure>
      <div class="caluga__cuerpo">
        <p class="caluga__categoria">${producto.categoria}</p>
        <h3 class="caluga__nombre">
          <a href="${enlaceDetalle}">${producto.nombre}</a>
        </h3>
        <p class="caluga__precio">${formatearPrecio(producto.precio)}</p>
        <p class="caluga__stock">${producto.stock} disponibles</p>
      </div>
      <div class="caluga__acciones">${boton}</div>
    </article>
  `;
}

function pintarProductos(contenedor, lista) {
  let html = "";
  for (let i = 0; i < lista.length; i++) {
    html += htmlProducto(lista[i]);
  }
  contenedor.innerHTML = html;
}

function conectarBotonesAgregar(contenedor) {
  contenedor.addEventListener("click", function (evento) {
    const boton = evento.target.closest("[data-agregar]");
    if (!boton) return;

    const id = Number(boton.dataset.agregar);
    const resultado = agregarAlCarrito(id, 1);
    mostrarAviso(resultado.mensaje, !resultado.ok);
  });
}

function iniciarDestacados() {
  const contenedor = document.querySelector("[data-destacados]");
  if (!contenedor) return;

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
  if (!contenedor) return;

  pintarProductos(contenedor, obtenerProductos());
  conectarBotonesAgregar(contenedor);
}

function iniciarDetalle() {
  const zona = document.querySelector("[data-detalle]");
  if (!zona) return;

  const producto = buscarProducto(obtenerParametro("id"));

  if (!producto) {
    zona.innerHTML = `
      <div class="vacio">
        <h2>No encontramos ese producto</h2>
        <a class="boton boton--principal" href="${raizSitio()}pages/productos.html">Ver todos los productos</a>
      </div>
    `;
    return;
  }

  document.title = producto.nombre + " · ChileGol Store";
  const campoNombre = document.querySelector("[data-campo=nombre]");
  if (campoNombre) campoNombre.textContent = producto.nombre;

  const campoPrecio = document.querySelector("[data-campo=precio]");
  if (campoPrecio) campoPrecio.textContent = formatearPrecio(producto.precio);

  const campoCodigo = document.querySelector("[data-campo=codigo]");
  if (campoCodigo) campoCodigo.textContent = producto.codigo;

  const campoCategoria = document.querySelector("[data-campo=categoria]");
  if (campoCategoria) campoCategoria.textContent = producto.categoria;

  const campoStock = document.querySelector("[data-campo=stock]");
  if (campoStock) campoStock.textContent = producto.stock + " disponibles";

  const campoDesc = document.querySelector("[data-campo=descripcion]");
  if (campoDesc) campoDesc.textContent = producto.descripcion || "Sin descripción.";

  const imagen = document.querySelector("[data-campo=imagen]");
  if (imagen) {
    imagen.src = raizSitio() + "images/" + producto.imagen;
    imagen.alt = producto.nombre;
  }

  const cantidad = document.getElementById("cantidad");
  const boton = document.querySelector("[data-agregar-detalle]");

  if (boton) {
    if (producto.stock <= 0) {
      boton.disabled = true;
      boton.textContent = "Sin stock";
      if (cantidad) cantidad.disabled = true;
    } else {
      boton.addEventListener("click", function () {
        const cantValor = cantidad ? cantidad.value : 1;
        const resultado = agregarAlCarrito(producto.id, cantValor);
        mostrarAviso(resultado.mensaje, !resultado.ok);
      });
    }
  }
}

function htmlLineaCarrito(item) {
  const imagen = raizSitio() + "images/" + item.imagen;
  return `
    <article class="linea">
      <figure class="linea__figura">
        <img src="${imagen}" alt="${item.nombre}" width="110" height="110">
      </figure>
      <div class="linea__cuerpo">
        <h3 class="linea__nombre">${item.nombre}</h3>
        <p class="linea__precio">${formatearPrecio(item.precio)} c/u</p>
        <p class="linea__subtotal">Subtotal: ${formatearPrecio(item.precio * item.cantidad)}</p>
        <div class="cantidad">
          <button type="button" data-menos="${item.id}">−</button>
          <output>${item.cantidad}</output>
          <button type="button" data-mas="${item.id}">+</button>
        </div>
      </div>
      <button class="boton boton--peligro boton--pequeno" type="button" data-quitar="${item.id}">Quitar</button>
    </article>
  `;
}

function pintarCarrito() {
  const lista = document.querySelector("[data-carrito-lista]");
  if (!lista) return;

  const items = leerCarrito();

  if (items.length === 0) {
    lista.innerHTML = `
      <div class="vacio">
        <h2>Tu carrito está vacío</h2>
        <a class="boton boton--principal" href="${raizSitio()}pages/productos.html">Ir al catálogo</a>
      </div>
    `;
  } else {
    let html = "";
    for (let i = 0; i < items.length; i++) {
      html += htmlLineaCarrito(items[i]);
    }
    lista.innerHTML = html;
  }

  const total = calcularTotal();
  const resumen = document.querySelector("[data-carrito-resumen]");
  if (resumen) {
    resumen.innerHTML = `
      <h2>Resumen</h2>
      <div class="resumen__fila">
        <span>${contarCarrito()} unidades</span>
        <span>${formatearPrecio(total)}</span>
      </div>
      <div class="resumen__total">
        <span>Total</span>
        <span>${formatearPrecio(total)}</span>
      </div>
      <button class="boton boton--principal boton--ancho" type="button" data-pagar ${items.length === 0 ? "disabled" : ""}>
        Pagar
      </button>
    `;
  }
}

function iniciarCarrito() {
  const lista = document.querySelector("[data-carrito-lista]");
  if (!lista) return;

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

  const resumen = document.querySelector("[data-carrito-resumen]");
  if (resumen) {
    resumen.addEventListener("click", function (evento) {
      if (!evento.target.closest("[data-pagar]")) return;
      alert("Pago simulado por " + formatearPrecio(calcularTotal()) + ". ¡Gracias por tu compra!");
      vaciarCarrito();
      pintarCarrito();
    });
  }

  const btnVaciar = document.querySelector("[data-vaciar]");
  if (btnVaciar) {
    btnVaciar.addEventListener("click", function () {
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