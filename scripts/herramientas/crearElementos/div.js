const  _d = document;

export function crearDiv() {
  const _div = _d.createElement("div");
  _div.classList.add("flex", "w-full", "justify-between");
  return _div;
}

export function crearDivInfo(){
  const _divInfo = _d.createElement("div");
  _divInfo.classList.add("flex", "flex-col", "gap-2");
  return _divInfo;
}

export function crearDivBtn(){
  const _divBtns = _d.createElement("div");
  _divBtns.classList.add("flex", "justify-end", "gap-2");
  return _divBtns;
}

export function crearDivNormal() {
  const _divN = _d.createElement("div");
  _divN.classList.add("text-mdaBlack")
  return _divN;
}

export function crearDivPadre() {
  const _div = _d.createElement("div");
  _div.classList.add("w-full", "bg-mdaWhite", "rounded-lg");
  return _div;
}

export function crearDivHijo() {
  const _divHijo =  _d.createElement("div");
  _divHijo.setAttribute("id", "monitor");
  _divHijo.classList.add("flex", "justify-between", "items-center", "p-1");
  return _divHijo;
}