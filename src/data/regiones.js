// Regiones de Chile con sus comunas

export const regiones = [
  { codigo: "15", nombre: "Arica y Parinacota", comunas: ["Arica", "Camarones", "Putre", "General Lagos"] },
  { codigo: "01", nombre: "Tarapacá", comunas: ["Iquique", "Alto Hospicio", "Pozo Almonte", "Pica", "Huara"] },
  { codigo: "02", nombre: "Antofagasta", comunas: ["Antofagasta", "Calama", "Tocopilla", "Mejillones", "Taltal"] },
  { codigo: "03", nombre: "Atacama", comunas: ["Copiapó", "Caldera", "Vallenar", "Chañaral", "Huasco"] },
  { codigo: "04", nombre: "Coquimbo", comunas: ["La Serena", "Coquimbo", "Ovalle", "Illapel", "Vicuña"] },
  { codigo: "05", nombre: "Valparaíso", comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio", "Quillota"] },
  { codigo: "13", nombre: "Metropolitana de Santiago", comunas: ["Santiago", "Providencia", "Ñuñoa", "Maipú", "Puente Alto", "La Florida", "Las Condes", "Recoleta", "San Bernardo"] },
  { codigo: "06", nombre: "Libertador General Bernardo O'Higgins", comunas: ["Rancagua", "San Fernando", "Machalí", "Santa Cruz", "Pichilemu"] },
  { codigo: "07", nombre: "Maule", comunas: ["Talca", "Curicó", "Linares", "Constitución", "Longaví", "Cauquenes"] },
  { codigo: "16", nombre: "Ñuble", comunas: ["Chillán", "Chillán Viejo", "San Carlos", "Bulnes", "Quirihue"] },
  { codigo: "08", nombre: "Biobío", comunas: ["Concepción", "Talcahuano", "Los Ángeles", "Coronel", "Chiguayante", "San Pedro de la Paz"] },
  { codigo: "09", nombre: "La Araucanía", comunas: ["Temuco", "Padre Las Casas", "Villarrica", "Angol", "Pucón", "Victoria"] },
  { codigo: "14", nombre: "Los Ríos", comunas: ["Valdivia", "La Unión", "Río Bueno", "Panguipulli", "Paillaco"] },
  { codigo: "10", nombre: "Los Lagos", comunas: ["Puerto Montt", "Osorno", "Castro", "Ancud", "Puerto Varas"] },
  { codigo: "11", nombre: "Aysén del General Carlos Ibáñez del Campo", comunas: ["Coyhaique", "Puerto Aysén", "Chile Chico", "Cochrane"] },
  { codigo: "12", nombre: "Magallanes y de la Antártica Chilena", comunas: ["Punta Arenas", "Puerto Natales", "Porvenir", "Cabo de Hornos"] },
];

export function comunasDeRegion(codigo) {
  const region = regiones.find((r) => r.codigo === codigo);
  return region ? region.comunas : [];
}

export function nombreDeRegion(codigo) {
  const region = regiones.find((r) => r.codigo === codigo);
  return region ? region.nombre : "";
}
