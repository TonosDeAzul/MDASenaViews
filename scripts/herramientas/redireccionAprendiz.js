const _d = document;
const _buscador = _d.getElementById("buscador");
const _buscadorMobile = _d.getElementById("buscador2");

const redireccion = () => {
    window.location.href = "../../views/viewsAprendiz/inicio.html";
};

_buscador.addEventListener("click", redireccion);
_buscadorMobile.addEventListener("click", redireccion);