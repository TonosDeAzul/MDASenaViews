const _d = document;

export  function crearParrafoNombre(aprendiz){
  const _pNombre = _d.createElement("p");
  _pNombre.textContent = `Nombre: ${aprendiz.nombre} ${aprendiz.apellidos}`;
  return _pNombre;
}

export function crearParrafoDocumento(aprendiz){
  const _pDocumento = _d.createElement("p");
  _pDocumento.textContent = `Documento: ${aprendiz.documento}`;
  return _pDocumento;
}

export function crearParrafo(nameUser){
  const _parrafo = _d.createElement("p");
  _parrafo.classList.add("inline-block");
  _parrafo.textContent = nameUser;
  return _parrafo;
}