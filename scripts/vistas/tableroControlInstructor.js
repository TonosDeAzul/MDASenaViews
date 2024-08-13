import pendientes from "./tableroControlInstructor/postPendientes.js";
import aceptados from "./tableroControlInstructor/postAceptados.js";
import rechazados from "./tableroControlInstructor/postRechazados.js";

let usuario; // Variable para almacenar el usuario actual

// Al cargar la página, obtener el usuario de localStorage si existe
document.addEventListener("DOMContentLoaded", () => {
  usuario = JSON.parse(localStorage.getItem("usuario"));
  pendientes(usuario.id);
  aceptados(usuario.id);
  rechazados(usuario.id);
});


document.addEventListener('DOMContentLoaded', function () {
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');

  tabLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      // Remove active class from all links and hide all contents
      tabLinks.forEach(link => link.classList.remove('bg-white', 'text-mdaBlack'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to the clicked link and show corresponding content
      link.classList.add('bg-white', 'text-mdaBlack');
      const targetId = link.getAttribute('href').substring(1);
      document.getElementById(targetId).classList.add('active');
    });
  });

  // Show the first tab by default
  tabLinks[0].click();
});