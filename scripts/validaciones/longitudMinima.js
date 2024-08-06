import valido from "./complementos/valido.js";
import invalido from "./complementos/invalido.js";

// Función para verificar la longitud miníma
export default function longitudMinima(input, minimo) {
  // Encuentra el <label> más cercano al input
  // Intenta encontrar un <span> con la clase 'text-red-600' dentro del <label>
  // Si no existe, intenta encontrar el siguiente hermano adyacente al <label>
  let _span = input.closest("label").nextElementSibling;
  if (input.value.length < minimo) {
    invalido(input);
    // Si el <span> de error no existe o no es un <span>, créalo
    if (!_span || _span.tagName !== "SPAN") {
      _span = document.createElement("span");
      _span.textContent = "Cantidad de carácteres inválida";
      _span.classList.add("text-red-600", "text-end");
      input.closest("label").insertAdjacentElement("afterend", _span);
    }
    return false;
  } else {
    valido(input);
    // Si el <span> de error existe y es un <span>, elimínalo
    if (_span && _span.tagName === "SPAN") {
      _span.remove();
    }
    return true;
  }
}
