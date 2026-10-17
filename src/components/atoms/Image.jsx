export function Image({ src, alt, className = "" }) {
  return <img src={src} alt={alt} className={`img-fluid ${className}`} />;
}
