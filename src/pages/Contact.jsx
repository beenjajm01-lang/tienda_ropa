// Formulario de contacto (nombre, correo y mensaje con contador).

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import FormGroup from '../components/molecules/FormGroup';
import logoCgs from '../assets/logo-cgs.svg';
import {
  DOMINIOS_PERMITIDOS,
  LARGO_MAXIMO_COMENTARIO,
  validarNombre,
  validarCorreo,
  validarComentario,
} from '../utils/validaciones';

export default function Contact() {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
    defaultValues: { nombre: '', correo: '', comentario: '' },
  });
  const [enviado, setEnviado] = useState(null);

  // Contador de caracteres del mensaje
  const comentario = useWatch({ control, name: 'comentario' }) ?? '';

  const onSubmit = (datos) => {
    setEnviado({ nombre: datos.nombre.trim(), correo: datos.correo.trim() });
    reset();
  };

  return (
    <main id="contenido" className="acceso">
      <div className="contenedor">
        <div className="acceso__marca">
          <img src={logoCgs} alt="" width="64" height="64" />
          <h1>Escríbenos</h1>
          <p className="prosa">Respondemos de lunes a viernes, entre 9:00 y 18:00.</p>
        </div>

        <form className="formulario" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="formulario__cabecera">
            <h2>Formulario de contacto</h2>
          </div>

          <div className="formulario__cuerpo">
            {enviado && (
              <p className="aviso" role="status">
                Gracias {enviado.nombre}, recibimos tu mensaje. Te responderemos a {enviado.correo}.
              </p>
            )}

            <FormGroup id="nombre" label="Nombre completo" error={errors.nombre?.message}>
              <Input type="text" maxLength={100} autoComplete="name" {...register('nombre', { validate: validarNombre })} />
            </FormGroup>

            <FormGroup id="correo" label="Correo" ayuda={`Solo ${DOMINIOS_PERMITIDOS}.`} error={errors.correo?.message}>
              <Input type="email" maxLength={100} autoComplete="email" {...register('correo', { validate: validarCorreo })} />
            </FormGroup>

            <FormGroup id="comentario" label="Mensaje" error={errors.comentario?.message}
              ayuda={`${comentario.length}/${LARGO_MAXIMO_COMENTARIO} caracteres`}>
              <Input as="textarea" maxLength={LARGO_MAXIMO_COMENTARIO} {...register('comentario', { validate: validarComentario })} />
            </FormGroup>
          </div>

          <div className="formulario__pie">
            <Button type="submit" variant="principal" className="boton--ancho">Enviar mensaje</Button>
          </div>
        </form>
      </div>
    </main>
  );
}
