// Importar funciones de validaciones
import evitarCaracteres from "../validaciones/evitarCaracteres.js";
import longitudMaxima from "../validaciones/longitudMaxima.js";
import longitudMinima from "../validaciones/longitudMinima.js";
import mensajeError from "../validaciones/complementos/mensajeError.js";
import invalido from "../validaciones/complementos/invalido.js";
import valido from "../validaciones/complementos/valido.js";

// Importar herramientas
import generarCodigo from "../herramientas/generarCodigo.js";

// Referencia al documento
const _d = document;
let usuario; // Variable para almacenar el usuario actual

// Al cargar la página, obtener el usuario de localStorage si existe
_d.addEventListener("DOMContentLoaded", () => {
  usuario = JSON.parse(localStorage.getItem("usuario"));
  // console.log(usuario); // Descomentar para depuración
});

// Input de código
const _inputCodigo = _d.getElementById("codigo");

// Formulario
const _form = _d.getElementById("form");

// Almacenar el código generado cuando se carga la página
const codigoGenerado = generarCodigo();
console.log(codigoGenerado); // Mostrar el código generado en la consola

// Validar código ingresado por el usuario
const validarCodigo = () => {
  if (codigoGenerado !== _inputCodigo.value) {
    invalido(_inputCodigo); // Marcar el campo como inválido
    mensajeError("El código no coincide"); // Mostrar mensaje de error
    return false; // Retornar falso si el código no coincide
  } else {
    valido(_inputCodigo); // Marcar el campo como válido
    return true; // Retornar verdadero si el código coincide
  }
};

// Evitar que se escriban letras en el campo de código
evitarCaracteres(_inputCodigo, "numeros");

// Validar longitud máxima del código
longitudMaxima(_inputCodigo, 6);

// Función para cambiar a la vista de creación de perfil si el código es válido
const autenticarCodigo = () => {
  _form.reset(); // Reiniciar el formulario
  localStorage.setItem("usuario", JSON.stringify(usuario)); // Almacenar el usuario en localStorage
  window.location.href = "cambiarContrasena.html"; // Redireccionar a la página de cambio de contraseña
};

// Validar el formulario antes de enviarlo
const validarForm = (event) => {
  event.preventDefault(); // Prevenir el envío por defecto del formulario
  longitudMinima(_inputCodigo, 6); // Validar longitud mínima del código
  const codigoValido = validarCodigo(); // Validar el código ingresado

  // Si el código no es válido, detener el proceso
  if (!codigoValido) {
    return;
  }

  // Si el código es válido, autenticar y cambiar a la vista de creación de perfil
  autenticarCodigo();
};

// Agregar evento de escucha al formulario para validar el código en el submit
_form.addEventListener("submit", validarForm);
