// Formulario para crear o editar un producto.
// Props:
//   - inicial: producto a editar (o null si es nuevo)
//   - categorias: lista para el select
//   - onGuardar(datos): se llama con los datos ya validados
//   - onCancelar()

import { useState } from 'react';
import { validarProducto, hayErrores } from '../../utils/validaciones';
import { TALLAS } from '../../utils/constantes';
import productosIniciales from '../../data/productos';
import { esFoto } from '../../utils/imagenes';

const IMAGENES = [...new Set(productosIniciales.map((p) => p.imagen))];

function aFormulario(producto) {
  if (!producto) {
    return {
      nombre: '',
      categoria: '',
      precio: '',
      stock: '',
      enOferta: false,
      precioOferta: '',
      imagen: IMAGENES[0],
      descripcion: '',
      tallas: ['S', 'M', 'L', 'XL'],
      destacado: false,
    };
  }
  return {
    ...producto,
    precio: String(producto.precio),
    stock: String(producto.stock),
    precioOferta: producto.precioOferta ? String(producto.precioOferta) : '',
    destacado: Boolean(producto.destacado),
  };
}

function FormularioProducto({ inicial, categorias, onGuardar, onCancelar }) {
  const [formulario, setFormulario] = useState(() => aFormulario(inicial));
  const [errores, setErrores] = useState({});
  const esNuevo = !inicial;

  function cambiar(evento) {
    const { name, value, type, checked } = evento.target;
    setFormulario({ ...formulario, [name]: type === 'checkbox' ? checked : value });
  }

  function cambiarTalla(talla) {
    const tallas = formulario.tallas.includes(talla)
      ? formulario.tallas.filter((t) => t !== talla)
      : TALLAS.filter((t) => t === talla || formulario.tallas.includes(t)); // mantiene el orden XS..XXL
    setFormulario({ ...formulario, tallas });
  }

  function enviar(evento) {
    evento.preventDefault();
    const nuevosErrores = validarProducto(formulario);
    setErrores(nuevosErrores);
    if (hayErrores(nuevosErrores)) return;

    onGuardar({
      nombre: formulario.nombre.trim(),
      categoria: formulario.categoria,
      precio: Number(formulario.precio),
      stock: Number(formulario.stock),
      enOferta: formulario.enOferta,
      precioOferta: formulario.enOferta ? Number(formulario.precioOferta) : null,
      imagen: formulario.imagen.trim() || IMAGENES[0],
      descripcion: formulario.descripcion.trim(),
      tallas: formulario.tallas,
      destacado: formulario.destacado,
    });
  }

  // Ayuda para dibujar un input con su etiqueta y su error
  function campo(nombre, etiqueta, props = {}) {
    return (
      <>
        <label htmlFor={`producto-${nombre}`} className="form-label">{etiqueta}</label>
        <input
          id={`producto-${nombre}`}
          name={nombre}
          className={`form-control ${errores[nombre] ? 'is-invalid' : ''}`}
          value={formulario[nombre]}
          onChange={cambiar}
          {...props}
        />
        {errores[nombre] && <div className="invalid-feedback">{errores[nombre]}</div>}
      </>
    );
  }

  return (
    <form className="panel mb-4" onSubmit={enviar} noValidate>
      <h2 className="h3 mb-3">{esNuevo ? 'Nuevo producto' : `Editar: ${inicial.nombre}`}</h2>
      <div className="row g-3">
        <div className="col-12 col-md-8">{campo('nombre', 'Nombre')}</div>
        <div className="col-12 col-md-4">
          <label htmlFor="producto-categoria" className="form-label">Categoría</label>
          <select
            id="producto-categoria"
            name="categoria"
            className={`form-select ${errores.categoria ? 'is-invalid' : ''}`}
            value={formulario.categoria}
            onChange={cambiar}
          >
            <option value="">Elige una categoría</option>
            {categorias.map((c) => <option key={c.id} value={c.nombre}>{c.nombre}</option>)}
          </select>
          {errores.categoria && <div className="invalid-feedback">{errores.categoria}</div>}
        </div>

        <div className="col-6 col-md-3">{campo('precio', 'Precio ($)', { type: 'number', min: 1, step: 1 })}</div>
        <div className="col-6 col-md-3">{campo('stock', 'Stock', { type: 'number', min: 0, step: 1 })}</div>
        <div className="col-12 col-md-3 d-flex align-items-end">
          <div className="form-check mb-2">
            <input id="producto-oferta" name="enOferta" type="checkbox" className="form-check-input" checked={formulario.enOferta} onChange={cambiar} />
            <label htmlFor="producto-oferta" className="form-check-label">En oferta</label>
          </div>
        </div>
        {formulario.enOferta && (
          <div className="col-12 col-md-3">{campo('precioOferta', 'Precio de oferta ($)', { type: 'number', min: 1, step: 1 })}</div>
        )}

        <div className="col-12 col-md-8">
          {campo('imagen', 'Imagen (ruta o URL)', { list: 'imagenes-disponibles' })}
          <datalist id="imagenes-disponibles">
            {IMAGENES.map((img) => <option key={img} value={img} />)}
          </datalist>
        </div>
        <div className="col-12 col-md-4 d-flex align-items-end">
          <img
            src={formulario.imagen}
            alt="Vista previa"
            style={{ width: 72, height: 72, objectFit: 'cover', background: '#e9edf4', borderRadius: 8, padding: esFoto(formulario.imagen) ? 0 : 4 }}
          />
        </div>

        <div className="col-12">
          <label htmlFor="producto-descripcion" className="form-label">Descripción</label>
          <textarea id="producto-descripcion" name="descripcion" rows="2" className="form-control" value={formulario.descripcion} onChange={cambiar} />
        </div>

        <div className="col-12">
          <span className="form-label d-block">Tallas</span>
          <div className="d-flex flex-wrap gap-3">
            {TALLAS.map((t) => (
              <div className="form-check" key={t}>
                <input
                  id={`producto-talla-${t}`}
                  type="checkbox"
                  className={`form-check-input ${errores.tallas ? 'is-invalid' : ''}`}
                  checked={formulario.tallas.includes(t)}
                  onChange={() => cambiarTalla(t)}
                />
                <label htmlFor={`producto-talla-${t}`} className="form-check-label">{t}</label>
              </div>
            ))}
          </div>
          {errores.tallas && <div className="text-danger small mt-1">{errores.tallas}</div>}
        </div>

        <div className="col-12">
          <div className="form-check">
            <input id="producto-destacado" name="destacado" type="checkbox" className="form-check-input" checked={formulario.destacado} onChange={cambiar} />
            <label htmlFor="producto-destacado" className="form-check-label">Mostrar en "Las más pedidas" de la portada</label>
          </div>
        </div>
      </div>

      <div className="d-flex gap-2 mt-4">
        <button type="submit" className="btn btn-primary">{esNuevo ? 'Crear producto' : 'Guardar cambios'}</button>
        <button type="button" className="btn btn-outline-secondary" onClick={onCancelar}>Cancelar</button>
      </div>
    </form>
  );
}

export default FormularioProducto;
