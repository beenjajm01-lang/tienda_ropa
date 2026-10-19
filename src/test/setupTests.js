// Se carga antes que todas las pruebas.
// Cada prueba parte con el localStorage vacío, así ninguna depende de lo que dejó la anterior.
// (Testing Library limpia solo el HTML dibujado después de cada prueba.)

beforeEach(() => {
  localStorage.clear();
});
