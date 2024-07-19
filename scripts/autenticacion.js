import { validarInput, valido, invalido, mensajeError, evitarLetras } from "./validarInputs.js";
// Documento
const _d = document;
let usuario; // Variable para almacenar el usuario actual
// Al cargar la página, obtener el usuario de localStorage si existe
_d.addEventListener("DOMContentLoaded", () => {
  usuario = JSON.parse(localStorage.getItem("usuario"));
});
// Input de código
const _inputCodigo = _d.getElementById("codigo");
// Formulario
const _form = _d.getElementById("form");
// Función para generar un código aleatorio de 6 dígitos
const generarCodigo = () => {
  const numero = Math.floor(100000 + Math.random() * 900000);
  return numero.toString(); 
};
// Almacenar el código generado cuando se carga la página
const codigoGenerado = generarCodigo();
console.log(codigoGenerado);
// Validar código ingresado por el usuario
const validarCodigo = () => {
  if (codigoGenerado !== _inputCodigo.value) {
    invalido(_inputCodigo);
    mensajeError("El código no coincide")
    return false;
  } else {
    valido(_inputCodigo);
    return true;
  }
};
// Función para evitar que se escriban letras
evitarLetras(_inputCodigo, 7);
// Función para cambiar a la vista de creación de perfil si el código es válido
const autenticarCodigo = () => {
  _form.reset(); // Reiniciar el formulario
  localStorage.setItem("usuario", JSON.stringify(usuario)); // Almacenar el usuario en localStorage
  window.location.href = "crearPerfil.html"; // Redireccionar a la página de creación de perfil
}
// Validar el formulario antes de enviarlo
const validarForm = (event) => {
  event.preventDefault();
  const codigoValido = validarCodigo();
  // Validar el código ingresado por el usuario
  if(!codigoValido){
    return; // Si el código no es válido, detener el proceso
  }
  // Si el código es válido, autenticar y cambiar a la vista de creación de perfil
  autenticarCodigo();
};
// Agregar evento de escucha al formulario para validar el código
_form.addEventListener("submit", validarForm);