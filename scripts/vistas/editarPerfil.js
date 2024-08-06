// Importar funciones de peticiones
import traerPerfiles from "../peticiones/listar/traerPerfiles.js";
import editarPerfil from "../peticiones/editar/editarPerfil.js";

// Importar funciones de herramientas
import modal from "../herramientas/modal.js";

// Importar funciones de validaciones
import camposVacios from "../validaciones/campos.js";
import evitarCaracteres from "../validaciones/evitarCaracteres.js";
import longitudMaxima from "../validaciones/longitudMaxima.js";
import longitudMinima from "../validaciones/longitudMinima.js";

// Referencia al documento
const _d = document;
let usuario; // Variable para almacenar el usuario actual

// Al cargar la página, obtener el usuario de localStorage si existe
_d.addEventListener("DOMContentLoaded", () => {
  usuario = JSON.parse(localStorage.getItem("usuario"));
});

// Referencias a los inputs
const _inputNombre = _d.getElementById("nombre");
const _inputApellidos = _d.getElementById("apellidos");
const _inputDocumento = _d.getElementById("documento");
const _inputCentro = _d.getElementById("centro");

// Referencia al formulario
const _form = _d.getElementById("form");

traerPerfiles()
  .then((perfiles) => {
    const perfilUsuario = perfiles.find(perfil => perfil.idUsuarioFk === usuario.id);
    _inputNombre.value = perfilUsuario.nombre;
    _inputApellidos.value = perfilUsuario.apellidos;
    _inputDocumento.value = perfilUsuario.documento;
    _inputCentro.value = perfilUsuario.centroFormacion;
  });

// Aplicar validaciones de caracteres y longitud a los campos
evitarCaracteres(_inputNombre, "letras");
longitudMaxima(_inputNombre, 50);
evitarCaracteres(_inputApellidos, "letras");
longitudMaxima(_inputApellidos, 50);
evitarCaracteres(_inputDocumento, "numeros");
longitudMaxima(_inputDocumento, 10);
evitarCaracteres(_inputCentro, "letras");
longitudMaxima(_inputCentro, 100);

// Función para validar el formulario antes de enviarlo
_form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevenir el envío por defecto del formulario

  // Validar que los campos no estén vacíos
  const inputNombre = camposVacios(_inputNombre);
  const inputApellidos = camposVacios(_inputApellidos);
  const inputDocumento = camposVacios(_inputDocumento);
  const inputCentro = camposVacios(_inputCentro);

  // Validar la longitud mínima de los campos
  const longitudNombre = longitudMinima(_inputNombre, 5);
  const longitudApellidos = longitudMinima(_inputApellidos, 5);
  const longitudDocumento = longitudMinima(_inputDocumento, 8);
  const longitudCentro = longitudMinima(_inputCentro, 4);

  // Si alguna validación falla, salir de la función
  if (
    !inputNombre ||
    !inputApellidos ||
    !inputDocumento ||
    !inputCentro ||
    !longitudNombre ||
    !longitudApellidos ||
    !longitudDocumento ||
    !longitudCentro
  ) {
    return;
  }

  modal()
    .then((confirmado) => {
      if (confirmado) {
        traerPerfiles()
          .then((perfiles) => {
            const perfilUsuario = perfiles.find(perfil => perfil.idUsuarioFk === usuario.id);
            if (perfilUsuario) {
              console.log(perfilUsuario);
              perfilUsuario.nombre = _inputNombre.value;
              perfilUsuario.apellidos = _inputApellidos.value;
              perfilUsuario.documento = _inputDocumento.value;
              perfilUsuario.centroFormacion = _inputCentro.value;
              editarPerfil(perfilUsuario.id, perfilUsuario);
            } else {
              console.log("Perfil no encontrado");
            }
          });
      };
    });
});
