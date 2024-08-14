import pendientes from "./controlAdministrador/postPendientes.js";
import aceptados from "./controlAdministrador/postAceptados.js";
import rechazados from "./controlAdministrador/postRechazados.js";

let usuario; // Variable para almacenar el usuario actual

document.addEventListener('DOMContentLoaded', function () {
  usuario = JSON.parse(localStorage.getItem("usuario"));
  pendientes();
  aceptados();
  rechazados();

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