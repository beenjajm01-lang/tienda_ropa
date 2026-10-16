// Órdenes (boletas) de ejemplo, para que el panel de administración
// tenga ventas que mostrar desde el primer día.

function item(productoId, nombre, categoria, imagen, talla, cantidad, precioUnitario, precioOriginal) {
  return { productoId, nombre, categoria, imagen, talla, cantidad, precioUnitario, precioOriginal };
}

// El total se calcula sumando precio x cantidad de cada producto
function conTotal(orden) {
  const total = orden.items.reduce((suma, i) => suma + i.precioUnitario * i.cantidad, 0);
  return { ...orden, total };
}

const ordenes = [
  {
    id: 1,
    numero: 'ORD-001',
    fecha: '2026-08-04T15:20:00',
    usuarioId: 2,
    estado: 'Entregada',
    cliente: { nombre: 'Camila', apellidos: 'Rojas Fuentes', email: 'cliente@chilegol.cl' },
    direccion: { calle: 'Av. Grecia 2001', departamento: 'Depto 504', region: 'Metropolitana de Santiago', comuna: 'Ñuñoa', indicaciones: '' },
    items: [
      item(1, 'Camiseta Colo-Colo Titular 2026', 'Colo-Colo', '/images/goku-colocolo.webp', 'M', 1, 39990, 49990),
      item(9, 'Camiseta Selección Chilena Titular 2026', 'Selección Chilena', '/images/chile-titular.svg', 'M', 1, 59990, 59990),
    ],
  },
  {
    id: 2,
    numero: 'ORD-002',
    fecha: '2026-08-19T11:05:00',
    usuarioId: 3,
    estado: 'Entregada',
    cliente: { nombre: 'Matías', apellidos: 'Soto Pérez', email: 'matias.soto@correo.cl' },
    direccion: { calle: 'Calle Valparaíso 680', departamento: '', region: 'Valparaíso', comuna: 'Viña del Mar', indicaciones: 'Dejar en conserjería' },
    items: [
      item(4, 'Camiseta Universidad de Chile Titular 2026', 'U. de Chile', '/images/goku-udechile.webp', 'L', 2, 49990, 49990),
    ],
  },
  {
    id: 3,
    numero: 'ORD-003',
    fecha: '2026-09-02T19:40:00',
    usuarioId: 4,
    estado: 'Entregada',
    cliente: { nombre: 'Fernanda', apellidos: 'Muñoz Díaz', email: 'fernanda.munoz@correo.cl' },
    direccion: { calle: 'Barros Arana 1050', departamento: 'Of. 32', region: 'Biobío', comuna: 'Concepción', indicaciones: '' },
    items: [
      item(7, 'Camiseta Universidad Católica Titular 2026', 'U. Católica', '/images/goku-ucatolica.webp', 'S', 1, 42990, 47990),
      item(11, 'Camiseta Selección Chilena Retro 1998', 'Selección Chilena', '/images/chile-retro.svg', 'M', 1, 46990, 46990),
    ],
  },
  {
    id: 4,
    numero: 'ORD-004',
    fecha: '2026-09-15T10:12:00',
    usuarioId: null,
    estado: 'Entregada',
    cliente: { nombre: 'Javiera', apellidos: 'Pino Reyes', email: 'javiera.pino@correo.cl' },
    direccion: { calle: 'Av. Diego Portales 860', departamento: '', region: 'Los Lagos', comuna: 'Puerto Montt', indicaciones: '' },
    items: [
      item(1, 'Camiseta Colo-Colo Titular 2026', 'Colo-Colo', '/images/goku-colocolo.webp', 'L', 2, 39990, 49990),
    ],
  },
  {
    id: 5,
    numero: 'ORD-005',
    fecha: '2026-09-28T17:55:00',
    usuarioId: 5,
    estado: 'Enviada',
    cliente: { nombre: 'Diego', apellidos: 'Contreras Lagos', email: 'diego.contreras@correo.cl' },
    direccion: { calle: 'Pajaritos 3120', departamento: '', region: 'Metropolitana de Santiago', comuna: 'Maipú', indicaciones: 'Casa con reja verde' },
    items: [
      item(13, 'Camiseta Everton Titular 2026', 'Otros clubes', '/images/everton-titular.svg', 'L', 1, 35990, 41990),
      item(12, 'Camiseta Cobreloa Titular 2026', 'Otros clubes', '/images/goku-cobreloa.webp', 'L', 1, 42990, 42990),
    ],
  },
  {
    id: 6,
    numero: 'ORD-006',
    fecha: '2026-10-03T13:30:00',
    usuarioId: 2,
    estado: 'Enviada',
    cliente: { nombre: 'Camila', apellidos: 'Rojas Fuentes', email: 'cliente@chilegol.cl' },
    direccion: { calle: 'Av. Grecia 2001', departamento: 'Depto 504', region: 'Metropolitana de Santiago', comuna: 'Ñuñoa', indicaciones: '' },
    items: [
      item(3, 'Camiseta Colo-Colo Retro 1991', 'Colo-Colo', '/images/colocolo-retro.svg', 'M', 1, 44990, 44990),
    ],
  },
  {
    id: 7,
    numero: 'ORD-007',
    fecha: '2026-10-08T21:10:00',
    usuarioId: 3,
    estado: 'Pagada',
    cliente: { nombre: 'Matías', apellidos: 'Soto Pérez', email: 'matias.soto@correo.cl' },
    direccion: { calle: 'Calle Valparaíso 680', departamento: '', region: 'Valparaíso', comuna: 'Viña del Mar', indicaciones: 'Dejar en conserjería' },
    items: [
      item(9, 'Camiseta Selección Chilena Titular 2026', 'Selección Chilena', '/images/chile-titular.svg', 'L', 1, 59990, 59990),
      item(10, 'Camiseta Selección Chilena Visita 2026', 'Selección Chilena', '/images/chile-visita.svg', 'L', 1, 49990, 57990),
    ],
  },
  {
    id: 8,
    numero: 'ORD-008',
    fecha: '2026-10-11T09:45:00',
    usuarioId: null,
    estado: 'Pagada',
    cliente: { nombre: 'Tomás', apellidos: 'Vera Silva', email: 'tomas.vera@correo.cl' },
    direccion: { calle: 'Av. Angamos 0610', departamento: 'Depto 12', region: 'Antofagasta', comuna: 'Antofagasta', indicaciones: '' },
    items: [
      item(5, 'Camiseta Universidad de Chile Visita 2026', 'U. de Chile', '/images/uchile-visita.svg', 'M', 1, 41990, 49990),
      item(1, 'Camiseta Colo-Colo Titular 2026', 'Colo-Colo', '/images/goku-colocolo.webp', 'XL', 1, 39990, 49990),
    ],
  },
].map(conTotal);

export default ordenes;
