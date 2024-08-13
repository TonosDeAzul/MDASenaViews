const _d = document;

export function crearLabel() {
  const _label = _d.createElement("label");
  _label.classList.add("input", "input-bordered", "flex", "items-center", "gap-2", "bg-white");
  return _label;
}

export function crearIcon() {
  const _icon = _d.createElement("i");
  _icon.classList.add("fa-solid", "fa-magnifying-glass");
  return _icon;
}

export function crearIconDos() {
  const _icon =  _d.createElement("i");
  _icon.classList.add("fa-solid", "fa-user-minus", "mx-2.5");
  return _icon;
}

export function crearInput() {
  const _input = _d.createElement("input");
  _input.classList.add("grow", "text-mdaBlack");
  _input.setAttribute("placeholder", "Search");
  _input.setAttribute("type", "text");
  return _input;
}

export function crearOkIcon() {
  const _okIcon = _d.createElement("i");
  _okIcon.classList.add("fa-solid", "fa-check", "text-green-500", "hidden");
  _okIcon.setAttribute("id", "okIcon");
  return _okIcon;
}