import { validarInput, valido, invalido, mensajeError, longitudMinima, longitudMaxima, validarExtensionCorreo } from "./validarInputs.js";
// Documento
const _d = document;
// Limpiar localStorage al cargar la página
_d.addEventListener("DOMContentLoaded", () => {
  localStorage.clear();
});
// Inputs
const _inputCorreo = _d.getElementById("correo");
const _inputContrasena = _d.getElementById("contrasena");
// Formulario
// export const _body = _d.getElementById("body");
const _form = _d.getElementById("form");
// Función para traer usuario
const getUsuario = () => {
  return fetch(`http://localhost:3000/tb_usuarios`)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

longitudMaxima(_inputCorreo, 50);
longitudMaxima(_inputContrasena, 100);

// Función para validar formulario
const validarForm = (event) => {
  event.preventDefault();
  const longitudCorreo = longitudMinima(_inputCorreo, 10);
  const longitudContraseña = longitudMinima(_inputContrasena, 8);
  // Valida que los campos no estén vacíos
  const inputCorreo = validarInput(_inputCorreo);
  const inputContrasena = validarInput(_inputContrasena);
  if(!inputCorreo || !inputContrasena || !longitudCorreo || !longitudContraseña){
    return;
  }
  // Se llama a la función y se guarda su respuesta en el objeto data
  getUsuario().then(data => {
    validarExtensionCorreo(_inputCorreo);
    // Se busca dentro del objeto usurio si coinciden el correo y la contraseña
    const usuarioValido = data.find(
      usuario => usuario.correoInstitucional === _inputCorreo.value
        && usuario.contrasena === _inputContrasena.value);
    // Guardar el usuario en localStorage
    localStorage.setItem('usuario', JSON.stringify(usuarioValido));
    // Si se encuentra un usuario con el que coincidan los datos
    // Se rediccionará a otra vista
    if (usuarioValido) {
      if (usuarioValido.idRolFK === "1") {
        window.location.href = "viewsInstructor/inicio.html";
      } else if (usuarioValido.idRolFK === "2") {
        window.location.href = "viewsAprendiz/inicio.html";
      } else {
        window.location.href = "viewsMonitor/inicio.html";
      }
    }
    // Si no se encuentra un usuario con el que coincidan los datos
    // Dirá el error
    else {
      mensajeError("Usuario no encontrado, verifique los datos");
      invalido(_inputCorreo);
      invalido(_inputContrasena);
    }
  });

};
// Agregar evento de escucha al formulario
_form.addEventListener("submit", validarForm);