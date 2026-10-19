// Gestión de usuarios (solo Administrador). Nadie se elimina ni cambia su propio perfil.

import { useState } from 'react';
import { Navigate, useOutletContext, useSearchParams } from 'react-router-dom';
import Button from '../components/atoms/Button';
import UserForm from '../components/organisms/UserForm';
import {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
  existeRunOCorreo,
  CLAVE_INICIAL,
} from '../data/users';
import { nombreDeRegion } from '../data/regiones';

const ETIQUETA_ROL = {
  Administrador: 'etiqueta etiqueta--ok',
  Vendedor: 'etiqueta etiqueta--aviso',
  Cliente: 'etiqueta',
};

export default function AdminUsers() {
  const { usuario: sesion, permisos, onSesionCambiada } = useOutletContext();
  const [usuarios, setUsuarios] = useState(getUsuarios);
  const [parametros, setParametros] = useSearchParams();
  const [porEliminar, setPorEliminar] = useState(null);
  const [aviso, setAviso] = useState('');

  if (permisos.usuarios === 'ninguno') {
    return <Navigate to="/admin" replace state={{ aviso: 'Tu rol no tiene acceso al módulo de usuarios.' }} />;
  }

  const idEditar = parametros.get('editar');
  const enEdicion = idEditar ? usuarios.find((u) => u.id === Number(idEditar)) : null;
  const formularioAbierto = parametros.has('nuevo') || Boolean(enEdicion);

  function refrescar(mensaje) {
    setUsuarios(getUsuarios());
    setAviso(mensaje);
  }

  function guardar(datos) {
    if (existeRunOCorreo(datos.run, datos.correo, enEdicion?.id ?? null)) {
      return { ok: false, error: 'Ya existe otro usuario con ese RUN o ese correo.' };
    }

    if (enEdicion) {
      // si el select de perfil estaba bloqueado, se mantiene el perfil
      actualizarUsuario(enEdicion.id, { ...datos, tipo: datos.tipo ?? enEdicion.tipo });
      if (enEdicion.id === sesion.id && onSesionCambiada) onSesionCambiada();
      refrescar(`Usuario actualizado: ${datos.nombre.trim()} ${datos.apellidos.trim()}.`);
    } else {
      crearUsuario(datos);
      refrescar(`Usuario creado con la clave inicial ${CLAVE_INICIAL}.`);
    }
    setParametros({});
    return { ok: true };
  }

  function confirmarEliminar(u) {
    eliminarUsuario(u.id);
    setPorEliminar(null);
    refrescar(`Usuario eliminado: ${u.nombre} ${u.apellidos}.`);
  }

  return (
    <>
      <div className="trabajo__cabecera">
        <h1>Usuarios</h1>
        {!formularioAbierto && (
          <Button variant="principal" onClick={() => { setAviso(''); setParametros({ nuevo: '' }); }}>Nuevo usuario</Button>
        )}
      </div>

      {aviso && <p className="aviso mb-4" role="status">{aviso}</p>}

      {formularioAbierto && (
        <UserForm
          key={enEdicion?.id ?? 'nuevo'}
          usuario={enEdicion}
          esUnoMismo={enEdicion?.id === sesion.id}
          onGuardar={guardar}
          onCancelar={() => setParametros({})}
        />
      )}

      <div className="tabla-envoltorio">
        <table className="tabla">
          <caption>Listado de usuarios del sistema ({usuarios.length})</caption>
          <thead>
            <tr>
              <th scope="col">RUN</th>
              <th scope="col">Nombre</th>
              <th scope="col">Correo</th>
              <th scope="col">Perfil</th>
              <th scope="col">Ubicación</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td>{u.run}</td>
                <td>{u.nombre} {u.apellidos}</td>
                <td>{u.correo}</td>
                <td><span className={ETIQUETA_ROL[u.tipo] ?? 'etiqueta'}>{u.tipo}</span></td>
                <td>{nombreDeRegion(u.region)}, {u.comuna}</td>
                <td>
                  {porEliminar === u.id ? (
                    <div className="tabla__confirmar">
                      <span>¿Eliminar a {u.nombre}?</span>
                      <Button variant="peligro" className="boton--pequeno" onClick={() => confirmarEliminar(u)}>Sí, eliminar</Button>
                      <Button variant="secundario" className="boton--pequeno" onClick={() => setPorEliminar(null)}>No</Button>
                    </div>
                  ) : (
                    <div className="tabla__acciones">
                      <Button variant="secundario" className="boton--pequeno"
                        onClick={() => { setAviso(''); setParametros({ editar: String(u.id) }); }}>
                        Editar<span className="solo-lectores"> {u.nombre} {u.apellidos}</span>
                      </Button>
                      <Button variant="peligro" className="boton--pequeno" disabled={u.id === sesion.id}
                        onClick={() => setPorEliminar(u.id)}>
                        Eliminar<span className="solo-lectores"> {u.nombre} {u.apellidos}</span>
                      </Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
