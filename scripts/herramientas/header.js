document.addEventListener("DOMContentLoaded", function () {
  const abrirNavegacionBtn = document.getElementById("abrirNavegacion");
  const modalNavegacion = document.getElementById("modalNavegacion");

  abrirNavegacionBtn.addEventListener("click", function () {
    // Toggle visibility of the navigation
    if (modalNavegacion.classList.contains("hidden")) {
      modalNavegacion.classList.remove("hidden");
    } else {
      modalNavegacion.classList.add("hidden");
    }
  });
});
