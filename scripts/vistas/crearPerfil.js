// Importar funciones de peticiones
import traerUsuarios from "../peticiones/listar/traerUsuarios.js";
import traerCentros from "../peticiones/listar/traerCentros.js";
import crearPerfil from "../peticiones/crear/crearPerfil.js";

// Importar funciones de validaciones
import camposVacios from "../validaciones/campos.js";
import evitarCaracteres from "../validaciones/evitarCaracteres.js";
import longitudMaxima from "../validaciones/longitudMaxima.js";
import longitudMinima from "../validaciones/longitudMinima.js";
import modalAfirmar from "../herramientas/modalAfirmacion.js";

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

// Aplicar validaciones de caracteres y longitud a los campos
evitarCaracteres(_inputNombre, "letras");
longitudMaxima(_inputNombre, 50);
evitarCaracteres(_inputApellidos, "letras");
longitudMaxima(_inputApellidos, 50);
evitarCaracteres(_inputDocumento, "numeros");
longitudMaxima(_inputDocumento, 10);

// Cargar centros
traerCentros()
  .then(data => {
    data.forEach(element => {
      const _option = _d.createElement("option");
      _option.textContent = element.nombreCentro;
      _inputCentro.appendChild(_option);
    });
  })

// Función para validar el formulario antes de enviarlo
const validarForm = (event) => {
  event.preventDefault(); // Prevenir el envío por defecto del formulario

  // Validar que los campos no estén vacíos
  const inputNombre = camposVacios(_inputNombre);
  const inputApellidos = camposVacios(_inputApellidos);
  const inputDocumento = camposVacios(_inputDocumento);

  // Validar la longitud mínima de los campos
  const longitudNombre = longitudMinima(_inputNombre, 5);
  const longitudApellidos = longitudMinima(_inputApellidos, 5);
  const longitudDocumento = longitudMinima(_inputDocumento, 8);

  // Si alguna validación falla, salir de la función
  if (
    !inputNombre ||
    !inputApellidos ||
    !inputDocumento ||
    !longitudNombre ||
    !longitudApellidos ||
    !longitudDocumento
  ) {
    return;
  }

  // Traer usuarios y crear perfil si las validaciones son correctas
  traerUsuarios().then((data) => {
    let idUsuarioFk;
    data.forEach((user) => {
      if (user.correoInstitucional === usuario.correoInstitucional) {
        idUsuarioFk = user.id;
      }
    });

    // Crear objeto perfil con los datos ingresados
    const perfil = {
      nombre: _inputNombre.value,
      apellidos: _inputApellidos.value,
      documento: _inputDocumento.value,
      centroFormacion: _inputCentro.value,
      idUsuarioFk: idUsuarioFk,
    };
    
    setTimeout(() => {
      // Crear perfil en la base de datos
      crearPerfil(perfil);
      // Redireccionar a la página de login
      window.location.href = "login.html";
    }, 1000)
    modalAfirmar("Se ha creado el perfil al usuario asociado", "Perfil creado exitosamente");
  });
};

// Agregar evento de escucha al formulario para validar el formulario en el submit
_form.addEventListener("submit", validarForm);
