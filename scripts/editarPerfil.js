import { validarInput, longitudMinima, longitudMaxima, evitarNumeros, evitarLetras, modalActualizar } from "./validarInputs.js";
// Documento
const _d = document;
let usuario;
// Al cargar la página, obtener el usuario de localStorage si existe
_d.addEventListener("DOMContentLoaded", () => {
  usuario = JSON.parse(localStorage.getItem("usuario"));
  // console.log(usuario);
});
// Inputs
const _inputNombre = _d.getElementById("nombre");
const _inputApellidos = _d.getElementById("apellidos");
const _inputDocumento = _d.getElementById("documento");
const _inputCentro = _d.getElementById("centro");
// Formulario
const _form = _d.getElementById("form");
// Obtener perfil
const getPerfil = () => {
  return fetch(`http://localhost:3000/tb_perfil`)
    .then((response) => response.json())
    .then(perfiles => {
      const perfilUsuario = perfiles.find(perfil => perfil.idUsuarioFk === usuario.id);
      return perfilUsuario;
    });
};
// Colocar datos en el form
getPerfil().then((perfil) => {
  _inputNombre.value = perfil.nombre;
  _inputApellidos.value = perfil.apellidos;
  _inputDocumento.value = perfil.documento;
  _inputCentro.value = perfil.centroFormacion;
});
// Actualizar perfil
const actualizarPerfil = (idPerfil, data) => {
  fetch(`http://localhost:3000/tb_perfil/${idPerfil}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    // .then((json) => console.log(json));
};
evitarNumeros(_inputNombre);
longitudMaxima(_inputNombre, 50);
evitarNumeros(_inputApellidos);
longitudMaxima(_inputApellidos, 50);
evitarLetras(_inputDocumento);
longitudMaxima(_inputDocumento, 10);
evitarNumeros(_inputCentro);
longitudMaxima(_inputCentro, 100);
// Verificar formulario
_form.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputNombre = validarInput(_inputNombre);
  const inputApellidos = validarInput(_inputApellidos);
  const inputDocumento = validarInput(_inputDocumento);
  const inputCentro = validarInput(_inputCentro);
  const longitudNombre = longitudMinima(_inputNombre, 5);
  const longitudApellidos = longitudMinima(_inputApellidos, 5);
  const longitudDocumento = longitudMinima(_inputDocumento, 8);
  const longitudCentro = longitudMinima(_inputCentro, 4);
  if (
    !inputNombre || !inputApellidos ||
    !inputDocumento || !inputCentro ||
    !longitudNombre || !longitudApellidos ||
    !longitudDocumento || !longitudCentro) {
    return;
  }
  modalActualizar()
    .then((confirmed) => {
      if (confirmed) {
        getPerfil()
          .then((perfil) => {
            if (perfil) {
              perfil.nombre = _inputNombre.value;
              perfil.apellidos = _inputApellidos.value;
              perfil.documento = _inputDocumento.value;
              perfil.centroFormacion = _inputCentro.value;
              actualizarPerfil(perfil.id, perfil);
            } else {
              console.log("Perfil no encontrado");
            }
          });
      };
    });
});
