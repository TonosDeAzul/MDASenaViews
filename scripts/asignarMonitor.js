import { validarInput, valido, invalido, mensajeError, evitarLetras, verificarLongitud } from "./validarInputs.js";
// Documento
const _d = document;
let usuario; // Variable para almacenar el usuario actual
// Al cargar la página, obtener el usuario de localStorage si existe
_d.addEventListener("DOMContentLoaded", () => {
  usuario = JSON.parse(localStorage.getItem("usuario"));
});

const _article = _d.getElementById("article");
// Función para traer aprendices
const getAprendiz = () => {
  return fetch(`http://localhost:3000/tb_usuarios`)
    .then(response => response.json())
    .then(data => {
      return data;
    });
}
// Función para traer perfiles
const getPerfil = () => {
  return fetch(`http://localhost:3000/tb_perfil`)
    .then(response => response.json())
    .then(data => {
      return data;
    });
}
const _divPadre = _d.createElement("div");
_divPadre.classList.add("w-full", "bg-mdaWhite", "rounded-lg");
_article.appendChild(_divPadre);

const eliminarMonitor = (nombreMonitor) => {
  const _divHijo = _d.createElement("div");
  _divHijo.classList.add("flex", "justify-between", "items-center", "p-1")
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
  _button.classList.add("btn", "bg-mdaRed", "border-none", "text-white", "hover:bg-mdaRed");
  _button.textContent = "Quitar monitor";
  _divHijo.appendChild(_button);
}

getAprendiz().then(usuarios => {
  usuarios.forEach(usuario => {
    if (usuario.idRolFK === "2") {
      getPerfil().then(perfiles => {
        const perfilUsuario = perfiles.find(perfil => perfil.idUsuarioFk === usuario.id);
        console.log(perfilUsuario);
        eliminarMonitor(`${perfilUsuario.nombre} ${perfilUsuario.apellidos}`);
      });
    }
  });
});

