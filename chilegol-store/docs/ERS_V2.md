# Especificación de Requisitos de Software (ERS)

**Proyecto:** ChileGol Store, tienda de camisetas de fútbol
**Versión del documento:** 2.0
**Fecha:** octubre de 2026
**Versión del sistema:** 2.0 (frontend en React)

---

## 1. Introducción

### 1.1 Propósito

Este documento describe qué debe hacer ChileGol Store en su versión 2.0. Sirve como referencia para el desarrollo, para las pruebas y para la evaluación del proyecto.

### 1.2 Definiciones

| Término | Significado |
| --- | --- |
| Componente | Pieza reutilizable de la interfaz hecha en React (por ejemplo, `ProductCard`). |
| Props | Datos que un componente recibe de su componente padre. |
| Estado (state) | Datos que un componente recuerda y que, al cambiar, hacen que React vuelva a dibujar la pantalla. |
| Contexto | Estado compartido por toda la aplicación (carrito, sesión, datos de la tienda). |
| CRUD | Crear, leer, actualizar y eliminar (Create, Read, Update, Delete). |
| Mock | Dato falso usado solo en las pruebas. |
| SPA | Aplicación de una sola página: se cambia de pantalla sin recargar el navegador. |

### 1.3 Referencias

- Plan de trabajo del sprint: [Sprint.md](Sprint.md)
- Documento de cobertura del testing: [Cobertura_Testing.md](Cobertura_Testing.md)

---

## 2. Descripción de ChileGol Store

ChileGol Store es una tienda online que vende camisetas de clubes del fútbol chileno (Colo-Colo, Universidad de Chile, Universidad Católica y otros) y de la Selección Chilena, incluyendo réplicas retro. El cliente puede ver el catálogo, filtrar por categoría, revisar ofertas, armar un carrito y pagar. El administrador gestiona productos, categorías, órdenes y usuarios desde un panel.

Esta versión es solo frontend: los datos se simulan con archivos JavaScript y se guardan en el navegador. No hay servidor ni pagos reales.

---

## 3. Objetivos del sistema

1. Permitir que un cliente encuentre y compre una camiseta en pocos pasos, desde el celular o el computador.
2. Mostrar con claridad precios, ofertas y stock disponible.
3. Dar al administrador herramientas para mantener el catálogo y revisar las ventas.
4. Construir la tienda con componentes React reutilizables, fáciles de mantener y de probar.
5. Verificar el funcionamiento con pruebas unitarias automatizadas.

---

## 4. Alcance de esta versión

**Incluye:**

- Migración completa de la tienda HTML a React con Vite.
- Catálogo con buscador, filtro por categoría y orden por precio o nombre.
- Detalle de producto con selección de talla y cantidad.
- Páginas de categorías y ofertas.
- Carrito con cantidades, subtotales, descuentos y total.
- Checkout con datos del cliente y dirección (región y comuna de Chile), autocompletado para usuarios con sesión.
- Pantallas de compra exitosa y compra fallida.
- Registro, inicio y cierre de sesión.
- Panel de administración: dashboard, CRUD de productos, categorías, órdenes/boletas, usuarios, reportes y perfil.
- Diseño responsivo con Bootstrap.
- 10 pruebas unitarias con Jasmine y Karma, con reporte de cobertura.

**No incluye:**

- Servidor (backend) ni base de datos real.
- Pagos reales ni conexión con Webpay u otra pasarela.
- Envío real de correos.
- Contraseñas encriptadas.

---

## 5. Usuarios y roles

| Rol | Descripción | Puede |
| --- | --- | --- |
| Visitante | Persona que entra sin iniciar sesión. | Ver productos, usar el carrito, comprar como invitado, registrarse, enviar mensajes de contacto. |
| Cliente | Usuario registrado con rol `cliente`. | Todo lo del visitante, más el autocompletado de sus datos en el checkout. |
| Administrador | Usuario con rol `admin`. | Todo lo anterior, más el acceso al panel `/admin`. |

Cuentas de prueba: `admin@chilegol.cl / admin123` y `cliente@chilegol.cl / cliente123`.

---

## 6. Requisitos funcionales

### 6.1 Catálogo y productos

| ID | Requisito | Prioridad |
| --- | --- | --- |
| RF-01 | El sistema muestra todos los productos en una cuadrícula con foto, nombre, categoría y precio. | Alta |
| RF-02 | El usuario puede buscar productos por nombre; la lista se actualiza mientras escribe. | Alta |
| RF-03 | El usuario puede filtrar el catálogo por categoría y ordenarlo por precio (menor/mayor) o nombre. | Media |
| RF-04 | Los productos en oferta muestran el precio de oferta, el precio normal tachado y el porcentaje de descuento. | Alta |
| RF-05 | Los productos con 5 unidades o menos muestran el aviso "Quedan N unidades"; los productos sin stock muestran "Agotado" y no se pueden agregar. | Media |
| RF-06 | El detalle de producto muestra foto grande, descripción, precio, tallas disponibles, selector de cantidad (limitado al stock) y productos relacionados de la misma categoría. | Alta |
| RF-07 | La página de categorías muestra una tarjeta por categoría con su cantidad de productos; al elegir una, se ven solo sus productos. | Alta |
| RF-08 | La página de ofertas muestra solo los productos con `enOferta: true`, ordenados del mayor al menor descuento. | Alta |
| RF-09 | La portada muestra un carrusel, las categorías, los productos destacados y las ofertas. | Media |

### 6.2 Carrito

| ID | Requisito | Prioridad |
| --- | --- | --- |
| RF-10 | El usuario puede agregar productos al carrito desde la tarjeta (talla M por defecto) o desde el detalle (talla y cantidad elegidas). | Alta |
| RF-11 | Al agregar un producto aparece un aviso de confirmación con enlace al carrito. | Baja |
| RF-12 | El carrito muestra foto, nombre, talla, precio unitario, cantidad, subtotal y total. | Alta |
| RF-13 | El usuario puede aumentar o disminuir la cantidad (entre 1 y el stock) y eliminar productos. | Alta |
| RF-14 | El usuario puede vaciar el carrito después de confirmar. | Media |
| RF-15 | El total se calcula sumando precio × cantidad de cada artículo, usando el precio de oferta cuando corresponde, y muestra el ahorro total por ofertas. | Alta |
| RF-16 | El ícono del carrito en la barra superior muestra la cantidad de camisetas. | Media |
| RF-17 | El carrito se mantiene al recargar la página. | Media |

### 6.3 Checkout y resultado de la compra

| ID | Requisito | Prioridad |
| --- | --- | --- |
| RF-18 | El checkout muestra el resumen del carrito y pide nombre, apellidos, correo, calle, departamento (opcional), región, comuna e indicaciones (opcional). | Alta |
| RF-19 | Las comunas disponibles dependen de la región elegida. | Media |
| RF-20 | Si el usuario inició sesión, sus datos y su dirección guardada se completan automáticamente. Si no, se ofrece iniciar sesión. | Alta |
| RF-21 | Al pagar, el sistema valida el stock actual y simula la respuesta del pago. | Alta |
| RF-22 | Si el pago se aprueba, se crea una orden con número correlativo (ORD-001, ORD-002...), se descuenta el stock, se vacía el carrito y se muestra la pantalla de compra exitosa con número de orden, datos del comprador, dirección, productos y total pagado. | Alta |
| RF-23 | Si el pago falla, se muestra la pantalla de compra fallida con el motivo, el resumen del pedido intentado y los botones "Intentar de nuevo" (que recupera lo escrito) y "Volver a la tienda". El carrito no se vacía. | Alta |
| RF-24 | El checkout permite simular un rechazo del banco para demostrar la pantalla de compra fallida. | Media |

### 6.4 Usuarios

| ID | Requisito | Prioridad |
| --- | --- | --- |
| RF-25 | El visitante puede registrarse con nombre, apellidos, correo, teléfono (opcional) y contraseña. No se permiten correos repetidos. | Alta |
| RF-26 | El usuario puede iniciar sesión con correo y contraseña; si son incorrectos se muestra un error. | Alta |
| RF-27 | Después de iniciar sesión, el administrador va al panel y el cliente vuelve a la página desde donde venía. | Media |
| RF-28 | El usuario puede cerrar sesión desde la barra superior o desde el panel. | Alta |

### 6.5 Páginas informativas

| ID | Requisito | Prioridad |
| --- | --- | --- |
| RF-29 | La página Nosotros presenta la historia de la tienda. | Baja |
| RF-30 | La página Contacto tiene un formulario con nombre, correo, motivo y mensaje (con contador de caracteres) y muestra una confirmación al enviarse. | Media |
| RF-31 | El blog lista artículos con fecha y tiempo de lectura; cada artículo tiene su propia página. | Baja |
| RF-32 | Las direcciones que no existen muestran una página 404. | Baja |

### 6.6 Panel de administración

Ver el detalle en la sección 12 (RF-33 a RF-45).

---

## 7. Requisitos no funcionales

| ID | Requisito |
| --- | --- |
| RNF-01 | **Responsivo:** la tienda se adapta a celular (1 columna de productos), tablet (2 columnas) y computador (3 o 4 columnas). En celular el menú se abre con el botón ☰. |
| RNF-02 | **Rendimiento:** las pantallas cambian sin recargar el navegador (SPA). Las imágenes del catálogo se cargan de forma diferida (solo cuando aparecen en pantalla). |
| RNF-03 | **Usabilidad:** los mensajes de error dicen qué está mal y cómo corregirlo (por ejemplo, "Ingresa un correo válido, por ejemplo nombre@correo.cl"). |
| RNF-04 | **Accesibilidad:** foco visible al navegar con teclado, etiquetas en todos los campos, textos alternativos y botones con nombre descriptivo. El carrusel se detiene si el usuario prefiere menos movimiento. |
| RNF-05 | **Diseño:** identidad propia con los colores de la bandera (azul #0B1F4B, rojo #D52B1E y blanco), tipografías Big Shoulders Display (títulos y precios) y Figtree (texto). Las fuentes se instalan con npm, así que funcionan sin internet. El logo (`logo-cgs.svg`), la portada (`hero-tienda.svg` con la imagen de Huevito Rey) y las fotos de las camisetas vienen de la versión 1. |
| RNF-06 | **Mantenibilidad:** cada componente tiene una sola responsabilidad. La lógica de datos está en `services/`, los cálculos en `utils/` y el estado compartido en `context/`. |
| RNF-07 | **Calidad:** el proyecto tiene 10 pruebas unitarias automatizadas que deben pasar antes de entregar, y el código se revisa con oxlint. |
| RNF-08 | **Compatibilidad:** funciona en las versiones actuales de Chrome, Edge, Firefox y Safari. |

---

## 8. Requisitos de navegación

La navegación usa React Router. Cada pantalla tiene su propia URL, por lo que se puede volver atrás con el navegador o compartir un enlace.

| Ruta | Pantalla | Acceso |
| --- | --- | --- |
| `/` | Inicio | Todos |
| `/productos` (`?buscar=texto`) | Catálogo | Todos |
| `/productos/:id` | Detalle de producto | Todos |
| `/categorias` (`?c=Categoría`) | Categorías | Todos |
| `/ofertas` | Ofertas | Todos |
| `/carrito` | Carrito | Todos |
| `/checkout` | Pago | Todos |
| `/compra-exitosa` | Compra exitosa | Después de pagar |
| `/compra-fallida` | Compra fallida | Después de un pago rechazado |
| `/login`, `/registro` | Cuenta | Todos |
| `/nosotros`, `/contacto` | Información | Todos |
| `/blogs`, `/blogs/:id` | Blog | Todos |
| `/admin` y subrutas | Panel de administración | Solo administradores |
| Cualquier otra | Página 404 | Todos |

**Flujo de compra:**

```
Catálogo / Categorías / Ofertas
        │  Agregar al carrito
        ▼
     Carrito ──── Seguir comprando ───► Catálogo
        │  Ir a pagar
        ▼
     Checkout ─── ¿Tienes cuenta? Ingresa ─► Login ─► vuelve al Checkout con datos completos
        │  Pagar
        ├── aprobado ──► Compra exitosa ──► Volver a la tienda
        └── rechazado ─► Compra fallida ──► Intentar de nuevo (Checkout) / Revisar carrito / Volver a la tienda
```

**Protección del panel:** si alguien sin sesión entra a `/admin`, se le envía al login y, después de ingresar, vuelve al panel. Si entra un cliente, ve un aviso de que la sección es solo para administradores.

---

## 9. Arquitectura frontend React

### 9.1 Tecnologías

| Herramienta | Uso |
| --- | --- |
| React 19 | Componentes, props, estado y hooks (`useState`, `useEffect`, `useReducer`, `useContext`). |
| Vite 8 | Servidor de desarrollo y compilación. |
| React Router 7 | Navegación entre páginas. |
| Bootstrap 5.3 y Bootstrap Icons | Grilla responsiva, formularios, botones, tablas e íconos. |
| Jasmine 4, Karma 6 y Testing Library | Pruebas unitarias en Chrome. |

### 9.2 Organización de carpetas

```
src/
├── App.jsx            Contextos + definición de rutas
├── main.jsx           Carga Bootstrap, fuentes y estilos; monta <App /> en BrowserRouter
├── components/        Componentes reutilizables
├── context/           AuthContext, TiendaContext, CartContext
├── data/              Datos simulados
├── pages/             Páginas (una por ruta) y pages/admin
├── services/          CRUD y simulación de pago
├── styles/styles.css  Estilos propios
└── utils/             formato.js, precios.js, validaciones.js, constantes.js
```

### 9.3 Componentes reutilizables

| Componente | Responsabilidad | Props principales |
| --- | --- | --- |
| `Navbar` | Menú superior, carrito y sesión; menú ☰ en celular. | (usa contextos) |
| `Footer` | Contacto, enlaces y redes sociales. | - |
| `ProductCard` | Tarjeta de un producto con botón para agregar. | `producto`, `onAgregar` |
| `ProductList` | Cuadrícula de `ProductCard` o mensaje vacío. | `productos`, `onAgregar`, `mensajeVacio` |
| `CartItem` | Un artículo del carrito con botones +, − y quitar. | `item`, `onAumentar`, `onDisminuir`, `onEliminar` |
| `PrecioProducto` | Precio normal o de oferta con precio tachado. | `producto`, `grande` |
| `CategoriaTile` | Tarjeta de categoría con sus colores (enlace o botón). | `categoria`, `cantidad`, `to`, `seleccionada`, `onSeleccionar` |
| `ResumenPedido` | Lista de productos y total (checkout, resultados y boletas). | `items`, `total`, `titulo` |
| `CamposDireccion` | Calle, depto., región, comuna (dependiente) e indicaciones. | `valores`, `errores`, `onCambio` |
| `Carrusel` | Diapositivas de la portada con avance automático. | `diapositivas` |
| `AvisoCarrito` | Aviso temporal al agregar al carrito. | (usa contexto) |
| `RutaAdmin` | Protege las rutas del panel. | `children` |
| `CabeceraPagina`, `ScrollAlInicio` | Título de página y volver arriba al navegar. | `titulo`, `descripcion` |

### 9.4 Estado compartido (contextos)

| Contexto | Guarda | Funciones |
| --- | --- | --- |
| `CartContext` | Artículos del carrito, total, unidades y aviso. Usa un reducer (`carritoReducer`). | `agregar`, `aumentar`, `disminuir`, `eliminar`, `vaciar` |
| `AuthContext` | Usuario conectado, lista de usuarios y si es administrador. | `iniciarSesion`, `cerrarSesion`, `registrarse`, `editarUsuario`, `cambiarPassword` |
| `TiendaContext` | Productos, categorías y órdenes. | CRUD de productos y categorías, `registrarOrden`, `cambiarEstadoOrden`, `restablecerDatos` |

Los tres contextos aceptan datos iniciales opcionales; las pruebas los usan para trabajar con mocks.

---

## 10. Manejo de datos y persistencia

- Los datos iniciales están en `src/data/`: 17 productos, 5 categorías, 5 usuarios, 8 órdenes de ejemplo, 16 regiones con sus comunas y 4 artículos de blog.
- Los componentes nunca modifican los datos directamente: pasan por los servicios de `src/services/`, que funcionan como una API simulada. `productosService.js` tiene `obtenerProductos`, `obtenerProductoPorId`, `crearProducto`, `actualizarProducto`, `eliminarProducto`, `obtenerPorCategoria`, `obtenerOfertas` y `buscarProductos`. Los demás servicios siguen el mismo patrón.
- El id de un producto nuevo es el mayor id existente + 1. Las órdenes usan un número correlativo con formato `ORD-000`.
- Cada cambio se guarda en el `localStorage` del navegador (`storage.js`), por lo que sobrevive a una recarga. Si el navegador no permite `localStorage`, la tienda funciona igual con los datos del archivo.
- La simulación de pago (`pagoService.js`) devuelve una promesa que tarda 0,9 segundos, como lo haría una API real.
- Desde Admin > Perfil se pueden restablecer todos los datos de ejemplo.

---

## 11. Validaciones

Todas las validaciones están en `src/utils/validaciones.js` y se muestran debajo de cada campo con el estilo de error de Bootstrap.

| Formulario | Campo | Regla |
| --- | --- | --- |
| Login | Correo | Formato válido (texto@dominio.ext). |
| Login | Contraseña | Mínimo 6 caracteres. |
| Login | Ambos | Si no coinciden con una cuenta: "Correo o contraseña incorrectos." |
| Registro | Nombre, apellidos | Obligatorios. |
| Registro | Correo | Formato válido y no registrado antes. |
| Registro | Contraseña / repetir | Mínimo 6 caracteres y deben coincidir. |
| Registro | Términos | Deben aceptarse. |
| Contacto | Nombre, motivo | Obligatorios. |
| Contacto | Correo | Formato válido. |
| Contacto | Mensaje | Entre 10 y 500 caracteres (con contador). |
| Checkout | Nombre, apellidos, calle, región, comuna | Obligatorios. |
| Checkout | Correo | Formato válido. |
| Checkout | Stock | La cantidad pedida de cada camiseta (sumando tallas) no puede superar su stock actual. |
| Admin, producto | Nombre | Mínimo 3 caracteres. |
| Admin, producto | Precio / stock | Enteros; precio mayor que 0 y stock igual o mayor que 0. |
| Admin, producto | Precio de oferta | Obligatorio si está en oferta y menor que el precio normal. |
| Admin, producto | Categoría y tallas | Elegir una categoría y al menos una talla. |
| Admin, categoría | Nombre | Mínimo 3 caracteres y sin repetir. No se elimina si tiene productos. |
| Admin, usuario | Correo | Formato válido y no usado por otro usuario. |
| Admin, perfil | Contraseña | La actual debe ser correcta; la nueva con mínimo 6 caracteres y confirmada. |

---

## 12. Módulo administrativo

Disponible en `/admin` solo para usuarios con rol `admin`. Tiene un menú lateral (en celular se convierte en una barra horizontal) y los botones "Ver tienda" y "Cerrar sesión".

| ID | Sección | Requisito |
| --- | --- | --- |
| RF-33 | Dashboard | Muestra total de ventas, cantidad de órdenes, productos y usuarios. |
| RF-34 | Dashboard | Lista los productos con stock crítico (5 o menos) con enlace para reponer. |
| RF-35 | Dashboard | Lista las últimas 5 órdenes con enlace a su boleta. |
| RF-36 | Productos | Lista todos los productos con búsqueda por nombre. |
| RF-37 | Productos | Crea productos con nombre, categoría, precio, stock, oferta, imagen, descripción, tallas y destacado. |
| RF-38 | Productos | Edita cualquier dato de un producto existente. |
| RF-39 | Productos | Elimina productos después de una confirmación. |
| RF-40 | Categorías | Lista, agrega (con nombre, descripción y dos colores), edita y elimina categorías. Al renombrar, los productos se actualizan. |
| RF-41 | Órdenes | Lista las órdenes con búsqueda y filtro por estado; permite cambiar el estado (Pagada, Enviada, Entregada, Anulada). |
| RF-42 | Órdenes | Muestra la boleta con cliente, despacho, productos, neto, IVA (19%) y total, y permite imprimirla. |
| RF-43 | Usuarios | Lista los usuarios, muestra su detalle, permite editarlos (datos, rol y dirección) y muestra su historial de compras. |
| RF-44 | Reportes | Muestra ventas totales, ticket promedio, unidades vendidas y gráficos de barras de ventas por mes, productos más vendidos y ventas por categoría. |
| RF-45 | Perfil | Muestra los datos del administrador, permite cambiar la contraseña y restablecer los datos de ejemplo. |

---

## 13. Restricciones y supuestos

**Restricciones**

- No existe backend: los datos viven en el navegador de cada usuario. Lo que crea un administrador en su navegador no lo ve otra persona en otro computador.
- Las contraseñas se guardan sin encriptar. Es aceptable solo porque es una simulación académica.
- El pago es simulado. No se piden ni guardan datos de tarjetas.
- El stock se controla por camiseta, no por talla.
- Las fotos de las camisetas (personajes con la camiseta de cada club) vienen del repositorio de la versión 1. Las camisetas que no tenían foto (visitas, retro, Selección, Everton) usan ilustraciones SVG. Los nombres, escudos y marcas que aparecen se usan solo con fines académicos.

**Supuestos**

- El usuario usa un navegador moderno con JavaScript activado.
- Todos los precios están en pesos chilenos e incluyen IVA.
- El envío es gratis a todo Chile y demora de 2 a 5 días hábiles.

---

## 14. Actualizaciones respecto de la versión anterior

| Aspecto | Versión 1 | Versión 2 |
| --- | --- | --- |
| Tecnología | HTML, CSS y JavaScript sin framework: `index.html` y 6 páginas en `pages/` (productos, nosotros, contacto, login, registro y carrito) | Aplicación React con Vite (SPA) con 16 páginas |
| Estructura | Cada archivo HTML con su propio contenido y 4 scripts compartidos (`datos.js`, `carrito.js`, `productos.js`, `principal.js`) | Componentes reutilizables (`Navbar`, `Footer`, `ProductCard`...), contextos y servicios |
| Datos | 8 camisetas y 4 usuarios en `scripts/datos.js` | 17 camisetas, categorías, usuarios y órdenes en `src/data/` + servicios CRUD + `localStorage` |
| Navegación | Enlaces entre archivos `.html` | React Router con rutas y parámetros |
| Diseño | Estilos propios | Bootstrap 5 + estilos propios, responsivo en celular, tablet y computador |
| Catálogo | Lista de 8 camisetas | 17 camisetas con buscador, filtros, orden, tallas, categorías y ofertas |
| Compra | Página de carrito | Carrito con cantidades y descuentos, checkout con autocompletado y pantallas de compra exitosa y fallida |
| Administración | Roles definidos en los datos (Administrador, Vendedor, Cliente) | Panel con dashboard, CRUD, órdenes/boletas, usuarios, reportes y perfil |
| Calidad | Sin pruebas | 10 pruebas unitarias con Jasmine y Karma, con reporte de cobertura |
