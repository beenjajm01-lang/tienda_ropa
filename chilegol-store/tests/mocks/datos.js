// MOCKS: datos falsos que invento solo para las pruebas.
// Así las pruebas no dependen de los productos reales de la tienda:
// si mañana cambio un precio en src/data/productos.js, las pruebas siguen pasando.

export const mockCategorias = [
  { id: 1, nombre: 'Mock FC', descripcion: 'Club de prueba', colores: ['#000000', '#ffffff'] },
  { id: 2, nombre: 'Deportes Mock', descripcion: 'Otro club de prueba', colores: ['#ff0000', '#0000ff'] },
];

export const mockProductos = [
  {
    id: 1,
    nombre: 'Camiseta Mock Oferta',
    precio: 50000,
    precioOferta: 40000,
    enOferta: true,
    stock: 10,
    categoria: 'Mock FC',
    imagen: '/images/goku-colocolo.webp',
    descripcion: 'Producto falso en oferta',
    tallas: ['S', 'M', 'L'],
  },
  {
    id: 2,
    nombre: 'Camiseta Mock Local',
    precio: 52990,
    enOferta: false,
    stock: 5,
    categoria: 'Mock FC',
    imagen: '/images/goku-udechile.webp',
    descripcion: 'Producto falso sin oferta',
    tallas: ['M', 'L'],
  },
  {
    id: 3,
    nombre: 'Camiseta Mock Visita',
    precio: 30000,
    enOferta: false,
    stock: 8,
    categoria: 'Deportes Mock',
    imagen: '/images/chile-visita.svg',
    descripcion: 'Producto falso de otra categoría',
    tallas: ['M'],
  },
];

// Carrito de prueba:
//   1 x Camiseta Mock Oferta (precio de oferta $40.000)
//   2 x Camiseta Mock Local  ($52.990 c/u)
//   Total esperado: 40.000 + 105.980 = $145.980
// Es una función para que cada prueba reciba un carrito nuevo.
export function crearCarritoMock() {
  return [
    { clave: '1-M', ...mockProductos[0], talla: 'M', cantidad: 1 },
    { clave: '2-L', ...mockProductos[1], talla: 'L', cantidad: 2 },
  ];
}

// Respuesta falsa del servicio de pago cuando el banco rechaza
export const mockPagoRechazado = {
  aprobado: false,
  motivo: 'Tarjeta rechazada por el banco (mock)',
};
