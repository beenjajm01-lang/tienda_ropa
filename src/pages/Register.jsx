// Registro de usuario. Queda como Cliente y vuelve al login con el correo escrito.

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import FormGroup from '../components/molecules/FormGroup';
import { crearUsuario, existeRunOCorreo } from '../data/users';
import { regiones, comunasDeRegion } from '../data/regiones';
import {
  DOMINIOS_PERMITIDOS,
  validarRun,
  validarNombreUsuario,
  validarApellidos,
  validarCorreo,
  validarClave,
  validarRepetirClave,
  validarFechaNacimiento,
  validarRegion,
  validarComuna,
  validarDireccion,
} from '../utils/validaciones';

const VACIO = {
  run: '', nombre: '', apellidos: '', correo: '', clave: '', clave2: '',
  fechaNacimiento: '', region: '', comuna: '', direccion: '',
};

export default function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit, control, setValue, getValues, formState: { errors } } = useForm({
    defaultValues: VACIO,
  });
  const [errorGeneral, setErrorGeneral] = useState('');

  // Muestra solo las comunas de la región elegida
  const region = useWatch({ control, name: 'region' });
  const comunas = comunasDeRegion(region);

  const onSubmit = (datos) => {
    if (existeRunOCorreo(datos.run, datos.correo)) {
      setErrorGeneral('Ya existe una cuenta con ese RUN o ese correo.');
      return;
    }
    crearUsuario({ ...datos, tipo: 'Cliente' });
    navigate('/login', {
      state: { aviso: 'Cuenta creada. Ya puedes iniciar sesión con tu correo.', correo: datos.correo.trim() },
    });
  };

  return (
    <main id="contenido" className="acceso">
      <div className="contenedor">
        <form className="formulario formulario--ancho" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="formulario__cabecera">
            <h1>Registro de usuario</h1>
          </div>

          <div className="formulario__cuerpo">
            <FormGroup id="run" label="RUN" error={errors.run?.message}
              ayuda="Sin puntos ni guion, con dígito verificador. Entre 7 y 9 caracteres.">
              <Input type="text" maxLength={9} placeholder="19011022K" autoComplete="off"
                {...register('run', { validate: validarRun })} />
            </FormGroup>

            <div className="campos-par">
              <FormGroup id="nombre" label="Nombre" error={errors.nombre?.message}>
                <Input type="text" maxLength={50} autoComplete="given-name"
                  {...register('nombre', { validate: validarNombreUsuario })} />
              </FormGroup>
              <FormGroup id="apellidos" label="Apellidos" error={errors.apellidos?.message}>
                <Input type="text" maxLength={100} autoComplete="family-name"
                  {...register('apellidos', { validate: validarApellidos })} />
              </FormGroup>
            </div>

            <FormGroup id="correo" label="Correo" ayuda={`Solo ${DOMINIOS_PERMITIDOS}.`} error={errors.correo?.message}>
              <Input type="email" maxLength={100} autoComplete="email"
                {...register('correo', { validate: validarCorreo })} />
            </FormGroup>

            <div className="campos-par">
              <FormGroup id="clave" label="Contraseña" ayuda="Entre 4 y 10 caracteres." error={errors.clave?.message}>
                <Input type="password" maxLength={10} autoComplete="new-password"
                  {...register('clave', { validate: validarClave, deps: ['clave2'] })} />
              </FormGroup>
              <FormGroup id="clave2" label="Confirmar contraseña" error={errors.clave2?.message}>
                <Input type="password" maxLength={10} autoComplete="new-password"
                  {...register('clave2', { validate: (valor) => validarRepetirClave(valor, getValues('clave')) })} />
              </FormGroup>
            </div>

            <FormGroup id="fechaNacimiento" label="Fecha de nacimiento" opcional error={errors.fechaNacimiento?.message}>
              <Input type="date" {...register('fechaNacimiento', { validate: validarFechaNacimiento })} />
            </FormGroup>

            <div className="campos-par">
              <FormGroup id="region" label="Región" error={errors.region?.message}>
                <Input as="select" {...register('region', {
                  validate: validarRegion,
                  // al cambiar la región se borra la comuna
                  onChange: () => setValue('comuna', ''),
                })}>
                  <option value="">-- Selecciona la región --</option>
                  {regiones.map((r) => <option key={r.codigo} value={r.codigo}>{r.nombre}</option>)}
                </Input>
              </FormGroup>
              <FormGroup id="comuna" label="Comuna" error={errors.comuna?.message}>
                <Input as="select" disabled={comunas.length === 0} {...register('comuna', { validate: validarComuna })}>
                  <option value="">{comunas.length === 0 ? '-- Primero elige la región --' : '-- Selecciona la comuna --'}</option>
                  {comunas.map((c) => <option key={c} value={c}>{c}</option>)}
                </Input>
              </FormGroup>
            </div>

            <FormGroup id="direccion" label="Dirección" error={errors.direccion?.message}>
              <Input type="text" maxLength={300} autoComplete="street-address"
                {...register('direccion', { validate: validarDireccion })} />
            </FormGroup>
          </div>

          {errorGeneral && (
            <p className="aviso aviso--alerta formulario__resultado" role="alert">{errorGeneral}</p>
          )}

          <div className="formulario__pie">
            <Button type="submit" variant="principal">Registrar</Button>
            <Link className="boton boton--secundario" to="/login">Ya tengo cuenta</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
