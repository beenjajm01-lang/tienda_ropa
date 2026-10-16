// Regiones de Chile con sus comunas principales, para el formulario de dirección.
// La Región Metropolitana tiene todas sus comunas; el resto, las más grandes.

const regiones = [
  { nombre: 'Arica y Parinacota', comunas: ['Arica', 'Camarones', 'General Lagos', 'Putre'] },
  { nombre: 'Tarapacá', comunas: ['Alto Hospicio', 'Huara', 'Iquique', 'Pica', 'Pozo Almonte'] },
  { nombre: 'Antofagasta', comunas: ['Antofagasta', 'Calama', 'Mejillones', 'San Pedro de Atacama', 'Taltal', 'Tocopilla'] },
  { nombre: 'Atacama', comunas: ['Caldera', 'Chañaral', 'Copiapó', 'Diego de Almagro', 'Vallenar'] },
  { nombre: 'Coquimbo', comunas: ['Andacollo', 'Coquimbo', 'Illapel', 'La Serena', 'Ovalle', 'Vicuña'] },
  {
    nombre: 'Valparaíso',
    comunas: ['Concón', 'La Calera', 'Los Andes', 'Quillota', 'Quilpué', 'San Antonio', 'San Felipe', 'Valparaíso', 'Villa Alemana', 'Viña del Mar'],
  },
  {
    nombre: 'Metropolitana de Santiago',
    comunas: [
      'Alhué', 'Buin', 'Calera de Tango', 'Cerrillos', 'Cerro Navia', 'Colina', 'Conchalí', 'Curacaví',
      'El Bosque', 'El Monte', 'Estación Central', 'Huechuraba', 'Independencia', 'Isla de Maipo',
      'La Cisterna', 'La Florida', 'La Granja', 'La Pintana', 'La Reina', 'Lampa', 'Las Condes',
      'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Macul', 'Maipú', 'María Pinto', 'Melipilla', 'Ñuñoa',
      'Padre Hurtado', 'Paine', 'Pedro Aguirre Cerda', 'Peñaflor', 'Peñalolén', 'Pirque', 'Providencia',
      'Pudahuel', 'Puente Alto', 'Quilicura', 'Quinta Normal', 'Recoleta', 'Renca', 'San Bernardo',
      'San Joaquín', 'San José de Maipo', 'San Miguel', 'San Pedro', 'San Ramón', 'Santiago',
      'Talagante', 'Tiltil', 'Vitacura',
    ],
  },
  { nombre: "Libertador General Bernardo O'Higgins", comunas: ['Machalí', 'Pichilemu', 'Rancagua', 'Rengo', 'San Fernando', 'Santa Cruz'] },
  { nombre: 'Maule', comunas: ['Cauquenes', 'Constitución', 'Curicó', 'Linares', 'Molina', 'Talca'] },
  { nombre: 'Ñuble', comunas: ['Bulnes', 'Chillán', 'Chillán Viejo', 'Quirihue', 'San Carlos'] },
  {
    nombre: 'Biobío',
    comunas: ['Chiguayante', 'Concepción', 'Coronel', 'Hualpén', 'Los Ángeles', 'Lota', 'San Pedro de la Paz', 'Talcahuano', 'Tomé'],
  },
  { nombre: 'La Araucanía', comunas: ['Angol', 'Padre Las Casas', 'Pucón', 'Temuco', 'Victoria', 'Villarrica'] },
  { nombre: 'Los Ríos', comunas: ['La Unión', 'Paillaco', 'Panguipulli', 'Río Bueno', 'Valdivia'] },
  { nombre: 'Los Lagos', comunas: ['Ancud', 'Castro', 'Frutillar', 'Osorno', 'Puerto Montt', 'Puerto Varas'] },
  { nombre: 'Aysén del General Carlos Ibáñez del Campo', comunas: ['Aysén', 'Chile Chico', 'Cochrane', 'Coyhaique'] },
  { nombre: 'Magallanes y de la Antártica Chilena', comunas: ['Cabo de Hornos', 'Natales', 'Porvenir', 'Punta Arenas'] },
];

// Devuelve las comunas de una región (o una lista vacía si no existe)
export function comunasDeRegion(nombreRegion) {
  const region = regiones.find((r) => r.nombre === nombreRegion);
  return region ? region.comunas : [];
}

export default regiones;
