// Document
const _d = document;
const _body = _d.getElementById("body");
const _form = _d.getElementById("form");
const _label = _d.querySelectorAll(".grid label");
// Modal para confirma la actualización de los datos
export default function modalActualizar() {
  return new Promise((resolve, reject) => { // Use Promise for asynchronous confirmation
    const _section = document.createElement("section");
    _section.classList.add(
      "flex",
      "bg-[#1D1D1D60]",
      "fixed",
      "min-h-screen",
      "w-full",
      "justify-center",
      "items-center",
      "z-10"
    );
    document.body.appendChild(_section);

    const _modal = document.createElement("div");
    _modal.classList.add(
      "bg-white",
      "w-96",
      "rounded-lg",
      "p-5",
      "text-center",
      "flex",
      "gap-5",
      "flex-col",
      "items-center"
    );
    _modal.textContent = "¿Seguro que desea actualizar los datos?";
    _section.appendChild(_modal);

    const _br = document.createElement("br");
    _modal.appendChild(_br);

    const _buttonContainer = document.createElement("div");
    _modal.appendChild(_buttonContainer);

    const _buttonUpdate = document.createElement("button");
    _buttonUpdate.classList.add(
      "btn",
      "w-14",
      "bg-mdaGreen",
      "text-white",
      "hover:bg-mdaGreen",
      "border-none"
    );
    _buttonUpdate.textContent = "Sí";
    _buttonContainer.appendChild(_buttonUpdate);

    _buttonUpdate.addEventListener("click", () => {
      resolve(true); // Resolve promise with true on confirmation
      document.body.removeChild(_section);
    });

    const _buttonDeclive = document.createElement("button");
    _buttonDeclive.classList.add(
      "btn",
      "w-14",
      "bg-mdaRed",
      "text-white",
      "hover:bg-mdaRed",
      "border-none",
      "ml-2"
    );
    _buttonDeclive.textContent = "No";
    _buttonContainer.appendChild(_buttonDeclive);

    _buttonDeclive.addEventListener("click", () => {
      resolve(false); // Resolve promise with false on decline
      document.body.removeChild(_section);
    });
  });
};
