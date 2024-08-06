import mensajeError from "./complementos/mensajeError.js";
import valido from "./complementos/valido.js";
import invalido from "./complementos/invalido.js";

// Función para validar extensión de correos
export default function validarExtensionCorreo(input) {
  const regexInstructor = /^[a-zA-Z0-9.]+@sena\.edu\.co$/i;
  const regexAprendiz = /^[a-zA-Z0-9.]+@soy\.sena\.edu\.co$/;
  if (!regexInstructor.test(input.value) && !regexAprendiz.test(input.value)) {
    invalido(input);
    mensajeError("Extensión del correo no permitida");
    return false;
  } else {
    valido(input);
    return true;
  }
};
