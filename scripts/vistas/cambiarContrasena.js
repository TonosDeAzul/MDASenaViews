// Importar funciones de peticiones
import traerUsuarios from "../peticiones/listar/traerUsuarios.js";
import cambiarContrasena from "../peticiones/editar/modificarContrasena.js";

// Importar funciones de validaciones
import camposVacios from "../validaciones/campos.js";
import longitudMaxima from "../validaciones/longitudMaxima.js";
import longitudMinima from "../validaciones/longitudMinima.js";
import mensajeError from "../validaciones/complementos/mensajeError.js";
import invalido from "../validaciones/complementos/invalido.js";
import valido from "../validaciones/complementos/valido.js";

// Referencia al documento
const _d = document;
let usuario; // Variable para almacenar el usuario actual

// Al cargar la página, obtener el usuario de localStorage si existe
_d.addEventListener("DOMContentLoaded", () => {
  usuario = JSON.parse(localStorage.getItem("usuario"));
  console.log(usuario); // Mostrar el usuario actual en la consola
});

// Referencias a los inputs y el formulario
const _inputContrasena = _d.getElementById("contrasena");
const _inputConfirmarContrasena = _d.getElementById("confirmarContrasena");
const _form = _d.getElementById("form");

// Validar longitud máxima de los campos contraseña y confirmar contraseña
longitudMaxima(_inputContrasena, 100);
longitudMaxima(_inputConfirmarContrasena, 100);

// Función para validar el formulario
const validarForm = (event) => {
  event.preventDefault(); // Prevenir el envío por defecto del formulario

  // Validar que los campos no estén vacíos
  const inputContrasena = camposVacios(_inputContrasena);
  const inputConfirmarContrasena = camposVacios(_inputConfirmarContrasena);

  // Validar longitud mínima de los campos
  const longitudContrasena = longitudMinima(_inputContrasena, 8);
  const longitudConfirmarContrasena = longitudMinima(
    _inputConfirmarContrasena,
    8
  );

  // Si alguna validación falla, salir de la función
  if (
    !inputContrasena ||
    !inputConfirmarContrasena ||
    !longitudContrasena ||
    !longitudConfirmarContrasena
  ) {
    return;
  }

  // Validar que las contraseñas coincidan
  if (_inputContrasena.value !== _inputConfirmarContrasena.value) {
    mensajeError("Las contraseñas no coinciden"); // Mostrar mensaje de error
    invalido(_inputContrasena); // Marcar el campo como inválido
    invalido(_inputConfirmarContrasena); // Marcar el campo como inválido
    return;
  }

  // Llamar a la función para traer los usuarios y procesar la respuesta
  traerUsuarios().then((usuarios) => {
    if (usuarios) {
      // Encontrar el usuario por ID
      const usuarioId = usuarios.find((usuarios) => usuarios.id === usuario.id);

      if (usuarioId) {
        // Actualizar la información del usuario
        usuarioId.correoInstitucional = usuario.correoInstitucional;
        usuarioId.contrasena = _inputConfirmarContrasena.value;
        usuarioId.idRolFK = usuario.idRolFK;

        // Llamar a la función para cambiar la contraseña
        cambiarContrasena(usuarioId.id, usuarioId);

        // Otras acciones necesarias después de cambiar la contraseña
        // console.log(usuarioId); // Descomentar para depuración
      } else {
        mensajeError("Usuario no encontrado"); // Mostrar mensaje de error si el usuario no es encontrado
      }
    } else {
      mensajeError("Error al traer usuarios"); // Mostrar mensaje de error si no se pueden traer los usuarios
    }
  });
};

// Agregar evento de escucha al formulario para validar el formulario en el submit
_form.addEventListener("submit", validarForm);
