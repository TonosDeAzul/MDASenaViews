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

// Limpiar localStorage al cargar la página
_d.addEventListener("DOMContentLoaded", () => {
  localStorage.clear();
});

// Referencias a los inputs
const _inputCorreo = _d.getElementById("correo");
const _inputContrasena = _d.getElementById("contrasena");

// Referencia al formulario
const _form = _d.getElementById("form");

// Validar longitud máxima de los campos
longitudMaxima(_inputCorreo, 50);
longitudMaxima(_inputContrasena, 100);

// Función para validar el formulario
const validarForm = (event) => {
  event.preventDefault(); // Prevenir envío por defecto

  // Validar longitud mínima de los campos
  const longitudCorreo = longitudMinima(_inputCorreo, 10);
  const longitudContrasena = longitudMinima(_inputContrasena, 8);

  // Validar que los campos no estén vacíos
  const inputCorreo = camposVacios(_inputCorreo);
  const inputContrasena = camposVacios(_inputContrasena);

  // Si alguna validación falla, salir de la función
  if (!inputCorreo || !inputContrasena || !longitudCorreo || !longitudContrasena) {
    return;
  }

  // Llamar a la función para traer los usuarios y procesar la respuesta
  traerUsuarios().then(data => {
    // Validar extensión del correo
    extensionCorreo(_inputCorreo);

    // Buscar un usuario válido
    const usuarioValido = data.find(
      usuario => usuario.correoInstitucional === _inputCorreo.value &&
        usuario.contrasena === _inputContrasena.value
    );

    // Guardar el usuario en localStorage
    localStorage.setItem('usuario', JSON.stringify(usuarioValido));

    // Redirigir según el rol del usuario
    if (usuarioValido && usuarioValido.estado === true) {
      switch (usuarioValido.idRolFK) {
        case "1":
          window.location.href = "viewsInstructor/inicio.html";
          break;
        case "2":
          window.location.href = "viewsAprendiz/inicio.html";
          break;
        case "3":
          window.location.href = "viewsMonitor/inicio.html";
          break;
        case "4":
          window.location.href = "viewsAdministrador/inicio.html";
          break;
        default:
          window.location.href = "login.html";
      }
    } else {
      // Mostrar mensaje de error si el usuario no es encontrado
      mensajeError("Usuario no encontrado, verifique los datos");
      invalido(_inputCorreo);
      invalido(_inputContrasena);
    }
  });
};

// Agregar evento de escucha al formulario para validar en el submit
_form.addEventListener("submit", validarForm);
