// Formulario para crear o editar un usuario desde el panel (react-hook-form).
// onGuardar recibe los datos validados y devuelve { ok, error }.

import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import FormGroup from '../molecules/FormGroup';
import { roles, CLAVE_INICIAL } from '../../data/users';
import { regiones, comunasDeRegion } from '../../data/regiones';
import {
  DOMINIOS_PERMITIDOS,
  validarRun,
  validarNombreUsuario,
  validarApellidos,
  validarCorreo,
  validarFechaNacimiento,
  validarTipoUsuario,
  validarRegion,
  validarComuna,
  validarDireccion,
} from '../../utils/validaciones';

const VACIO = {
  run: '', nombre: '', apellidos: '', correo: '', fechaNacimiento: '',
  tipo: '', region: '', comuna: '', direccion: '',
};

export default function UserForm({ usuario = null, esUnoMismo = false, onGuardar, onCancelar }) {
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
    defaultValues: usuario ? { ...VACIO, ...usuario } : VACIO,
  });
  const [errorGeneral, setErrorGeneral] = useState('');
  const region = useWatch({ control, name: 'region' });
  const comunas = comunasDeRegion(region);

  const onSubmit = (datos) => {
    setErrorGeneral('');
    const resultado = onGuardar(datos);
    if (!resultado.ok) setErrorGeneral(resultado.error);
  };

  const onInvalido = () => setErrorGeneral('Revisa los campos marcados antes de continuar.');

  return (
    <form className="formulario formulario--ancho" onSubmit={handleSubmit(onSubmit, onInvalido)} noValidate
      aria-labelledby="titulo-form-usuario">
      <div className="formulario__cabecera">
        <h2 id="titulo-form-usuario">{usuario ? `Editar a ${usuario.nombre} ${usuario.apellidos}` : 'Nuevo usuario'}</h2>
      </div>

      <div className="formulario__cuerpo">
        {!usuario && (
          <p className="aviso">El usuario nuevo entra con la clave inicial {CLAVE_INICIAL}.</p>
        )}

        <FormGroup id="run" label="RUN" error={errors.run?.message}
          ayuda="Sin puntos ni guion. Entre 7 y 9 caracteres, con dígito verificador.">
          <Input type="text" maxLength={9} placeholder="19011022K" autoComplete="off" {...register('run', { validate: validarRun })} />
        </FormGroup>

        <div className="campos-par">
          <FormGroup id="nombre" label="Nombre" error={errors.nombre?.message}>
            <Input type="text" maxLength={50} {...register('nombre', { validate: validarNombreUsuario })} />
          </FormGroup>
          <FormGroup id="apellidos" label="Apellidos" error={errors.apellidos?.message}>
            <Input type="text" maxLength={100} {...register('apellidos', { validate: validarApellidos })} />
          </FormGroup>
        </div>

        <div className="campos-par">
          <FormGroup id="correo" label="Correo" ayuda={`Solo ${DOMINIOS_PERMITIDOS}.`} error={errors.correo?.message}>
            <Input type="email" maxLength={100} {...register('correo', { validate: validarCorreo })} />
          </FormGroup>
          <FormGroup id="fechaNacimiento" label="Fecha de nacimiento" opcional error={errors.fechaNacimiento?.message}>
            <Input type="date" {...register('fechaNacimiento', { validate: validarFechaNacimiento })} />
          </FormGroup>
        </div>

        <FormGroup id="tipo" label="Tipo de usuario" error={errors.tipo?.message}
          ayuda={esUnoMismo ? 'No puedes cambiar tu propio perfil.' : 'Define los permisos dentro del sistema.'}>
          <Input as="select" {...register('tipo', { validate: validarTipoUsuario, disabled: esUnoMismo })}>
            <option value="">-- Selecciona el perfil --</option>
            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
          </Input>
        </FormGroup>

        <div className="campos-par">
          <FormGroup id="region" label="Región" error={errors.region?.message}>
            <Input as="select" {...register('region', { validate: validarRegion, onChange: () => setValue('comuna', '') })}>
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
          <Input type="text" maxLength={300} {...register('direccion', { validate: validarDireccion })} />
        </FormGroup>
      </div>

      {errorGeneral && (
        <p className="aviso aviso--alerta formulario__resultado" role="alert">{errorGeneral}</p>
      )}

      <div className="formulario__pie">
        <Button type="submit" variant="principal">Guardar usuario</Button>
        <Button variant="secundario" onClick={onCancelar}>Cancelar</Button>
      </div>
    </form>
  );
}
