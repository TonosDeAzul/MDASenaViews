import { validarCorreo, validarContrasenas, crearUsuario, getUsuario } from "./registro.js";

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

// Crear usuario
// const _form = document.getElementById("form");
// const validarForm = (event) => {
//   event.preventDefault();
//   validarCorreo();
//   validarContrasenas();
//   if (validarCorreo() === false || validarContrasenas() === false) { return; }
//   getUsuario().then(usuario => {
//     crearUsuario(usuario);
//   });
// }
// _form.addEventListener("submit", validarForm);

