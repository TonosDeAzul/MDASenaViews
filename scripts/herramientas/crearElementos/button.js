const _d = document;

export function crearButton(){
  const _buttonCerrar = _d.createElement("button");
  _buttonCerrar.classList.add("btn", "btn-sm", "btn-circle", "btn-ghost", "text-mdaBlack");
  _buttonCerrar.setAttribute("id", "cerrarConfirmacion");
  return _buttonCerrar;
}

export function crearButtonDos() {
  const _buttonCerrar = _d.createElement("button");
  _buttonCerrar.classList.add("btn", "btn-sm", "btn-circle", "btn-ghost", "text-mdaBlack");
  _buttonCerrar.textContent = "✕";
  _buttonCerrar.setAttribute("id", "cerrarModal");
  return _buttonCerrar;
}

export function crearButtonCancelar() {
  const _btnCancelar = _d.createElement("button");
  _btnCancelar.classList.add("btn", "bg-mdaRed", "border-none", "text-white", "hover:bg-mdaRed");
  _btnCancelar.textContent = "Cancelar";
  return _btnCancelar;
}

export function crearButtonEliminar() {
  const _btnEliminar = _d.createElement("button");
  _btnEliminar.classList.add("btn", "bg-mdaRed", "border-none", "text-white", "hover:bg-mdaRed");
  _btnEliminar.textContent = "Quitar Monitor";
  return _btnEliminar;
}

export function crearButtonConfirmar() {
  const _btnConfirmar = _d.createElement("button");
  _btnConfirmar.classList.add("btn", "bg-mdaGreen", "border-none", "text-white", "hover:bg-mdaGreen");
  _btnConfirmar.textContent = "Confirmar";
  return _btnConfirmar;
}

export function crearButtonAgregar() {
  const _agregarMonitor = _d.createElement("button");
  _agregarMonitor.classList.add("btn", "bg-mdaGreen", "border-none", "text-white", "hover:bg-mdaGreen", "w-full", "mt-4");
  _agregarMonitor.textContent = "Agregar";
  _agregarMonitor.setAttribute("id", "agregarMonitor");
  return _agregarMonitor;
}