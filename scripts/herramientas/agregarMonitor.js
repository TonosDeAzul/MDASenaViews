// Importar funciones de validaciones
import evitarCaracteres from "../validaciones/evitarCaracteres.js";

// Documento
const _d = document;
const _body = _d.body;
let usuario; // Variable para almacenar el usuario actual

export default function agregarMonitor() {
  const _section = _d.createElement("section");
  _section.classList.add(
    "fixed",
    "m-auto",
    "flex",
    "w-full",
    "min-h-screen",
    "justify-center",
    "p-5",
    "gap-5",
    "flex-wrap",
    "content-center",
    "bg-mdaBlack_400",
    "z-10"
  );
  _body.appendChild(_section);

  const _article = _d.createElement("article");
  _article.classList.add(
    "bg-white",
    "w-full",
    "max-w-2xl",
    "shadow-md",
    "rounded-lg",
    "p-5",
    "flex",
    "flex-col",
    "justify-between",
    "gap-5"
  );
  _section.appendChild(_article);

  const _div = _d.createElement("div");
  _div.classList.add("flex", "w-full", "justify-between");
  _article.appendChild(_div);

  const _h3 = _d.createElement("h3");
  _h3.classList.add("text-mdaBlack", "text-xl");
  _h3.textContent = "Agregar monitor";
  _div.appendChild(_h3);

  const _button = _d.createElement("button");
  _button.classList.add("btn", "btn-sm", "btn-circle", "btn-ghost", "text-mdaBlack");
  _button.textContent = "✕";
  _button.setAttribute("id", "cerrarModal");
  _div.appendChild(_button);

  const _divSearch = _d.createElement("div");
  _article.appendChild(_divSearch);

  const _label = _d.createElement("label");
  _label.classList.add("input", "input-bordered", "flex", "items-center", "gap-2", "bg-white");
  _divSearch.appendChild(_label);

  const _icon = _d.createElement("i");
  _icon.classList.add("fa-solid", "fa-magnifying-glass");
  _label.appendChild(_icon);

  const _input = _d.createElement("input");
  _input.classList.add("grow", "text-mdaBlack");
  _input.setAttribute("placeholder", "Search");
  _input.setAttribute("type", "text");
  _label.appendChild(_input);

  const _okIcon = _d.createElement("i");
  _okIcon.classList.add("fa-solid", "fa-check", "text-green-500", "hidden");
  _okIcon.setAttribute("id", "okIcon");
  _label.appendChild(_okIcon);

  const _agregarMonitor = _d.createElement("button");
  _agregarMonitor.classList.add("btn", "bg-mdaGreen", "border-none", "text-white", "hover:bg-mdaGreen", "w-full", "mt-4");
  _agregarMonitor.textContent = "Agregar";
  _agregarMonitor.setAttribute("id", "agregarMonitor");
  _divSearch.appendChild(_agregarMonitor);

  evitarCaracteres(_input, "letras");

  // Agregar evento de búsqueda
  _input.addEventListener("input", buscarAprendiz);

  // Agregar evento de agregar monitor
  _agregarMonitor.addEventListener("click", () => {
    if (aprendicesEncontrados.length > 0) {
      mostrarConfirmacionAgregar(aprendicesEncontrados[0]);
    }
  });

  // Llamar a cerrarModal después de crear el modal
  cerrarModal(_section);
};

const cerrarModal = (_section) => {
  const _cerrarModal = _d.getElementById("cerrarModal");
  _cerrarModal.addEventListener("click", () => {
    _body.removeChild(_section);
  });
};