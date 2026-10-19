// Formulario para crear o editar un producto (react-hook-form).
// onGuardar recibe los datos validados y devuelve { ok, error }.

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import FormGroup from '../molecules/FormGroup';
import { categorias, imagenesDisponibles, IMAGEN_POR_DEFECTO } from '../../data/products';
import {
  validarCodigoProducto,
  validarNombre,
  validarDescripcion,
  validarPrecio,
  validarStock,
  validarStockCritico,
  validarCategoria,
} from '../../utils/validaciones';

function valoresIniciales(producto) {
  if (!producto) {
    return { codigo: '', nombre: '', descripcion: '', precio: '', stock: '', stockCritico: '', categoria: '', imagen: '' };
  }
  return {
    codigo: producto.codigo,
    nombre: producto.nombre,
    descripcion: producto.descripcion ?? '',
    precio: String(producto.precio),
    stock: String(producto.stock),
    stockCritico: producto.stockCritico === '' || producto.stockCritico == null ? '' : String(producto.stockCritico),
    categoria: producto.categoria,
    imagen: producto.imagen ?? '',
  };
}

export default function ProductForm({ producto = null, onGuardar, onCancelar }) {
  const { register, handleSubmit, control, setError, formState: { errors } } = useForm({
    defaultValues: valoresIniciales(producto),
  });
  const [errorGeneral, setErrorGeneral] = useState('');
  const imagen = useWatch({ control, name: 'imagen' });

  const onSubmit = (datos) => {
    setErrorGeneral('');
    const resultado = onGuardar(datos);
    if (!resultado.ok) {
      setErrorGeneral(resultado.error);
      if (resultado.campo) setError(resultado.campo, { message: resultado.error });
    }
  };

  const onInvalido = () => setErrorGeneral('Revisa los campos marcados antes de continuar.');

  return (
    <form className="formulario formulario--ancho" onSubmit={handleSubmit(onSubmit, onInvalido)} noValidate
      aria-labelledby="titulo-form-producto">
      <div className="formulario__cabecera">
        <h2 id="titulo-form-producto">{producto ? `Editar ${producto.nombre}` : 'Nuevo producto'}</h2>
      </div>

      <div className="formulario__cuerpo">
        <div className="campos-par">
          <FormGroup id="codigo" label="Código del producto" error={errors.codigo?.message}
            ayuda="Mínimo 3 caracteres. Letras, números y guiones.">
            <Input type="text" autoComplete="off" {...register('codigo', { validate: validarCodigoProducto })} />
          </FormGroup>
          <FormGroup id="nombre" label="Nombre" error={errors.nombre?.message}>
            <Input type="text" maxLength={100} {...register('nombre', { validate: validarNombre })} />
          </FormGroup>
        </div>

        <FormGroup id="descripcion" label="Descripción" opcional error={errors.descripcion?.message}>
          <Input as="textarea" maxLength={500} {...register('descripcion', { validate: validarDescripcion })} />
        </FormGroup>

        <div className="campos-par">
          <FormGroup id="precio" label="Precio" error={errors.precio?.message}
            ayuda="Un precio de 0 publica el producto como gratuito.">
            <Input type="number" min="0" step="1" inputMode="numeric" {...register('precio', { validate: validarPrecio })} />
          </FormGroup>
          <FormGroup id="categoria" label="Categoría" error={errors.categoria?.message}>
            <Input as="select" {...register('categoria', { validate: validarCategoria })}>
              <option value="">-- Selecciona la categoría --</option>
              {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
            </Input>
          </FormGroup>
        </div>

        <div className="campos-par">
          <FormGroup id="stock" label="Stock" error={errors.stock?.message}>
            <Input type="number" min="0" step="1" inputMode="numeric" {...register('stock', { validate: validarStock })} />
          </FormGroup>
          <FormGroup id="stockCritico" label="Stock crítico" opcional error={errors.stockCritico?.message}
            ayuda="Avisamos cuando el stock sea igual o inferior a este número.">
            <Input type="number" min="0" step="1" inputMode="numeric" {...register('stockCritico', { validate: validarStockCritico })} />
          </FormGroup>
        </div>

        <div className="campos-par">
          <FormGroup id="imagen" label="Imagen" opcional ayuda="Ruta dentro de public, por ejemplo /images/goku-colocolo.webp.">
            <Input type="text" list="imagenes-disponibles" placeholder={IMAGEN_POR_DEFECTO} {...register('imagen')} />
          </FormGroup>
          <img className="vista-previa" src={imagen || IMAGEN_POR_DEFECTO} alt="Vista previa de la imagen" />
        </div>
        <datalist id="imagenes-disponibles">
          {imagenesDisponibles.map((ruta) => <option key={ruta} value={ruta} />)}
        </datalist>
      </div>

      {errorGeneral && (
        <p className="aviso aviso--alerta formulario__resultado" role="alert">{errorGeneral}</p>
      )}

      <div className="formulario__pie">
        <Button type="submit" variant="principal">Guardar producto</Button>
        <Button variant="secundario" onClick={onCancelar}>Cancelar</Button>
      </div>
    </form>
  );
}
