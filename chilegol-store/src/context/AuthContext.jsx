// Contexto de sesión: quién está conectado y si es administrador.

import { createContext, useContext, useState } from 'react';
import {
  autenticar,
  guardarSesion,
  obtenerUsuarioSesion,
  cerrarSesionGuardada,
  registrarUsuario,
  obtenerUsuarios,
  actualizarUsuario,
  cambiarPassword as cambiarPasswordServicio,
} from '../services/usuariosService';

const AuthContext = createContext(null);

// usuarioInicial sirve para las pruebas (por ejemplo, simular un usuario conectado)
export function AuthProvider({ children, usuarioInicial }) {
  const [usuario, setUsuario] = useState(() =>
    usuarioInicial !== undefined ? usuarioInicial : obtenerUsuarioSesion()
  );
  const [usuarios, setUsuarios] = useState(() => obtenerUsuarios());

  function iniciarSesion(email, password) {
    const encontrado = autenticar(email, password);
    if (!encontrado) {
      return { ok: false, error: 'Correo o contraseña incorrectos.' };
    }
    guardarSesion(encontrado.id);
    setUsuario(encontrado);
    return { ok: true, usuario: encontrado };
  }

  function cerrarSesion() {
    cerrarSesionGuardada();
    setUsuario(null);
  }

  function registrarse(datos) {
    const resultado = registrarUsuario(datos);
    if (resultado.ok) {
      guardarSesion(resultado.usuario.id);
      setUsuario(resultado.usuario);
      setUsuarios(obtenerUsuarios());
    }
    return resultado;
  }

  function editarUsuario(id, datos) {
    const actualizado = actualizarUsuario(id, datos);
    setUsuarios(obtenerUsuarios());
    // Si el usuario editado es el que está conectado, actualizo la sesión
    if (usuario && usuario.id === actualizado.id) {
      setUsuario(actualizado);
    }
    return actualizado;
  }

  function cambiarPassword(actual, nueva) {
    if (!usuario) return { ok: false, error: 'Debes iniciar sesión.' };
    return cambiarPasswordServicio(usuario.id, actual, nueva);
  }

  // Para el botón "Restablecer datos" del panel de administración
  function recargarUsuarios() {
    setUsuarios(obtenerUsuarios());
  }

  const valor = {
    usuario,
    usuarios,
    esAdmin: usuario?.rol === 'admin',
    iniciarSesion,
    cerrarSesion,
    registrarse,
    editarUsuario,
    cambiarPassword,
    recargarUsuarios,
  };

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  }
  return contexto;
}
