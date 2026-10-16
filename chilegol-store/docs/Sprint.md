# 🛍️ Sprint Único: ChileGol Store - Tienda de Camisetas de Fútbol

## Versión 2.0 con React

---

> **Estado del sprint (14 de octubre de 2026):** todo el desarrollo, las 10 pruebas y los documentos están listos.
> Queda pendiente: respaldar la versión 1 y subir el proyecto a GitHub (tareas 1.1 y 8.3) y preparar la presentación.
> Notas sobre lo implementado:
> - `public/images` tiene las imágenes de la versión 1 (logo, portada y 8 fotos de camisetas) y, para las camisetas que no tenían foto, ilustraciones SVG.
> - Además de los componentes del plan, se agregaron otros reutilizables (`PrecioProducto`, `CategoriaTile`, `ResumenPedido`, `CamposDireccion`, `Carrusel`, `RutaAdmin`) y contextos en `src/context/`.
> - Las secciones del panel admin están en `src/pages/admin/`.
> - Las pruebas usan `karma-webpack` + `babel-loader` (el paquete `babel-jasmine` del plan no fue necesario) y Testing Library.

## 📋 ¿Qué es este documento?

Este es mi plan de trabajo para convertir mi tienda de camisetas de fútbol (ChileGol Store) en una aplicación moderna usando React. Voy a explicarlo paso a paso como si fuera una lista de tareas que voy cumpliendo de a poco.

**Tiempo que tengo:** 1 semana
**Lo que voy a lograr:** Una tienda completa con React, pruebas y todo funcionando

---

## 🎯 Objetivos del Sprint

Al final de esta semana quiero tener:

1. ✅ Mi tienda funcionando con React (no solo HTML normal)
2. ✅ Componentes reutilizables (como piezas de lego que se pueden reusar)
3. ✅ Un archivo con los datos de mis productos (como una base de datos falsa)
4. ✅ Operaciones CRUD (agregar, ver, editar y borrar productos)
5. ✅ Bootstrap para que se vea bien en celular y computador
6. ✅ Categorías, ofertas y proceso de compra
7. ✅ Pantallas de compra exitosa y fallida
8. ✅ Panel de administración
9. ✅ 10 pruebas unitarias con Jasmine y Karma
10. ✅ Documentos de entrega listos

---

## 📅 Día 1: Preparar todo y entender React

### ¿Qué hago hoy?

Primero necesito entender qué es React y preparar mi computador.

### Tareas del Día 1

- [ ] **1.1** Respaldar mi tienda anterior (la versión con HTML y CSS)
  - Voy a subir todo a GitHub por si acaso
  - Así no pierdo nada si algo sale mal

- [ ] **1.2** Instalar Node.js en mi computador
  - Es como el motor que necesita React para funcionar
  - Lo descargo de la página oficial

- [x] **1.3** Crear mi proyecto React nuevo
  - Voy a usar el comando: `npm create vite@latest chilegol-store`
  - Vite es una herramienta que ayuda a crear proyectos React rápido

- [x] **1.4** Instalar Bootstrap
  - Es una biblioteca que me da botones y estilos ya hechos
  - Comando: `npm install bootstrap`

- [x] **1.5** Crear la estructura de carpetas

```
chilegol-store/
│
├── public/
│   └── images/          ← Aquí van las fotos de camisetas
│
├── src/
│   ├── components/      ← Piezas reutilizables (como lego)
│   │   ├── Navbar.jsx   ← La barra de arriba con menú
│   │   ├── Footer.jsx   ← El pie de página
│   │   ├── ProductCard.jsx  ← Tarjeta de producto
│   │   ├── ProductList.jsx  ← Lista de productos
│   │   └── CartItem.jsx     ← Artículo del carrito
│   │
│   ├── pages/           ← Las pantallas completas
│   │   ├── Home.jsx          ← Página de inicio
│   │   ├── Productos.jsx     ← Catálogo de productos
│   │   ├── DetalleProducto.jsx  ← Detalle de una camiseta
│   │   ├── Categorias.jsx    ← Ver por categorías
│   │   ├── Ofertas.jsx       ← Productos en oferta
│   │   ├── Carrito.jsx       ← El carrito de compras
│   │   ├── Checkout.jsx      ← Pago y dirección
│   │   ├── CompraExitosa.jsx ← ¡Compra exitosa!
│   │   ├── CompraFallida.jsx ← Error en la compra
│   │   ├── Login.jsx         ← Iniciar sesión
│   │   ├── Registro.jsx      ← Registrarse
│   │   ├── Nosotros.jsx      ← Sobre nosotros
│   │   ├── Blogs.jsx         ← Blog de la tienda
│   │   ├── DetalleBlog.jsx   ← Un blog específico
│   │   ├── Contacto.jsx      ← Formulario de contacto
│   │   └── Admin.jsx         ← Panel administrativo
│   │
│   ├── data/
│   │   └── productos.js      ← Mis datos simulados
│   │
│   ├── services/
│   │   └── productosService.js  ← Para manejar CRUD
│   │
│   ├── styles/
│   │   └── styles.css        ← Mis estilos propios
│   │
│   ├── App.jsx          ← El componente principal
│   └── main.jsx         ← Punto de entrada
│
├── tests/               ← Mis pruebas unitarias
├── package.json         ← Configuración del proyecto
└── README.md            ← Instrucciones
```

### 💡 Explicación simple para novatos

> **¿Qué es React?**
> React es como construir con lego. En vez de tener una página HTML gigante, la divido en pedacitos pequeños que se llaman "componentes". Cada pedacito hace una cosa. Si quiero cambiar algo, solo cambio ese pedacito sin tocar todo lo demás.

> **¿Qué es un componente?**
> Un componente es como una cajita que recibe información (props) y muestra algo en pantalla. Por ejemplo, mi componente `ProductCard` recibe el nombre y precio de una camiseta, y muestra una tarjeta bonita con esa info.

---

## 📅 Día 2: Migrar las páginas a componentes React

### ¿Qué hago hoy?

Tengo mi tienda en HTML normal. Ahora la voy a convertir en componentes de React.

### Tareas del Día 2

- [x] **2.1** Crear el componente `Navbar.jsx`
  - Es la barra de arriba con el logo y el menú
  - Tiene enlaces a: Inicio, Productos, Categorías, Ofertas, Contacto
  - También el ícono del carrito y botón de login

- [x] **2.2** Crear el componente `Footer.jsx`
  - Es la parte de abajo de la página
  - Información de contacto, redes sociales, copyright

- [x] **2.3** Crear la página `Home.jsx` (Inicio)
  - Un carrusel de imágenes (como un pase de diapositivas)
  - Productos destacados
  - Sección de ofertas
  - Categorías populares

- [x] **2.4** Crear la página `Productos.jsx` (Catálogo)
  - Muestra todos los productos de mi tienda
  - Usa el componente `ProductList`
  - Tiene un buscador para filtrar

- [x] **2.5** Crear el componente `ProductCard.jsx`
  - Muestra una camiseta con: foto, nombre, precio
  - Botón "Agregar al carrito"
  - Badge si está en oferta

- [x] **2.6** Crear el componente `ProductList.jsx`
  - Recibe una lista de productos y los muestra en cuadrícula
  - Cada producto se muestra con `ProductCard`

- [x] **2.7** Crear la página `DetalleProducto.jsx`
  - Muestra info completa de una camiseta
  - Foto grande, descripción, precio
  - Selector de talla
  - Botón de agregar al carrito

- [x] **2.8** Crear páginas de usuario: `Login.jsx` y `Registro.jsx`
  - Formularios para iniciar sesión y registrarse
  - Validaciones básicas (email válido, contraseña con mínimo 6 caracteres)

- [x] **2.9** Crear páginas informativas: `Nosotros.jsx`, `Contacto.jsx`
  - Nosotros: historia de la tienda
  - Contacto: formulario con nombre, email, mensaje

- [x] **2.10** Crear páginas de blog: `Blogs.jsx` y `DetalleBlog.jsx`
  - Lista de artículos
  - Vista individual de cada artículo

### 💡 Explicación simple para novatos

> **¿Qué son las props?**
> Las props son como cartas que le envío a un componente. Ejemplo: le envío a `ProductCard` una carta que dice: "nombre: Camiseta Colo-Colo, precio: 49990". El componente recibe la carta y muestra esos datos en pantalla.

> **¿Qué es el estado (state)?**
> El estado es como la memoria del componente. Si el usuario escribe en un buscador, el estado guarda lo que va escribiendo. Cuando el estado cambia, React vuelve a dibujar la pantalla automáticamente.

---

## 📅 Día 3: Archivo de datos y operaciones CRUD

### ¿Qué hago hoy?

Necesito un archivo que tenga todos mis productos, y poder agregar, editar y borrar productos.

### Tareas del Día 3

- [x] **3.1** Crear el archivo `src/data/productos.js`

```javascript
// Este archivo es como mi base de datos falsa
// Aquí guardo todos los productos de la tienda

const productos = [
  {
    id: 1,
    nombre: "Camiseta Colo-Colo Titular",
    precio: 49990,
    stock: 25,
    categoria: "Colo-Colo",
    enOferta: true,
    precioOferta: 39990,
    imagen: "/images/colocolo-titular.jpg",
    descripcion: "Camiseta oficial temporada 2026",
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 2,
    nombre: "Camiseta Universidad de Chile",
    precio: 52990,
    stock: 30,
    categoria: "U. de Chile",
    enOferta: false,
    imagen: "/images/uchile-titular.jpg",
    descripcion: "Camiseta oficial La U",
    tallas: ["S", "M", "L", "XL"]
  },
  {
    id: 3,
    nombre: "Camiseta Universidad Católica",
    precio: 51990,
    stock: 5,
    categoria: "U. Católica",
    enOferta: true,
    precioOferta: 42990,
    imagen: "/images/catolica-titular.jpg",
    descripcion: "Camiseta oficial Cruzados",
    tallas: ["S", "M", "L", "XL"]
  },
  // Agregaré más productos aquí...
];

export default productos;
```

- [x] **3.2** Crear `src/services/productosService.js`

```javascript
// Este archivo tiene las funciones para crear, leer, editar y borrar
// Se llama CRUD: Create, Read, Update, Delete

import productos from '../data/productos';

// Obtener todos los productos (Read)
export function obtenerProductos() {
  return productos;
}

// Buscar producto por id (Read)
export function obtenerProductoPorId(id) {
  return productos.find(producto => producto.id === id);
}

// Agregar producto nuevo (Create)
export function crearProducto(nuevoProducto) {
  const id = productos.length > 0
    ? Math.max(...productos.map(p => p.id)) + 1
    : 1;
  productos.push({ ...nuevoProducto, id });
  return productos;
}

// Modificar producto existente (Update)
export function actualizarProducto(id, datosActualizados) {
  const indice = productos.findIndex(p => p.id === id);
  if (indice !== -1) {
    productos[indice] = { ...productos[indice], ...datosActualizados };
  }
  return productos;
}

// Borrar producto (Delete)
export function eliminarProducto(id) {
  const indice = productos.findIndex(p => p.id === id);
  if (indice !== -1) {
    productos.splice(indice, 1);
  }
  return productos;
}

// Filtrar productos por categoría
export function obtenerPorCategoria(categoria) {
  return productos.filter(p => p.categoria === categoria);
}

// Filtrar productos en oferta
export function obtenerOfertas() {
  return productos.filter(p => p.enOferta);
}

// Buscar productos por nombre
export function buscarProductos(texto) {
  return productos.filter(p =>
    p.nombre.toLowerCase().includes(texto.toLowerCase())
  );
}
```

- [x] **3.3** Crear el contexto para el carrito
  - Un "contexto" es como una bolsa compartida
  - Todos los componentes pueden acceder al carrito desde ahí

- [x] **3.4** Conectar los componentes con los datos
  - Que `ProductList` muestre los productos del archivo
  - Que al agregar al carrito, se actualice el estado

### 💡 Explicación simple para novatos

> **¿Qué es CRUD?**
> - **C**reate = Crear: Agregar una camiseta nueva a la tienda
> - **R**ead = Leer: Ver las camisetas que hay
> - **U**pdate = Actualizar: Cambiar el precio de una camiseta
> - **D**elete = Eliminar: Quitar una camiseta de la tienda

> **¿Por qué un archivo de datos y no una base de datos real?**
> Por ahora es más fácil. Un archivo JavaScript con mis productos funciona como una base de datos falsa. Los componentes leen de ahí y pueden modificar los datos. No necesito instalar MySQL ni nada complicado.

---

## 📅 Día 4: Bootstrap, Responsividad y Carrito

### ¿Qué hago hoy?

Voy a hacer que mi tienda se vea bonita en todos los tamaños de pantalla, y terminar el carrito.

### Tareas del Día 4

- [x] **4.1** Configurar Bootstrap en mi proyecto
  - Importar Bootstrap en `main.jsx`
  - Usar clases de Bootstrap como `container`, `row`, `col`, `btn`, `card`

- [x] **4.2** Hacer responsivo el Navbar
  - En celular: menú hamburguesa (☰)
  - En computador: menú horizontal

- [x] **4.3** Hacer responsivo el catálogo de productos
  - En celular: 1 columna
  - En tableta: 2 columnas
  - En computador: 3 o 4 columnas

- [x] **4.4** Crear la página `Carrito.jsx`

```javascript
// El carrito muestra:
// - Lista de productos agregados
// - Foto, nombre, precio de cada uno
// - Cantidad (con botones + y -)
// - Subtotal de cada producto
// - Total de la compra
// - Botón "Vaciar carrito"
// - Botón "Seguir comprando"
// - Botón "Ir a pagar"
```

- [x] **4.5** Crear componente `CartItem.jsx`
  - Un solo artículo del carrito
  - Botón para aumentar cantidad
  - Botón para disminuir cantidad
  - Botón para eliminar del carrito

- [x] **4.6** Implementar el cálculo del total
  - Sumar (precio × cantidad) de todos los productos
  - Aplicar descuentos si están en oferta

- [x] **4.7** Probar la tienda en diferentes tamaños
  - Abrir en Chrome, presionar F12
  - Cambiar a modo celular
  - Verificar que todo se ve bien

### 💡 Explicación simple para novatos

> **¿Qué es Bootstrap?**
> Bootstrap es como un catálogo de estilos ya hechos. En vez de diseñar botones y tarjetas desde cero, uso clases como `btn btn-primary` y ya tengo un botón azul bonito. También me ayuda a que la página se adapte a celulares.

> **¿Qué significa "responsivo"?**
> Responsivo quiere decir que la página se ve bien tanto en celular como en tablet como en computador. Los elementos se reorganizan solos según el tamaño de pantalla.

---

## 📅 Día 5: Categorías, Ofertas, Checkout y Resultados de Compra

### ¿Qué hago hoy?

Agrego las pantallas nuevas: categorías, ofertas, el proceso de compra y qué pasa cuando la compra sale bien o mal.

### Tareas del Día 5

- [x] **5.1** Crear la página `Categorias.jsx`
  - Muestra las categorías disponibles: Colo-Colo, U. de Chile, U. Católica, etc.
  - Al hacer clic en una categoría, muestra solo esos productos
  - Tarjetas arriba con las categorías, productos abajo

- [x] **5.2** Crear la página `Ofertas.jsx`
  - Muestra solo los productos que tienen `enOferta: true`
  - Precio original tachado y precio de oferta

```javascript
// Así filtro las ofertas
const ofertas = productos.filter(producto => producto.enOferta);
```

- [x] **5.3** Crear la página `Checkout.jsx` (Pagar)
  - **Resumen del carrito**: productos, cantidades, precios, total
  - **Datos del cliente**: nombre, apellidos, correo
  - **Dirección**: calle, departamento (opcional), región, comuna, indicaciones (opcional)
  - **Botón de pago**
  - Si el usuario ya inició sesión → se rellenan sus datos automáticamente
  - Si no inició sesión → los pone a mano

```javascript
// Ejemplo de lógica del checkout:
// Usuario con sesión iniciada:
//   → Se autocompletan sus datos
//   → Solo revisa la dirección
//   → Confirma la compra

// Usuario sin sesión:
//   → Pone todo manualmente
//   → Confirma la compra
```

- [x] **5.4** Crear la página `CompraExitosa.jsx`
  - Mensaje: "¡Compra realizada con éxito!"
  - Número de orden (ej: ORD-001)
  - Datos del comprador
  - Dirección de entrega
  - Lista de productos comprados
  - Total pagado
  - Botón "Volver a la tienda"

- [x] **5.5** Crear la página `CompraFallida.jsx`
  - Mensaje: "No se pudo completar la compra"
  - Mostrar qué salió mal
  - Mostrar el resumen del pedido intentado
  - Botón "Intentar de nuevo"
  - Botón "Volver a la tienda"

- [x] **5.6** Configurar la navegación entre páginas
  - Usar React Router para cambiar de página
  - Cada página tiene su URL: `/`, `/productos`, `/carrito`, `/checkout`, etc.

---

## 📅 Día 6: Panel Administrativo

### ¿Qué hago hoy?

Creo el panel donde el administrador puede gestionar la tienda.

### Tareas del Día 6

- [x] **6.1** Crear la página `Admin.jsx` con diseño de dashboard
  - Menú lateral con opciones
  - Tarjetas de estadísticas arriba

- [x] **6.2** Sección: Dashboard (inicio del admin)
  - Total de ventas
  - Total de productos
  - Total de usuarios
  - Productos con stock bajo (productos "críticos")

- [x] **6.3** Sección: Productos (CRUD completo)
  - **Ver** listado de todos los productos
  - **Crear** producto nuevo (formulario con nombre, precio, stock, categoría, imagen)
  - **Editar** producto existente (cambiar precio, stock, descripción)
  - **Eliminar** producto con confirmación

- [x] **6.4** Sección: Categorías
  - Ver categorías existentes
  - Agregar categoría nueva
  - Editar nombre de categoría
  - Eliminar categoría

- [x] **6.5** Sección: Órdenes/Boletas
  - Lista de compras realizadas
  - Ver detalle de cada boleta

- [x] **6.6** Sección: Usuarios
  - Lista de usuarios registrados
  - Ver detalle de usuario
  - Editar usuario
  - Historial de compras del usuario

- [x] **6.7** Sección: Reportes
  - Gráficos simples de ventas
  - Productos más vendidos

- [x] **6.8** Sección: Perfil
  - Información del administrador
  - Cambiar contraseña

- [x] **6.9** Botón "Cerrar sesión"

---

## 📅 Día 7: Pruebas Unitarias con Jasmine y Karma

### ⭐ DÍA MÁS IMPORTANTE

### ¿Qué hago hoy?

Escribo 10 pruebas que comprueban que mi tienda funciona bien. ¡Esto es super importante!

### Tareas del Día 7

- [x] **7.1** Instalar Jasmine y Karma

```bash
npm install --save-dev jasmine karma karma-chrome-launcher karma-jasmine karma-jasmine-html-reporter
npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-jasmine
```

- [x] **7.2** Crear archivo de configuración `karma.conf.js`
  - Karma es el que ejecuta las pruebas en el navegador
  - Jasmine es el que define las pruebas

- [x] **7.3** Crear las 10 pruebas

| N.º  | Componente    | Qué comprueba la prueba                                    |
| ---- | ------------- | ---------------------------------------------------------- |
| 1    | ProductList   | Muestra todos los productos que recibe                     |
| 2    | ProductCard   | Muestra el nombre y precio correctos (props)               |
| 3    | ProductCard   | Al hacer clic en "Agregar", ejecuta la función del botón   |
| 4    | Cart          | Aumenta la cantidad de un producto                         |
| 5    | Cart          | Elimina un producto del carrito                            |
| 6    | Cart          | Calcula bien el total de la compra                         |
| 7    | Login         | Muestra error si el correo no es válido                    |
| 8    | Formulario    | Actualiza el estado cuando el usuario escribe              |
| 9    | Categorías    | Filtra correctamente los productos por categoría           |
| 10   | Checkout      | Muestra la página de compra fallida cuando hay error       |

- [x] **7.4** Ejecutar las pruebas y ver resultados

```bash
npx karma start
```

- [x] **7.5** Revisar que las 10 pruebas pasen (aparezcan en verde)

- [x] **7.6** Usar mocks (datos falsos para las pruebas)
  - Un "mock" es como un actor que hace de producto falso
  - Sirve para probar sin necesitar datos reales

- [x] **7.7** Revisar la cobertura
  - La cobertura dice qué porcentaje de mi código está probado
  - Quiero que sea lo más alta posible

### 💡 Explicación simple para novatos

> **¿Qué es una prueba unitaria?**
> Es como revisar cada pieza por separado antes de armar el rompecabezas. Ejemplo: "Si le paso la camiseta A al componente, ¿me muestra el nombre A?". Si dice sí, la prueba pasa ✅. Si dice no, algo está mal ❌.

> **¿Qué es Jasmine?**
> Jasmine es el programa que me deja escribir pruebas. Se ve así:
> ```javascript
> it('debería mostrar el nombre del producto', function() {
>   const nombre = 'Camiseta Colo-Colo';
>   expect(nombre).toBe('Camiseta Colo-Colo');
> });
> ```
> Significa: "prueba que el nombre sea Camiseta Colo-Colo".

> **¿Qué es Karma?**
> Karma es el que ejecuta esas pruebas en el navegador Chrome y me dice cuántas pasaron y cuántas fallaron.

> **¿Qué es un mock?**
> Un mock es un producto falso que invento solo para la prueba. Así no dependo de datos reales.

---

## 📅 Día 7 (continuación): Documentos de Entrega

### Tareas de documentación

- [x] **8.1** Crear documento **ERS V2** (Especificación de Requisitos)

```
Índice del documento ERS:
1. Introducción
2. Descripción de ChileGol Store
3. Objetivos del sistema
4. Alcance de esta versión
5. Usuarios y roles (cliente, administrador)
6. Requisitos funcionales (qué debe hacer)
7. Requisitos no funcionales (velocidad, diseño)
8. Requisitos de navegación (cómo se mueve el usuario)
9. Arquitectura frontend React (cómo está organizado)
10. Manejo de datos y persistencia (archivo de datos y CRUD)
11. Validaciones (formularios)
12. Módulo administrativo
13. Restricciones y supuestos
14. Actualizaciones respecto de la versión anterior
```

- [x] **8.2** Crear documento **Cobertura del Testing**

```
Índice del documento de testing:
1. Objetivo del testing
2. Alcance
3. Herramientas utilizadas (Jasmine, Karma)
4. Configuración de Jasmine y Karma
5. Componentes sometidos a prueba
6. Tabla de casos de prueba (las 10 pruebas)
7. Mocks utilizados
8. Resultados de ejecución (capturas de pantalla)
9. Cobertura de funcionalidades
10. Problemas detectados
11. Correcciones realizadas
12. Conclusiones del testing
```

- [ ] **8.3** Preparar todo para GitHub
  - Subir el código completo
  - Asegurar que el enlace público funcione
  - El README debe explicar cómo ejecutar el proyecto

- [x] **8.4** Comprimir el proyecto en un archivo .zip

---

## 📅 Preparación para la Presentación

### Tiempo: 15 minutos de demostración + 5 minutos de preguntas

| Tiempo    | Qué mostrar                                          |
| --------- | ----------------------------------------------------- |
| 0–2 min   | Qué es ChileGol Store y qué cambió de la versión 1    |
| 2–5 min   | Cómo funciona React: componentes, props y estados      |
| 5–7 min   | Bootstrap y cómo se ve en celular, tablet y computador |
| 7–10 min  | Productos, CRUD, carrito y checkout                    |
| 10–13 min | Ejecutar las 10 pruebas con Jasmine y Karma (en vivo)  |
| 13–15 min | Mostrar mocks, cobertura, resultados y GitHub          |

### Puntos que debo poder explicar (me van a preguntar)

- [ ] ¿Cómo diseñé el frontend?
- [ ] ¿Cómo desarrollé los componentes React?
- [ ] ¿Cómo funcionan las props y los estados?
- [ ] ¿Cómo apliqué Bootstrap?
- [ ] ¿Cómo hice las pruebas con Jasmine y Karma?
- [ ] ¿Cómo configuré y ejecuté las pruebas?
- [ ] ¿Qué son los mocks y cómo los usé?
- [ ] ¿Cómo analicé los resultados de cobertura?
- [ ] ¿Qué hice yo específicamente en el proyecto?

---

## 📦 Entregables Finales

| N.º | Entregable                                                | Estado |
| --- | --------------------------------------------------------- | ------ |
| 1   | Enlace público del proyecto en GitHub                     | ⬜     |
| 2   | Proyecto completo comprimido (.zip)                       | ✅     |
| 3   | Documento ERS V2 actualizado                              | ✅     |
| 4   | Documento de cobertura del testing                        | ✅     |

---

## ✅ Lista de Verificación Final

Antes de entregar, reviso que todo esté:

### React y Componentes
- [x] Todo el proyecto funciona con React (no HTML suelto)
- [x] Tengo componentes reutilizables (Navbar, Footer, ProductCard, etc.)
- [x] Uso props para pasar información entre componentes
- [x] Uso estados para manejar datos que cambian
- [x] Cada componente tiene una sola responsabilidad (Single Responsibility)

### Datos y CRUD
- [x] Tengo el archivo `productos.js` con mis datos
- [x] Puedo crear productos nuevos
- [x] Puedo ver la lista de productos
- [x] Puedo editar productos existentes
- [x] Puedo eliminar productos
- [x] Los componentes están conectados con los datos

### Diseño
- [x] Bootstrap está instalado y funcionando
- [x] La tienda se ve bien en celular
- [x] La tienda se ve bien en tablet
- [x] La tienda se ve bien en computador

### Pantallas nuevas
- [x] Página de Categorías funciona
- [x] Página de Ofertas funciona
- [x] Carrito de compras funciona
- [x] Checkout con formulario de dirección funciona
- [x] Si el usuario está logueado, se autocompletan sus datos
- [x] Página de Compra Exitosa funciona
- [x] Página de Compra Fallida funciona

### Panel Administrativo
- [x] Dashboard con estadísticas
- [x] Puedo crear productos
- [x] Puedo editar productos
- [x] Puedo eliminar productos
- [x] Gestión de categorías
- [x] Gestión de usuarios
- [x] Ver órdenes/boletas

### Pruebas
- [x] Jasmine y Karma instalados y configurados
- [x] 10 pruebas escritas
- [x] Las 10 pruebas se ejecutan sin errores
- [x] Usé mocks en algunas pruebas
- [x] Revisé la cobertura de pruebas

### Documentos
- [x] ERS V2 completado
- [x] Documento de cobertura del testing completado
- [ ] README con instrucciones en GitHub
- [x] Proyecto comprimido en .zip

### Presentación
- [ ] Practiqué explicar cada parte del proyecto
- [ ] Sé explicar qué hice yo y qué hizo mi compañero
- [ ] Puedo ejecutar las pruebas en vivo sin errores

---

## 🗂️ Estructura Final del Proyecto

```
chilegol-store/
│
├── public/
│   └── images/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductList.jsx
│   │   └── CartItem.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Productos.jsx
│   │   ├── DetalleProducto.jsx
│   │   ├── Categorias.jsx
│   │   ├── Ofertas.jsx
│   │   ├── Carrito.jsx
│   │   ├── Checkout.jsx
│   │   ├── CompraExitosa.jsx
│   │   ├── CompraFallida.jsx
│   │   ├── Login.jsx
│   │   ├── Registro.jsx
│   │   ├── Nosotros.jsx
│   │   ├── Blogs.jsx
│   │   ├── DetalleBlog.jsx
│   │   ├── Contacto.jsx
│   │   └── Admin.jsx
│   │
│   ├── data/
│   │   └── productos.js
│   │
│   ├── services/
│   │   └── productosService.js
│   │
│   ├── styles/
│   │   └── styles.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── tests/
│   ├── ProductList.spec.js
│   ├── ProductCard.spec.js
│   ├── Cart.spec.js
│   ├── Login.spec.js
│   ├── Formulario.spec.js
│   ├── Categorias.spec.js
│   └── Checkout.spec.js
│
├── karma.conf.js
├── package.json
└── README.md
```

---

## 📝 Resumen de lo que debo hacer (versión corta)

Si solo leo esto, sé que tengo que:

1. **Crear una app React** con Vite y Bootstrap
2. **Convertir mis páginas HTML** en componentes React
3. **Crear un archivo de datos** con todos mis productos
4. **Implementar CRUD** para crear, ver, editar y borrar productos
5. **Hacer el carrito de compras** con cantidades y total
6. **Crear el checkout** con formulario de dirección
7. **Crear pantallas** de compra exitosa y fallida
8. **Crear páginas de categorías y ofertas**
9. **Crear el panel administrativo** completo
10. **Escribir 10 pruebas** con Jasmine y Karma y que pasen todas
11. **Hacer 2 documentos**: ERS y Cobertura de Testing
12. **Subir todo a GitHub** y comprimir el proyecto
13. **Practicar la presentación** de 15 minutos

---

*"De a poco se llega. No tengo que saberlo todo desde el principio, solo seguir el plan día a día."*
