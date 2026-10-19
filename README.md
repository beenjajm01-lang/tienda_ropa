# ChileGol Store 2.0 (React)

Tienda online de camisetas del fútbol chileno, migrada de HTML/CSS/JS a **React + Vite** con Atomic Design, **react-hook-form**, persistencia en **localStorage** y 10 pruebas unitarias con **Jasmine y Karma**.

Proyecto de la asignatura Desarrollo Fullstack II, Duoc UC.

## Integrantes

1. Vicente Saez
2. Benjamín Pizarro

## Cómo ejecutarlo

Requisitos: Node.js 20.19 o superior y Google Chrome (para las pruebas).

```bash
npm install
npm run dev        # tienda en http://localhost:5173
```

| Comando | Qué hace |
| --- | --- |
| `npm run build` | Genera la versión final en `dist/` |
| `npm run lint` | Revisa el código con ESLint |
| `npm test` | Abre Chrome y ejecuta las 10 pruebas (vuelve a correrlas si cambias un archivo) |
| `npm run test:ci` | Ejecuta las pruebas una vez, sin ventana, y deja la cobertura en `coverage/index.html` |

## Cuentas de prueba

| Correo | Contraseña | Rol | Puede |
| --- | --- | --- | --- |
| admin@duoc.cl | 1234 | Administrador | Todo el panel: productos y usuarios |
| vendedor@duoc.cl | 1234 | Vendedor | Ver el panel y el listado de productos, sin modificar |
| cliente@gmail.com | 1234 | Cliente | Comprar en la tienda (no entra al panel) |

## Rutas

| Ruta | Página |
| --- | --- |
| `/` | Inicio |
| `/productos`, `/products/:id` | Catálogo y detalle |
| `/categorias` | Productos por categoría |
| `/carrito`, `/checkout`, `/pago-exitoso` | Compra |
| `/nosotros`, `/contacto` | Información y formulario de contacto |
| `/login`, `/registro` | Cuenta de usuario |
| `/admin` | Panel: resumen y stock crítico |
| `/admin/productos` | CRUD de productos (`?nuevo` o `?editar=ID` abre el formulario) |
| `/admin/usuarios` | CRUD de usuarios (solo Administrador) |

## Estructura

```
src/
├── assets/            Logo y estilos del panel (admin.css). Los estilos generales están en index.css
├── components/
│   ├── atoms/         Button, Input, Text, Image
│   ├── molecules/     ProductCard, FormGroup (etiqueta + campo + ayuda + error)
│   ├── organisms/     NavbarHeader, AdminSidebar, ProductForm, UserForm
│   └── templates/     MainLayout (tienda) y AdminLayout (panel protegido por rol)
├── data/              products.js y users.js: datos iniciales + CRUD con localStorage, regiones.js
├── pages/             Una página por ruta
├── test/              setupTests.js, mocks/ y las pruebas en atoms/, molecules/ y pages/
└── utils/             validaciones.js (reglas de la v1 para react-hook-form) y formato.js
```

## Datos y persistencia

Los productos y usuarios parten de `src/data/products.js` y `src/data/users.js`. Todo cambio hecho desde el panel o el registro se guarda en `localStorage` (`cgs_productos`, `cgs_usuarios`, `cgs_sesion`, `cgs_carrito`). Para volver a los datos iniciales, borra los datos del sitio en el navegador.

## Validaciones de los formularios

Son las mismas de la versión 1 (`src/utils/validaciones.js`), aplicadas con react-hook-form:

- Correo: obligatorio, máximo 100 caracteres, solo `@duoc.cl`, `@profesor.duoc.cl` y `@gmail.com`.
- Contraseña: entre 4 y 10 caracteres.
- RUN: sin puntos ni guion, 7 a 9 caracteres, con dígito verificador (módulo 11).
- Nombre 50, apellidos 100, dirección 300 y mensaje de contacto 500 caracteres como máximo.
- Producto: código de 3 o más caracteres sin repetir, precio y stock mayores o iguales a 0, stock entero, categoría obligatoria.

## Documentos

- [Cobertura del testing](docs/Cobertura_Testing.md)
