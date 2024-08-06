// Documento
const _d = document;
const _body = _d.body;
let usuario; // Variable para almacenar el usuario actual

const _article = _d.getElementById("article");

const _divPadre = _d.createElement("div");
_divPadre.classList.add("w-full", "bg-mdaWhite", "rounded-lg");
_article.appendChild(_divPadre);

const eliminarMonitor = (nombreMonitor, usuario) => {
  const _divHijo = _d.createElement("div");
  _divHijo.classList.add("flex", "justify-between", "items-center", "p-1");
  _divPadre.appendChild(_divHijo);
  const _div = _d.createElement("div");
  _div.classList.add("text-mdaBlack");
  _divHijo.appendChild(_div);
  const _icon = _d.createElement("i");
  _icon.classList.add("fa-solid", "fa-user-minus", "mx-2.5");
  const _paragraph = _d.createElement("p");
  _paragraph.classList.add("inline-block");
  _paragraph.textContent = nombreMonitor;
  _div.appendChild(_icon);
  _div.appendChild(_paragraph);
  const _button = _d.createElement("button");
  _button.classList.add(
    "btn",
    "bg-mdaRed",
    "border-none",
    "text-white",
    "hover:bg-mdaRed"
  );
  _button.textContent = "Quitar monitor";
  _divHijo.appendChild(_button);

  _button.addEventListener("click", () => {
    // usuario.idRolFK = "2";
    // actualizarRol(usuario.id, usuario);
    mostrarConfirmacionQuitar(nombreMonitor, usuario);
    // _divPadre.removeChild(_divHijo);
  });
};