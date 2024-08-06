import mensajeError from "./complementos/mensajeError.js";
import valido from "./complementos/valido.js";
import invalido from "./complementos/invalido.js";

// Validar si hay campos vacíos o con espacios (" ")
export default function campoVacio(input) {
  const regexEspacio = /^(?!\s*$).+/;
  if (input.value === "" || !regexEspacio.test(input.value)) {
    invalido(input);
    mensajeError("Datos inválidos, verifique los campos");
    return false;
  } else {
    valido(input);
    return true;
  }
}
