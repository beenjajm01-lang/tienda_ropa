// Inicio de sesión. Admin y Vendedor van al panel; Cliente vuelve a donde estaba.

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/atoms/Button';
import Input from '../components/atoms/Input';
import FormGroup from '../components/molecules/FormGroup';
import logoCgs from '../assets/logo-cgs.svg';
import { autenticar, guardarSesion } from '../data/users';
import { validarCorreo, validarClave, DOMINIOS_PERMITIDOS } from '../utils/validaciones';

const CUENTAS_DE_PRUEBA = [
  { correo: 'admin@duoc.cl', clave: '1234', rol: 'Administrador' },
  { correo: 'vendedor@duoc.cl', clave: '1234', rol: 'Vendedor' },
  { correo: 'cliente@gmail.com', clave: '1234', rol: 'Cliente' },
];

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const aviso = location.state?.aviso;

  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { correo: location.state?.correo ?? '', clave: '' },
  });
  const [errorGeneral, setErrorGeneral] = useState('');

  const onSubmit = ({ correo, clave }) => {
    const usuario = autenticar(correo, clave);
    if (!usuario) {
      setErrorGeneral('Correo o contraseña incorrectos. Revisa las cuentas de prueba más abajo.');
      return;
    }
    const sesion = guardarSesion(usuario);
    if (onLogin) onLogin(sesion);

    if (sesion.rol === 'Cliente') {
      navigate(location.state?.desde ?? '/', { replace: true });
    } else {
      navigate('/admin', { replace: true });
    }
  };

  return (
    <main id="contenido" className="acceso">
      <div className="contenedor">
        <div className="acceso__marca">
          <img src={logoCgs} alt="" width="64" height="64" />
          <h1>ChileGol Store</h1>
        </div>

        <form className="formulario" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="formulario__cabecera">
            <h2>Inicio de sesión</h2>
          </div>

          <div className="formulario__cuerpo">
            {aviso && <p className="aviso" role="status">{aviso}</p>}

            <FormGroup id="correo" label="Correo" ayuda={`Solo ${DOMINIOS_PERMITIDOS}.`} error={errors.correo?.message}>
              <Input type="email" maxLength={100} autoComplete="email" {...register('correo', { validate: validarCorreo })} />
            </FormGroup>

            <FormGroup id="clave" label="Contraseña" ayuda="Entre 4 y 10 caracteres." error={errors.clave?.message}>
              <Input type="password" maxLength={10} autoComplete="current-password" {...register('clave', { validate: validarClave })} />
            </FormGroup>
          </div>

          {errorGeneral && (
            <p className="aviso aviso--alerta formulario__resultado" role="alert">{errorGeneral}</p>
          )}

          <div className="formulario__pie">
            <Button type="submit" variant="principal" className="boton--ancho">Iniciar sesión</Button>
            <p className="formulario__nota">
              ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>.
            </p>
          </div>
        </form>

        <div className="credenciales">
          <h2>Cuentas de prueba</h2>
          <table>
            <caption className="solo-lectores">Credenciales de demostración por rol</caption>
            <thead>
              <tr><th scope="col">Correo</th><th scope="col">Contraseña</th><th scope="col">Rol</th></tr>
            </thead>
            <tbody>
              {CUENTAS_DE_PRUEBA.map((cuenta) => (
                <tr key={cuenta.correo}>
                  <td>{cuenta.correo}</td>
                  <td>{cuenta.clave}</td>
                  <td>{cuenta.rol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
