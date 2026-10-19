// Campo de formulario (input, textarea o select) compatible con register() de react-hook-form.
// En React 19 "ref" llega como una prop más, así que react-hook-form puede leer el valor.

export default function Input({ as: Etiqueta = "input", invalido = false, children, ...props }) {
  return (
    <Etiqueta aria-invalid={invalido ? "true" : "false"} {...props}>
      {children}
    </Etiqueta>
  );
}
