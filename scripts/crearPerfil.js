import { validarInput, valido, invalido, mensajeError, evitarLetras, evitarNumeros, longitudMinima } from "./validarInputs.js";
// Documento
const _d = document;
let usuario;
// Al cargar la página, obtener el usuario de localStorage si existe
_d.addEventListener("DOMContentLoaded", () => {
  usuario = JSON.parse(localStorage.getItem("usuario"));
});
// Inputs
const _inputNombre = _d.getElementById("nombre");
const _inputApellidos = _d.getElementById("apellidos");
const _inputDocumento = _d.getElementById("documento");
const _inputCentro = _d.getElementById("centro");
// Formulario
const _form = _d.getElementById("form");
// Obtener usuarios
const getUsuario = () => {
  return fetch(`http://localhost:3000/tb_usuarios`)
    .then(response => response.json())
    .then(data => {
      let idUsuarioFk;
      data.forEach(user => {
        if (user.correoInstitucional === usuario.correoInstitucional) {
          idUsuarioFk = user.id;
        };
      });
      return {
        nombre: _inputNombre.value,
        apellidos: _inputApellidos.value,
        documento: _inputDocumento.value,
        centroFormacion: _inputCentro.value,
        idUsuarioFk: idUsuarioFk
      }
    });
};
// Crear perfil
const crearPerfil = (perfil) => {
  fetch(`http://localhost:3000/tb_perfil`, {
    method: "POST",
    body: JSON.stringify(perfil),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      _form.reset();
      window.location.href = "login.html";
    });
}
evitarNumeros(_inputNombre, 50);
evitarNumeros(_inputApellidos, 50);
evitarNumeros(_inputCentro, 100);
evitarLetras(_inputDocumento, 10);

// Verificar formulario
const validarForm = (event) => {
  event.preventDefault();

  
  const inputNombre = validarInput(_inputNombre);
  const inputApellidos = validarInput(_inputApellidos);
  const inputDocumento = validarInput(_inputDocumento);
  const inputCentro = validarInput(_inputCentro);
  const longitudNombre = longitudMinima(_inputNombre, 5);
  const longitudApellidos = longitudMinima(_inputApellidos, 5);
  const longitudDocumento = longitudMinima(_inputDocumento, 8);
  const longitudCentro = longitudMinima(_inputCentro, 4);

  if(
    !inputNombre || !inputApellidos || 
    !inputDocumento || !inputCentro || 
    !longitudNombre || !longitudApellidos ||
    !longitudDocumento || !longitudCentro){
    return;
  }

  getUsuario().then(data => {
    crearPerfil(data);
  })

};
_form.addEventListener("submit", validarForm);