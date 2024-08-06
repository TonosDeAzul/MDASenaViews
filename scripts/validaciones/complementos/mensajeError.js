const _d = document;
const _body = _d.body;

// Función para mostrar mensaje
let mensajeMostrado = false; // Variable global para controlar la impresión
export default function mensajeError(mensaje) {
  let _span;
  if (_span) {
    _span.remove();
    _span = null;
  } else if (!mensajeMostrado) {
    _span = _d.createElement("span");
    _span.textContent = mensaje;
    _span.classList.add(
      "w-96",
      "absolute",
      "left-0",
      "right-0",
      "m-auto",
      "text-white",
      "text-center",
      "p-5",
      "rounded-lg",
      "bg-red-600",
      "z-10"
    );
    _body.appendChild(_span);
    mensajeMostrado = true;
    // Eliminar el mensaje después de 2 segundos
    setTimeout(() => {
      if (_span) {
        _span.remove();
        _span = null;
        mensajeMostrado = false; // Restablecer la variable para futuras llamadas
      }
    }, 3000);
  };
};
