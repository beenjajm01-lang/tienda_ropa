import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../components/atoms/Button';

export default function Contact() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [enviado, setEnviado] = useState(false);

  const onSubmit = () => {
    setEnviado(true);
    reset();
  };

  return (
    <main className="seccion">
      <div className="contenedor">
        <h1 className="seccion__titulo">Contacto</h1>
        <p className="seccion__bajada">¿Tienes alguna duda o consulta? Escríbenos y te responderemos a la brevedad.</p>

        {enviado && (
          <div className="aviso su-20 mb-4">
            Mensaje enviado con éxito. Te responderemos pronto.
          </div>
        )}

        <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
          <div className="formulario__cabecera">
            <h2>Formulario de Mensaje</h2>
          </div>
          <div className="formulario__cuerpo">
            <div className="campo">
              <label>Nombre Completo</label>
              <input
                type="text"
                aria-invalid={!!errors.nombre}
                {...register('nombre', { required: 'El nombre es obligatorio' })}
              />
              {errors.nombre && <span className="campo__error">{errors.nombre.message}</span>}
            </div>

            <div className="campo">
              <label>Correo Electrónico</label>
              <input
                type="email"
                aria-invalid={!!errors.correo}
                {...register('correo', {
                  required: 'El correo es obligatorio',
                  pattern: { value: /^\S+@\S+$/i, message: 'Formato de correo inválido' }
                })}
              />
              {errors.correo && <span className="campo__error">{errors.correo.message}</span>}
            </div>

            <div className="campo">
              <label>Mensaje</label>
              <textarea
                aria-invalid={!!errors.mensaje}
                {...register('mensaje', { required: 'El mensaje no puede estar vacío' })}
              />
              {errors.mensaje && <span className="campo__error">{errors.mensaje.message}</span>}
            </div>
          </div>

          <div className="formulario__pie">
            <Button type="submit" variant="principal" className="boton--ancho">
              Enviar Mensaje
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

