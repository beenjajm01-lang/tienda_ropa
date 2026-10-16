// Título de cada página, con una descripción corta debajo.

function CabeceraPagina({ titulo, descripcion, children }) {
  return (
    <header className="cabecera-pagina">
      <div className="container">
        <h1 className="mb-0">{titulo}</h1>
        {descripcion && <p>{descripcion}</p>}
        {children}
      </div>
    </header>
  );
}

export default CabeceraPagina;
