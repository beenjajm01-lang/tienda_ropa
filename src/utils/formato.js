// Formatea un precio en pesos chilenos
export function formatearPrecio(valor) {
  return `$${Number(valor || 0).toLocaleString("es-CL")}`;
}
