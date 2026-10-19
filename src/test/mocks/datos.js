// MOCKS: datos falsos que se inventan solo para las pruebas.
// Así las pruebas no dependen de los productos reales: si mañana cambia un precio
// en src/data/products.js, las pruebas siguen pasando.

export const mockProductos = [
  {
    id: 1,
    codigo: 'MOCK-01',
    nombre: 'Camiseta Mock Local',
    descripcion: 'Producto de prueba del club Mock FC',
    precio: 49990,
    stock: 10,
    stockCritico: 3,
    categoria: 'Camisetas',
    imagen: '/images/goku-colocolo.webp',
  },
  {
    id: 2,
    codigo: 'MOCK-02',
    nombre: 'Camiseta Mock Visita',
    descripcion: 'Otra camiseta de prueba, edición Wanderers',
    precio: 39990,
    stock: 2,
    stockCritico: 3,
    categoria: 'Camisetas',
    imagen: '/images/krilin-wanderers.webp',
  },
  {
    id: 3,
    codigo: 'MOCK-03',
    nombre: 'Short Mock',
    descripcion: 'Short de prueba',
    precio: 19990,
    stock: 0,
    stockCritico: 2,
    categoria: 'Shorts',
    imagen: '/images/sin-imagen.svg',
  },
];

// Carrito de prueba: 2 x $49.990 + 1 x $39.990 = $139.970
// Es una función para que cada prueba reciba un carrito nuevo
export function crearCarritoMock() {
  return [
    { ...mockProductos[0], cantidad: 2 },
    { ...mockProductos[1], cantidad: 1 },
  ];
}

// Sesión falsa de un administrador (lo que guarda users.js al iniciar sesión)
export const mockSesionAdmin = {
  id: 1,
  nombre: 'Admin Mock',
  correo: 'admin@duoc.cl',
  rol: 'Administrador',
};
