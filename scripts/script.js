import { validarCorreo, validarContrasenas, crearUsuario } from "./registro.js";

// MODAL PARA AGREGAR MONITOR
const modal = document.getElementById("modal-1");
if (modal !== null) {
  const showModal = document.getElementById("showModal");
  showModal.onclick = function () {
    modal.classList.remove("hidden");
  };
  const closeModal = document.getElementById("closeModal");
  closeModal.onclick = function () {
    modal.classList.add("hidden");
  };
}

const _form = document.getElementById("form");
const validarForm = (event) => {
  event.preventDefault();
  validarCorreo();
  validarContrasenas();
  if(validarCorreo() === false || validarContrasenas() === false){ return; }
  crearUsuario();
}
_form.addEventListener("submit", validarForm);


// MODAL PARA NOTIFICACIONES
const modal_2 = document.getElementById("modal-2");
const modal_2__back = document.getElementById("modal-2__background");
if (modal_2 !== null) {
  const showModal_2 = document.getElementById("showModal-2");
  showModal_2.onclick = function () {
    modal_2.classList.remove("hidden");
    modal_2__back.classList.remove("hidden");
  };
  const closeModal_2 = document.getElementById("closeModal-2");
  closeModal_2.onclick = function () {
    modal_2.classList.add("hidden");
    modal_2__back.classList.add("hidden");
  };
}

// Evitar escribir números en el input
const evitarNumeros = (input) => {
  input.setAttribute(
    "onkeypress",
    `return (
    (event.charCode >= 65 && event.charCode <= 90) || (event.charCode >= 97 && event.charCode <= 122) 
    || (event.charCode === 13 || event.charCode === 32)
    || (event.charCode >= 192 && event.charCode <= 255))`
  );
}

// Evitar escribir letras en el input
const evitarLetras = (input) => {
  input.setAttribute(
    "onkeypress",
    "return (event.charCode >= 48 && event.charCode <= 57 || event.charCode === 13)"
  );
}

// Validación de correo institucional
const regexInstructor = /^[a-zA-Z0-9.]+@sena\.edu\.co$/i;
const regexAprendiz = /^[a-zA-Z0-9.]+@soy\.sena\.edu\.co$/;
// const _form = document.querySelector(".validarFormulario");
// const _validarCorreo = document.querySelector(".validarCorreo");
// const _validarLabelInput = document.querySelector(".validarLabelInput");
// const _validarLabelContrasena = document.querySelector(".validarLabelContrasena");
// const _validarLabelContrasena2 = document.querySelector(".validarLabelContrasena2");
// const _validarLabelCodigo = document.querySelector(".validarLabelCodigo")
// const _inputNombre = document.getElementById("inputNombre");
// const _inputApellidos = document.getElementById("inputApellidos");
// const _inputDocumento = document.getElementById("inputDocumento");
// const _inputCentro = document.getElementById("inputCentro");

// // Validación de contraseña (ingreso)
// const contrasenaPrueba = "wrq";
// const codigoPrueba = 123456;
// const _validarContrasena = document.querySelector(".validarContrasena");
// const _validarContrasena2 = document.querySelector(".validarContrasena2");
// const _validarCodigo = document.querySelector(".validarCodigo");

// // Evitar escribir letras
// if (_validarCodigo !== null) {
//   evitarLetras(_validarCodigo);
// };
// if (_inputDocumento !== null) {
//   evitarLetras(_inputDocumento);
// };

// // Evitar escribir números
// if (_inputNombre !== null) {
//   evitarNumeros(_inputNombre);
// };
// if (_inputApellidos !== null) {
//   evitarNumeros(_inputApellidos);
// }
// if (_inputCentro !== null) {
//   evitarNumeros(_inputCentro);
// }

// // Crear mensaje de error
// const _mensaje = document.createElement("div");
// _mensaje.classList.add("absolute", "top-4", "left-1/2", "transform", "-translate-x-1/2", "bg-white", "z-10", "rounded-lg", "shadow-md", "p-7");

// // Función para mostrar mensaje de error en los datos
// const _modalMensaje = () => {
//   _mensaje.textContent = "Datos inválidos";
//   document.body.appendChild(_mensaje);
//   setTimeout(() => {
//     document.body.removeChild(_mensaje);
//   }, 2000)
// }

// // Función para validar formulario
// const _verificarFormulario = (event) => {
//   event.preventDefault();
//   let formularioValido = true;

//   // Verificia si existe la clase en el HTML
//   if (_validarLabelCodigo !== null) {
//     if (!_validarCodigo.value.match(codigoPrueba)) {
//       _validarLabelCodigo.classList.add("border-2", "border-rose-500")
//       _modalMensaje();
//       formularioValido = false;
//     } else {
//       console.log("Correo válido");
//       _validarLabelCodigo.classList.remove("border-2", "border-rose-500");
//     }
//   }

//   // Verificia si existe la clase en el HTML
//   if (_validarLabelInput !== null) {
//     // Verifica si el correo coincide con el regex del instructor o del aprendiz
//     if (_validarCorreo.value.match(regexInstructor) || _validarCorreo.value.match(regexAprendiz)) {
//       _validarLabelInput.classList.remove("border-2", "border-rose-500");
//       console.log("Correo válido");
//       if (!_form.hasAttribute("action")) {
//         if (_validarCorreo.value.match(regexInstructor)) {
//           _form.setAttribute(
//             "action",
//             "viewsInstructor/inicio.html"
//           );
//         } else {
//           _form.setAttribute(
//             "action",
//             "viewsAprendiz/inicio.html"
//           );
//         }
//       }
//     } else {
//       _validarLabelInput.classList.add("border-2", "border-rose-500");
//       _modalMensaje();
//       // console.log(`Correo inválido - ${_validarCorreo.value}`);
//       formularioValido = false;
//     }
//   }

//   // Verifica si existe la clase en el HTML
//   if (_validarLabelContrasena2 !== null) {
//     // Verfica si las contraseñas coinciden
//     if (_validarContrasena.value === _validarContrasena2.value) {
//       _validarLabelContrasena.classList.remove("border-2", "border-rose-500");
//       _validarLabelContrasena2.classList.remove("border-2", "border-rose-500");
//       console.log("Las contraseñas coinciden");
//     } else {
//       _validarLabelContrasena.classList.add("border-2", "border-rose-500");
//       _validarLabelContrasena2.classList.add("border-2", "border-rose-500");
//       console.log("Las contraseñas no coinciden");
//       _modalMensaje();
//       formularioValido = false;
//     }
//   }

//   // Verifica si existe la clase en el HTML
//   if (_validarLabelContrasena !== null) {
//     // Verifica si la contraseña ingresada coincide con la de prueba
//     if (_validarContrasena.value.match(contrasenaPrueba)) {
//       _validarLabelContrasena.classList.remove("border-2", "border-rose-500");
//       console.log();
//     } else {
//       _validarLabelContrasena.classList.add("border-2", "border-rose-500");
//       console.log("Contraseña inválida");
//       _modalMensaje();
//       formularioValido = false;
//     }
//   }


//   // Si todas las validaciones son exitosas, envía el formulario
//   if (formularioValido) {
//     _form.submit();
//   }
// }
// // Verifica si existe la clase en el HTML
// if (_form !== null) {
//   _form.addEventListener("submit", _verificarFormulario);
// }

// // Verifica si existe la clase en el HTML
