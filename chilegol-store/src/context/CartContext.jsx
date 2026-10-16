// Contexto del carrito.
// Un "contexto" es como una bolsa compartida: cualquier componente de la tienda
// puede sacar el carrito de aquí sin que se lo pasen por props de componente en componente.

import { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react';
import { leerDatos, guardarDatos } from '../services/storage';
import { calcularTotal, calcularTotalSinDescuento, contarUnidades, tallaPorDefecto } from '../utils/precios';

const CLAVE = 'chilegol_carrito';

const CartContext = createContext(null);

// El reducer recibe el carrito actual y una acción, y devuelve el carrito nuevo.
// Nunca modifica la lista original: siempre crea una nueva (así React detecta el cambio).
export function carritoReducer(items, accion) {
  switch (accion.tipo) {
    case 'agregar': {
      const { producto, talla, cantidad = 1 } = accion;
      const clave = `${producto.id}-${talla}`;
      const existente = items.find((item) => item.clave === clave);

      if (existente) {
        return items.map((item) =>
          item.clave === clave
            ? { ...item, cantidad: Math.min(item.cantidad + cantidad, item.stock) }
            : item
        );
      }

      return [
        ...items,
        {
          clave,
          id: producto.id,
          nombre: producto.nombre,
          imagen: producto.imagen,
          categoria: producto.categoria,
          precio: producto.precio,
          precioOferta: producto.precioOferta,
          enOferta: producto.enOferta,
          stock: producto.stock,
          talla,
          cantidad: Math.min(cantidad, producto.stock),
        },
      ];
    }

    case 'aumentar':
      return items.map((item) =>
        item.clave === accion.clave && item.cantidad < item.stock
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );

    case 'disminuir':
      return items.map((item) =>
        item.clave === accion.clave && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      );

    case 'eliminar':
      return items.filter((item) => item.clave !== accion.clave);

    case 'vaciar':
      return [];

    default:
      return items;
  }
}

// itemsIniciales sirve para las pruebas: permite partir con un carrito "mock"
export function CartProvider({ children, itemsIniciales }) {
  const [items, dispatch] = useReducer(
    carritoReducer,
    itemsIniciales,
    (inicial) => inicial ?? leerDatos(CLAVE, [])
  );

  // Mensaje corto que aparece al agregar algo ("Agregaste ... al carrito")
  const [aviso, setAviso] = useState(null);
  // useCallback hace que la función sea siempre la misma (el temporizador del aviso depende de ella)
  const cerrarAviso = useCallback(() => setAviso(null), []);

  // Cada vez que cambia el carrito, lo guardo en el navegador
  useEffect(() => {
    guardarDatos(CLAVE, items);
  }, [items]);

  function agregar(producto, talla, cantidad = 1) {
    if (producto.stock <= 0) return;
    dispatch({ tipo: 'agregar', producto, talla, cantidad });
    setAviso({ id: Date.now(), texto: `${producto.nombre} (talla ${talla})` });
  }

  const valor = {
    items,
    agregar,
    aumentar: (clave) => dispatch({ tipo: 'aumentar', clave }),
    disminuir: (clave) => dispatch({ tipo: 'disminuir', clave }),
    eliminar: (clave) => dispatch({ tipo: 'eliminar', clave }),
    vaciar: () => dispatch({ tipo: 'vaciar' }),
    total: calcularTotal(items),
    totalSinDescuento: calcularTotalSinDescuento(items),
    cantidadTotal: contarUnidades(items),
    aviso,
    cerrarAviso,
  };

  return <CartContext.Provider value={valor}>{children}</CartContext.Provider>;
}

// Hook para usar el carrito desde cualquier componente: const { items } = useCart();
export function useCart() {
  const contexto = useContext(CartContext);
  if (!contexto) {
    throw new Error('useCart debe usarse dentro de <CartProvider>');
  }
  return contexto;
}

// Para el botón "Agregar al carrito" de las tarjetas: agrega una unidad
// con la talla por defecto (M). En el detalle del producto se elige la talla.
export function useAgregarRapido() {
  const { agregar } = useCart();
  return (producto) => agregar(producto, tallaPorDefecto(producto));
}
