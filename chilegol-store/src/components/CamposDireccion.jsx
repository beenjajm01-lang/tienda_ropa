// Campos de dirección: calle, departamento, región, comuna e indicaciones.
// Al cambiar la región, la lista de comunas cambia y la comuna elegida se borra.

import regiones, { comunasDeRegion } from '../data/regiones';

function CamposDireccion({ valores, errores = {}, onCambio, idPrefijo = 'dir' }) {
  const comunas = comunasDeRegion(valores.region);

  function cambiarRegion(evento) {
    onCambio('region', evento.target.value);
    onCambio('comuna', '');
  }

  return (
    <div className="row g-3">
      <div className="col-12 col-md-8">
        <label htmlFor={`${idPrefijo}-calle`} className="form-label">Calle y número</label>
        <input
          id={`${idPrefijo}-calle`}
          className={`form-control ${errores.calle ? 'is-invalid' : ''}`}
          value={valores.calle}
          onChange={(e) => onCambio('calle', e.target.value)}
          autoComplete="street-address"
        />
        {errores.calle && <div className="invalid-feedback">{errores.calle}</div>}
      </div>
      <div className="col-12 col-md-4">
        <label htmlFor={`${idPrefijo}-depto`} className="form-label">
          Departamento <span className="texto-secundario">(opcional)</span>
        </label>
        <input
          id={`${idPrefijo}-depto`}
          className="form-control"
          value={valores.departamento}
          onChange={(e) => onCambio('departamento', e.target.value)}
        />
      </div>
      <div className="col-12 col-md-6">
        <label htmlFor={`${idPrefijo}-region`} className="form-label">Región</label>
        <select
          id={`${idPrefijo}-region`}
          className={`form-select ${errores.region ? 'is-invalid' : ''}`}
          value={valores.region}
          onChange={cambiarRegion}
        >
          <option value="">Elige una región</option>
          {regiones.map((r) => (
            <option key={r.nombre} value={r.nombre}>{r.nombre}</option>
          ))}
        </select>
        {errores.region && <div className="invalid-feedback">{errores.region}</div>}
      </div>
      <div className="col-12 col-md-6">
        <label htmlFor={`${idPrefijo}-comuna`} className="form-label">Comuna</label>
        <select
          id={`${idPrefijo}-comuna`}
          className={`form-select ${errores.comuna ? 'is-invalid' : ''}`}
          value={valores.comuna}
          onChange={(e) => onCambio('comuna', e.target.value)}
          disabled={comunas.length === 0}
        >
          <option value="">{comunas.length === 0 ? 'Primero elige la región' : 'Elige una comuna'}</option>
          {comunas.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errores.comuna && <div className="invalid-feedback">{errores.comuna}</div>}
      </div>
      <div className="col-12">
        <label htmlFor={`${idPrefijo}-indicaciones`} className="form-label">
          Indicaciones para la entrega <span className="texto-secundario">(opcional)</span>
        </label>
        <textarea
          id={`${idPrefijo}-indicaciones`}
          className="form-control"
          rows="2"
          placeholder="Ej: dejar en conserjería, casa con reja verde"
          value={valores.indicaciones}
          onChange={(e) => onCambio('indicaciones', e.target.value)}
        />
      </div>
    </div>
  );
}

export default CamposDireccion;
