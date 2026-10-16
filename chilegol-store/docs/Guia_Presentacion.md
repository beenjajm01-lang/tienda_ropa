# Guía para la presentación (15 + 5 minutos)

## Antes de empezar

1. `npm install` (si es un computador nuevo).
2. Abrir dos terminales: una con `npm run dev` y otra lista para `npm test`.
3. En la tienda, entrar a Admin > Perfil > **Restablecer datos de ejemplo** para partir con los datos limpios.
4. Tener abiertos: la tienda (`http://localhost:5173`), el repositorio en GitHub y `coverage/index.html`.

## Guion

| Tiempo | Qué mostrar | Dónde |
| --- | --- | --- |
| 0–2 min | Qué es ChileGol Store y qué cambió desde la versión 1 (tabla de la sección 14 del ERS). | Portada de la tienda |
| 2–5 min | Componentes, props y estado (ver respuestas abajo). | `ProductCard.jsx`, `ProductList.jsx`, `Productos.jsx` |
| 5–7 min | Bootstrap y responsividad: abrir F12 > modo celular, mostrar menú ☰, catálogo en 1, 2 y 4 columnas, panel admin en celular. | Chrome DevTools |
| 7–10 min | Comprar como invitado con "Simular rechazo" (compra fallida), luego "Intentar de nuevo" (compra exitosa). Ingresar como cliente y mostrar el autocompletado. Ingresar como admin, crear un producto y verlo en la tienda. | Tienda y `/admin` |
| 10–13 min | Ejecutar `npm test` en vivo: Chrome muestra "10 specs, 0 failures". | Terminal y Chrome |
| 13–15 min | Abrir `tests/mocks/datos.js` y `tests/Checkout.spec.js` (mocks y spy), el reporte de cobertura y el repositorio. | Editor y navegador |

## Respuestas a las preguntas que pueden hacer

**¿Cómo diseñé el frontend?**
Separé la tienda en páginas (`src/pages`, una por URL) y componentes reutilizables (`src/components`). Los datos están en `src/data` y se leen y modifican solo a través de los servicios (`src/services`). Lo que tienen que compartir varias pantallas, como el carrito o el usuario conectado, está en contextos (`src/context`). Para el diseño usé los colores de la bandera y una tipografía condensada tipo marcador de estadio para títulos y precios.

**¿Cómo desarrollé los componentes React?**
Cada componente es una función que recibe props y devuelve JSX. Por ejemplo, `ProductList` recibe una lista y dibuja un `ProductCard` por cada producto con `productos.map(...)`. Cada uno tiene una sola tarea: `ProductCard` dibuja una tarjeta, `CartItem` una línea del carrito, `PrecioProducto` solo el precio.

**¿Cómo funcionan las props y los estados?**
- *Props:* datos que el padre le pasa al hijo. En `Home.jsx`: `<ProductList productos={destacados} onAgregar={agregarRapido} />`. El hijo no puede cambiarlas.
- *Estado:* memoria del componente. En `Productos.jsx`, `const [busqueda, setBusqueda] = useState('')` guarda lo que se escribe en el buscador; cada vez que cambia, React vuelve a dibujar la lista filtrada.
- *Estado compartido:* el carrito usa `useReducer` dentro de `CartContext.jsx`; cualquier componente lo lee con `useCart()`.

**¿Cómo apliqué Bootstrap?**
Se importa en `main.jsx`. Uso la grilla (`container`, `row`, `col-12 col-md-6`, `row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4` para el catálogo), el `navbar` con `navbar-expand-lg`, formularios (`form-control`, `is-invalid`, `invalid-feedback`), tablas, alertas, badges y botones. En `styles.css` cambié los colores de los botones con las variables de Bootstrap (`--bs-btn-bg`).

**¿Cómo hice las pruebas con Jasmine y Karma?**
Jasmine define las pruebas (`describe`, `it`, `expect`) y Karma las ejecuta en Chrome. Con Testing Library dibujo el componente, busco elementos como lo haría un usuario (`getByText`, `getByLabelText`, `getByRole`) y simulo acciones con `fireEvent.click` o `fireEvent.change`.

**¿Cómo configuré y ejecuté las pruebas?**
En `karma.conf.js`: framework `jasmine`, los archivos de `tests/` en orden, Webpack con Babel para entender JSX, el plugin Istanbul para medir cobertura y Chrome como navegador. Se ejecutan con `npm test` (Chrome visible) o `npm run test:ci` (una vez, sin ventana).

**¿Qué son los mocks y cómo los usé?**
Datos o funciones falsas para probar sin depender de los datos reales. En `tests/mocks/datos.js` hay productos, categorías y un carrito de prueba. En la prueba 10, el pago real se reemplaza por `jasmine.createSpy('procesarPago')` que responde "rechazado"; así la prueba es rápida y siempre da el mismo resultado. En la prueba 3, el spy comprueba que el botón llamó a la función con el producto correcto.

**¿Cómo analicé los resultados de cobertura?**
Después de `npm run test:ci` se abre `coverage/index.html`. Los componentes tienen 87 % de cobertura y las páginas probadas sobre 70 %. El total es 41,5 % de líneas porque el CRUD del panel admin y los servicios no tienen pruebas automáticas (se probaron a mano). Como próximo paso, propondría pruebas para `productosService.js` y `validaciones.js`.

**¿Qué hice yo específicamente en el proyecto?**
_Completar con lo que hizo cada integrante del equipo._

- Integrante 1:
- Integrante 2:
