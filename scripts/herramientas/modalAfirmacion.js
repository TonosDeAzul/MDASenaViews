const _d = document;

export default function modalAfirmar(_mensaje, _titulo) {
  return new Promise((resolve, reject) => {
    const _section = _d.createElement("section");
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
    _d.body.appendChild(_section);
    
    const _modal = _d.createElement("div");
    _modal.classList.add(
      "bg-white",
      "w-96",
      "gap-2",
      "rounded-lg",
      "p-5",
      "text-center",
      "flex",
      "flex-col",
      "items-center",
      "text-black"
    );

    const _parrafo = _d.createElement("p");
    _parrafo.textContent = _mensaje;

    const _title = _d.createElement("h1");
    _title.classList.add(
      "text-center",
      "text-black",
      "font-bold",
      "text-xl"
    );
    _title.textContent = _titulo;
    _modal.appendChild(_title);
    _modal.appendChild(_parrafo);
    
    _section.appendChild(_modal);

  })
}