// Etiqueta + campo + ayuda + error. Añade id, aria-invalid y aria-describedby
// para que el lector de pantalla lea la ayuda y el error junto con la etiqueta.

import { cloneElement } from 'react';

export default function FormGroup({ id, label, error, ayuda, opcional = false, children, className = "" }) {
  const idAyuda = ayuda ? `${id}-ayuda` : null;
  const idError = error ? `${id}-error` : null;
  const describe = [idAyuda, idError].filter(Boolean).join(" ") || undefined;

  const campo = cloneElement(children, {
    id,
    invalido: Boolean(error),
    "aria-describedby": describe,
  });

  return (
    <div className={`campo ${className}`}>
      <label htmlFor={id}>
        {label}
        {opcional && <span className="campo__opcional"> (opcional)</span>}
      </label>
      {campo}
      {ayuda && (
        <p className="campo__ayuda" id={idAyuda}>
          {ayuda}
        </p>
      )}
      <p className="campo__error" id={`${id}-error`} role="alert">
        {error}
      </p>
    </div>
  );
}
