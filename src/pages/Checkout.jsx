import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';

export default function Checkout({ carrito, onVaciarCarrito }) {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  const onSubmit = (datos) => {
    onVaciarCarrito();
    navigate('/pago-exitoso', { state: { orden: '#20240705', cliente: datos, total } });
  };

  return (
    <main className="seccion">
      <div className="contenedor">
        <h1 className="seccion__titulo">Finalizar Compra</h1>
        <form className="formulario formulario--ancho" onSubmit={handleSubmit(onSubmit)}>
          <div className="formulario__cabecera">
            <h2>Datos de Envío y Contacto</h2>
          </div>
          <div className="formulario__cuerpo">
            <div className="campos-par">
              <div className="campo">
                <label>Nombre</label>
                <input
                  type="text"
                  aria-invalid={!!errors.nombre}
                  {...register('nombre', { required: 'El nombre es obligatorio' })}
                />
                {errors.nombre && <span className="campo__error">{errors.nombre.message}</span>}
              </div>
              <div className="campo">
                <label>Apellidos</label>
                <input
                  type="text"
                  aria-invalid={!!errors.apellidos}
                  {...register('apellidos', { required: 'Los apellidos son obligatorios' })}
                />
                {errors.apellidos && <span className="campo__error">{errors.apellidos.message}</span>}
              </div>
            </div>

            <div className="campo">
              <label>Correo Electrónico</label>
              <input
                type="email"
                aria-invalid={!!errors.correo}
                {...register('correo', { required: 'El correo es obligatorio' })}
              />
              {errors.correo && <span className="campo__error">{errors.correo.message}</span>}
            </div>

            <div className="campo">
              <label>Dirección de Envío</label>
              <input
                type="text"
                aria-invalid={!!errors.direccion}
                {...register('direccion', { required: 'La dirección es obligatoria' })}
              />
              {errors.direccion && <span className="campo__error">{errors.direccion.message}</span>}
            </div>
          </div>

          <div className="formulario__pie">
            <Button type="submit" variant="principal" className="boton--ancho" disabled={carrito.length === 0}>
              Pagar ahora ${total.toLocaleString('es-CL')}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

