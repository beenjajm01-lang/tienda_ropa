// Usuarios de prueba. Las contraseñas están en texto plano porque esta
// versión no tiene servidor: es solo una simulación para la entrega.
//
// Cuentas para probar:
//   Administrador -> admin@chilegol.cl   / admin123
//   Cliente       -> cliente@chilegol.cl / cliente123

const usuarios = [
  {
    id: 1,
    nombre: 'Administrador',
    apellidos: 'ChileGol',
    email: 'admin@chilegol.cl',
    password: 'admin123',
    rol: 'admin',
    telefono: '+56 9 1111 2222',
    fechaRegistro: '2026-03-01',
    direccion: null,
  },
  {
    id: 2,
    nombre: 'Camila',
    apellidos: 'Rojas Fuentes',
    email: 'cliente@chilegol.cl',
    password: 'cliente123',
    rol: 'cliente',
    telefono: '+56 9 8765 4321',
    fechaRegistro: '2026-04-12',
    direccion: {
      calle: 'Av. Grecia 2001',
      departamento: 'Depto 504',
      region: 'Metropolitana de Santiago',
      comuna: 'Ñuñoa',
      indicaciones: '',
    },
  },
  {
    id: 3,
    nombre: 'Matías',
    apellidos: 'Soto Pérez',
    email: 'matias.soto@correo.cl',
    password: 'matias123',
    rol: 'cliente',
    telefono: '+56 9 5555 1234',
    fechaRegistro: '2026-05-20',
    direccion: {
      calle: 'Calle Valparaíso 680',
      departamento: '',
      region: 'Valparaíso',
      comuna: 'Viña del Mar',
      indicaciones: 'Dejar en conserjería',
    },
  },
  {
    id: 4,
    nombre: 'Fernanda',
    apellidos: 'Muñoz Díaz',
    email: 'fernanda.munoz@correo.cl',
    password: 'fernanda123',
    rol: 'cliente',
    telefono: '+56 9 4444 9876',
    fechaRegistro: '2026-06-02',
    direccion: {
      calle: 'Barros Arana 1050',
      departamento: 'Of. 32',
      region: 'Biobío',
      comuna: 'Concepción',
      indicaciones: '',
    },
  },
  {
    id: 5,
    nombre: 'Diego',
    apellidos: 'Contreras Lagos',
    email: 'diego.contreras@correo.cl',
    password: 'diego123',
    rol: 'cliente',
    telefono: '+56 9 3333 6655',
    fechaRegistro: '2026-07-15',
    direccion: {
      calle: 'Pajaritos 3120',
      departamento: '',
      region: 'Metropolitana de Santiago',
      comuna: 'Maipú',
      indicaciones: 'Casa con reja verde',
    },
  },
];

export default usuarios;
