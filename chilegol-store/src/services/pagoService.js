// Simulación de pago. No se conecta a ningún banco.
// Devuelve una Promesa (como haría una API real) que tarda un poco en responder.
//
// El pago se rechaza cuando:
//   1. El carrito está vacío
//   2. Algún producto no tiene stock suficiente (sumando todas sus tallas)
//   3. Se marca la opción "Simular rechazo del banco" (para mostrar la pantalla de error en la demo)

export function procesarPago({ items, total, simularRechazo = false }, demoraMs = 900) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!items || items.length === 0) {
        resolve({ aprobado: false, motivo: 'El carrito está vacío. Agrega al menos una camiseta para pagar.' });
        return;
      }

      // El stock es por camiseta, no por talla: sumo las unidades de cada producto
      const unidades = {};
      items.forEach((item) => {
        unidades[item.id] = (unidades[item.id] ?? 0) + item.cantidad;
      });
      const sinStock = items.find((item) => unidades[item.id] > item.stock);
      if (sinStock) {
        resolve({
          aprobado: false,
          motivo: `No hay stock suficiente de ${sinStock.nombre}: pediste ${unidades[sinStock.id]} y quedan ${sinStock.stock}.`,
        });
        return;
      }

      if (simularRechazo) {
        resolve({
          aprobado: false,
          motivo: 'El banco rechazó el pago. Revisa los datos de tu tarjeta o paga con otro medio.',
        });
        return;
      }

      resolve({
        aprobado: true,
        codigoAutorizacion: String(Math.floor(100000 + Math.random() * 900000)),
        total,
      });
    }, demoraMs);
  });
}
