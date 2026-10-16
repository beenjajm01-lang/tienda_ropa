// Las imágenes de producto pueden ser fotos (.webp, .png, .jpg) o ilustraciones (.svg).
// Las fotos llenan todo su recuadro; las ilustraciones llevan un margen alrededor.

export function esFoto(ruta = '') {
  return !String(ruta).toLowerCase().endsWith('.svg');
}
