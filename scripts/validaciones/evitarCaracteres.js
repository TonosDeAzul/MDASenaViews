export default function evitarCaracteres(input, tipo) {
  // Variable para almacenar la referencia al elemento de error
  let _span;
  // Definir las expresiones regulares y los mensajes de error según el tipo
  let regex, mensajeError;
  if (tipo === "numeros") {
    regex = /^[0-9]$/;
    mensajeError = "Solo se permiten números";
  } else if (tipo === "letras") {
    regex = /^[a-zA-ZàáâãéêíóôõúüñÑ ]$/;
    mensajeError = "Solo se permiten letras";
  }

  input.addEventListener("keypress", (event) => {
    // Si ya existe el mensaje de error, lo elimina
    if (_span) {
      _span.remove();
      _span = null;
    }
    if (!regex.test(event.key)) {
      event.preventDefault();
      // Crear y mostrar el mensaje de error
      _span = document.createElement("span");
      _span.textContent = mensajeError;
      _span.classList.add("text-red-600", "text-end");
      input.closest("label").insertAdjacentElement("afterend", _span);
    }
  });

  input.addEventListener("blur", () => {
    // Eliminar el mensaje de error cuando se pierde el foco
    if (_span) {
      _span.remove();
      _span = null;
    }
  });
}
