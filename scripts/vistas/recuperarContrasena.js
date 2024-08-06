// Importar funciones de peticiones
import traerUsuarios from "../peticiones/listar/traerUsuarios.js";

// Importar funciones de validaciones
import camposVacios from "../validaciones/campos.js";
import longitudMaxima from "../validaciones/longitudMaxima.js";
import longitudMinima from "../validaciones/longitudMinima.js";
import extensionCorreo from "../validaciones/extensionCorreo.js";
import mensajeError from "../validaciones/complementos/mensajeError.js";
import invalido from "../validaciones/complementos/invalido.js";
import valido from "../validaciones/complementos/valido.js";

// Referencia al documento
const _d = document;

// Referencias a los inputs y el formulario
const _inputCorreo = _d.getElementById("correo");
const _form = _d.getElementById("form");

// Validar longitud máxima del campo correo
longitudMaxima(_inputCorreo, 50);

// Función para validar el formulario
const validarForm = (event) => {
  event.preventDefault(); // Prevenir el envío por defecto del formulario

  // Validar longitud mínima del campo correo
  const longitudCorreo = longitudMinima(_inputCorreo, 10);

  // Validar que el campo correo no esté vacío
  const inputCorreo = camposVacios(_inputCorreo);

  // Si alguna validación falla, salir de la función
  if (!inputCorreo || !longitudCorreo) {
    return;
  }

  // Llamar a la función para traer los usuarios y procesar la respuesta
  traerUsuarios().then(data => {
    // Validar extensión del correo
    extensionCorreo(_inputCorreo);

    // Buscar un usuario válido por correo
    const usuarioValido = data.find(usuario => usuario.correoInstitucional === _inputCorreo.value);

    // Guardar el usuario en localStorage
    localStorage.setItem('usuario', JSON.stringify(usuarioValido));

    // Si se encuentra un usuario con el correo proporcionado
    if (usuarioValido) {
      window.location.href = "codigoRecuperacion.html"; // Redirigir a la página de código de contraseña
    } else {
      // Mostrar mensaje de error si el usuario no es encontrado
      mensajeError("Usuario no encontrado, verifique los datos");
      invalido(_inputCorreo);
    }
  });
};

// Agregar evento de escucha al formulario para validar en el submit
_form.addEventListener("submit", validarForm);
